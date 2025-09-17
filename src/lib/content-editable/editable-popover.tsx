"use client";
import React, { useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import {
  getAllEditableElementGroupItems,
  getElementXAttribute,
  getElementXGroupAttribute,
  groupElementToArray,
} from "./utils";
import { EditableContentValue } from "./types";

type Props = {
  editableElements: HTMLElement[];
  imageChangeHandler: (file: File) => Promise<string> | string;
  changeHandler: (changePath: string, newValue: EditableContentValue) => void;
};

const POSITION_PRECISION = 28;

function getTextStart(el: HTMLElement, prevLeft?: number) {
  const fallbackPosition =
    prevLeft ?? el.getBoundingClientRect().x + window.scrollX;

  if (!el.firstChild) return fallbackPosition;
  try {
    const range = document.createRange();
    range.setStart(el.firstChild, 0);
    range.setEnd(el.firstChild, 1);

    const rect = range.getBoundingClientRect();
    return rect.left + window.scrollX;
  } catch (e) {
    console.error(e);
    return fallbackPosition;
  }
}

type EditableElementType = "group" | "field" | "item";

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

  const getSetKey = (left: number, top: number) =>
    `${Math.floor(left / POSITION_PRECISION) * POSITION_PRECISION}_${
      Math.floor(top / POSITION_PRECISION) * POSITION_PRECISION
    }`;

  const updatePositions = () => {
    setPositions((prevPositions) => {
      const tempOccupiedPositions = new Set<string>();

      return editableElements.map((el) => {
        let left = getTextStart(el) ?? 0;
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

        // while (tempOccupiedPositions.has(getSetKey(left, top))) {
        //   top += 1;
        // }

        tempOccupiedPositions.add(getSetKey(left, top));

        return {
          el,
          top,
          left,
          type,
        };
      });
    });
  };

  const handlePopoverClick = (el: HTMLElement, type: EditableElementType) => {
    if (type === "group") {
      const items = getAllEditableElementGroupItems(el);
      const lastItem = items[items.length - 1] as HTMLElement;

      if (!lastItem) return;

      const newItem = lastItem.cloneNode(true) as HTMLElement;
      el.appendChild(newItem);

      const newGroupArray = groupElementToArray(el);
      changeHandler(getElementXGroupAttribute(el), newGroupArray);

      updatePositions();
      return;
    }

    if (type === "item") {
      const parentGroup = el.parentElement;
      if (!parentGroup) return;

      if (parentGroup.childElementCount === 1) return;

      el.remove();

      changeHandler(
        getElementXGroupAttribute(parentGroup),
        groupElementToArray(parentGroup)
      );

      updatePositions();
      return;
    }

    if (el instanceof HTMLImageElement) {
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

  return ReactDOM.createPortal(
    positions.map(({ el, top, left, type }, i) => (
      <div
        key={`editable-popover-${i}`}
        className="absolute z-40 flex flex-col gap-1 opacity-60"
        style={{
          left: left > POSITION_PRECISION ? left - POSITION_PRECISION : left,
          top: top > POSITION_PRECISION / 2 ? top - POSITION_PRECISION / 2 : top,
        }}
      >
        {type === "field" && (
          <button
            onClick={() => handlePopoverClick(el, type)}
            className="w-7 h-7 rounded-full bg-yellow-200 hover:bg-yellow-300 transition"
          >
            ✏️
          </button>
        )}
        {type === "item" && (el.parentElement?.childElementCount ?? 0) > 1 && (
          <button
            onClick={() => handlePopoverClick(el, type)}
            className="w-7 h-7 rounded-full bg-red-200 hover:bg-red-300 transition"
          >
            ❌
          </button>
        )}
        {type === "group" && (
          <button
            onClick={() => handlePopoverClick(el, type)}
            className="w-7 h-7 rounded-full bg-green-200 hover:bg-green-300 transition"
          >
            ➕
          </button>
        )}
      </div>
    )),
    document.body
  );
};

export default EditablePopovers;
