"use client";
import React, { useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import {
  getAllEditableElementGroupItems,
  getElementXAttribute,
  getElementXGroupAttribute,
  getTextStart,
  groupElementToArray,
} from "./utils";
import { EditableContentValue, EditableElementType } from "./types";
import { POSITION_PRECISION } from "./constants";
import EditButton from "./edit-button";

type Props = {
  editableElements: HTMLElement[];
  imageChangeHandler: (file: File) => Promise<string> | string;
  changeHandler: (changePath: string, newValue: EditableContentValue) => void;
};

const EditablePopovers: React.FC<Props> = ({
  editableElements,
  imageChangeHandler,
  changeHandler,
}) => {
  const [positions, setPositions] = useState<
    {
      el: HTMLElement;
      top: number;
      left: number;
      type: EditableElementType;
    }[]
  >([]);

  const updatePositions = () => {
    setPositions(
      editableElements.map((el) => {
        let left = getTextStart(el);
        let top = el.getBoundingClientRect().y + window.scrollY;

        const type: EditableElementType = el.hasAttribute("data-x-group")
          ? "group"
          : el.parentElement?.hasAttribute("data-x-group")
          ? "item"
          : "field";

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
  };

  const handleGroupAddItem = (el: HTMLElement) => {
    const items = getAllEditableElementGroupItems(el);
    const lastItem = items[items.length - 1] as HTMLElement;

    if (!lastItem) return;

    const previousGroupArray = groupElementToArray(el);

    const newGroupArray = [
      ...previousGroupArray,
      previousGroupArray[previousGroupArray.length - 1],
    ];
    
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

  const handlePopoverClick = (el: HTMLElement, type: EditableElementType) => {
    if (type === "group") {
      handleGroupAddItem(el);
      return;
    }

    if (type === "item") {
      handleGroupRemoveItem(el);
      return;
    }

    if (el instanceof HTMLImageElement) {
      handleImageField(el);
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
  }, [editableElements]);

  if (!("document" in global)) return;

  return ReactDOM.createPortal(
    positions.map(({ el, top, left, type }, i) => (
      <EditButton
        key={`editable-popover-${i}`}
        left={left}
        top={top}
        type={type}
        onClick={() => handlePopoverClick(el, type)}
        showRemoveButton={(el.parentElement?.childElementCount ?? 0) > 1}
      />
    )),
    global.document.body
  );
};

export default EditablePopovers;
