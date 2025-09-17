"use client";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { getElementXAttribute } from "./utils";

type Props = {
  editableElements: HTMLElement[];
  imageChangeHandler: (file: File) => Promise<string> | string;
  changeHandler: (changePath: string, newValue: string) => void;
};

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

const EditablePopovers: React.FC<Props> = ({
  editableElements,
  imageChangeHandler,
  changeHandler,
}) => {
  const [positions, setPositions] = useState<
    { el: HTMLElement; top: number; left: number }[]
  >([]);

  const updatePositions = () => {
    setPositions((prevPositions) => {
      const map = new Map(
        prevPositions.map((position) => [position.el, position])
      );

      return editableElements.map((el) => {
        const firstTextStartPosition = getTextStart(el, map.get(el)?.left) ?? 0;

        return {
          el,
          top: el.getBoundingClientRect().y + window.scrollY,
          left: firstTextStartPosition,
        };
      });
    });
  };

  const handlePopoverClick = (el: HTMLElement) => {
    if (el instanceof HTMLImageElement) {
      const input = document.createElement("input");
      input.type = "file";
      input.hidden = true;
      input.addEventListener("change", async (event) => {
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
    positions.map(({ el, top, left }, i) => (
      <button
        key={`editable-popover-${i}`}
        onClick={() => handlePopoverClick(el)}
        className="absolute z-50 flex items-center justify-center w-7 h-7 rounded-full bg-yellow-200 shadow-md hover:bg-yellow-300 transition"
        style={{
          top,
          left: left > 30 ? left - 30 : left,
          transform: "translateX(-50%)",
        }}
      >
        ✏️
      </button>
    )),
    document.body
  );
};

export default EditablePopovers;
