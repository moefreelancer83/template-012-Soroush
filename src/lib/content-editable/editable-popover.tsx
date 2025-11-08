"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import {
  getAllEditableElementGroupItems,
  getElementIconName,
  getElementXAttribute,
  getElementXGroupAttribute,
  getIsElementIcon,
  getPopoverTypeFromElement,
  getTextStart,
  groupElementToArray,
} from "./utils";
import { EditableContentValue, EditableElementType } from "./types";
import { POSITION_PRECISION } from "./constants";
import EditButton from "./edit-button";
import IconPicker from "./icon-picker/icon-picker";

type Props = {
  editableElements: HTMLElement[];
  imageChangeHandler: (file: File) => Promise<string> | string;
  changeHandler: (changePath: string, newValue: EditableContentValue) => void;
};

type Popover = {
  el: HTMLElement;
  top: number;
  left: number;
  type: EditableElementType;
};

const EditablePopovers: React.FC<Props> = ({
  editableElements,
  imageChangeHandler,
  changeHandler,
}) => {
  const [popovers, setPopovers] = useState<Popover[]>([]);

  const [iconPickerCurrentFocusedElement, setIconPickerCurrentFocusedElement] =
    useState<null | { elementName: string; elementCurrentIcon: string }>(null);

  const updatePositions = useCallback(() => {
    setPopovers(
      editableElements.map((el) => {
        let left = getTextStart(el);
        let top = el.getBoundingClientRect().y + window.scrollY;

        const type = getPopoverTypeFromElement(el);

        switch (type) {
          case "group":
            left -= POSITION_PRECISION * 2;
            top -= POSITION_PRECISION * 2;
            break;
          case "item":
            left -= POSITION_PRECISION;
            top -= POSITION_PRECISION;
            break;
        }

        return {
          el,
          top,
          left,
          type,
        };
      })
    );
  }, [editableElements]);

  const handleGroupAddItem = (el: HTMLElement) => {
    const items = getAllEditableElementGroupItems(el);
    const lastItem = items[items.length - 1] as HTMLElement;

    if (!lastItem) return;

    const previousGroupArray = groupElementToArray(el);

    const lastGroupElement = structuredClone(
      previousGroupArray[previousGroupArray.length - 1]
    );

    const newGroupArray = [...previousGroupArray, lastGroupElement];

    changeHandler(getElementXGroupAttribute(el), newGroupArray);

    updatePositions();
  };

  const handleGroupRemoveItem = (el: HTMLElement) => {
    const parentGroup = el.parentElement;
    if (!parentGroup) return;

    if (parentGroup.childElementCount === 1) return;

    const childIndex = Array.from(parentGroup.children).indexOf(el);

    const newGroupArray = groupElementToArray(parentGroup).filter(
      (_, index) => index !== childIndex
    );

    changeHandler(getElementXGroupAttribute(parentGroup), newGroupArray);

    updatePositions();
  };

  const handleImageField = (el: HTMLImageElement) => {
    const input = document.createElement("input");
    input.type = "file";
    input.hidden = true;
    input.addEventListener("change", async () => {
      const files = input.files;
      if (!files || !files[0]) return;

      const file = files[0];
      const newFilePath = await imageChangeHandler(file);

      el.src = newFilePath;
      el.onload = () => updatePositions();

      changeHandler(getElementXAttribute(el), newFilePath);
    });

    document.body.appendChild(input);
    input.click();
  };

  const handleIconField = (el: HTMLElement) => {
    const elementName = getElementXAttribute(el);
    if (!getIsElementIcon(el)) throw new Error("Element is not an icon");
    if (!elementName) throw new Error("Element has no data-x attribute");

    const elementCurrentIcon = getElementIconName(el)!;
    setIconPickerCurrentFocusedElement({ elementName, elementCurrentIcon });
  };

  const handlePopoverClick = (el: HTMLElement, type: EditableElementType) => {
    if (type === "group") {
      handleGroupAddItem(el);
      return;
    }

    if (type === "item") {
      handleGroupRemoveItem(el);
      return;
    }

    if (type === "image" && el instanceof HTMLImageElement) {
      handleImageField(el);
      return;
    }

    if (type === "icon") {
      handleIconField(el);
      return;
    }

    el.setAttribute("contenteditable", "true");
    el.focus();
  };

  useEffect(() => {
    updatePositions();
    window.addEventListener("scroll", updatePositions, { passive: true });
    window.addEventListener("resize", updatePositions);
    return () => {
      window.removeEventListener("scroll", updatePositions);
      window.removeEventListener("resize", updatePositions);
    };
  }, [editableElements, changeHandler, updatePositions]);

  const handleIconSelect = (iconName: string) => {
    if (!iconPickerCurrentFocusedElement) return;

    setIconPickerCurrentFocusedElement(null);
    changeHandler(iconPickerCurrentFocusedElement.elementName, iconName);
  };

  if (!("document" in global)) return;

  return ReactDOM.createPortal(
    <>
      <IconPicker
        onChange={handleIconSelect}
        value={iconPickerCurrentFocusedElement?.elementCurrentIcon}
        isOpen={!!iconPickerCurrentFocusedElement}
        setIsOpen={(open) => !open && setIconPickerCurrentFocusedElement(null)}
      />
      {popovers.map(({ el, top, left, type }, i) => (
        <EditButton
          key={`editable-popover-${i}`}
          left={left}
          top={top}
          type={type}
          onClick={() => handlePopoverClick(el, type)}
          showRemoveButton={(el.parentElement?.childElementCount ?? 0) > 1}
        />
      ))}
    </>,
    global.document.body
  );
};

export default EditablePopovers;
