"use client";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import EditablePopovers from "./editable-popover";
import useObserveDocument from "./use-observe-document";
import useAbortController from "./use-abort-controller";
import { getAllEditableElements, getElementXAttribute } from "./utils";

type PropsType = PropsWithChildren<{
  changeHandler: (changePath: string, newValue: string) => void;
  imageChangeHandler: (file: File) => Promise<string> | string;
}>;

const ContentEditable = (props: PropsType) => {
  const [editableElements, setEditableElements] = useState<HTMLElement[]>([]);

  const abortController = useAbortController();

  const makeEditable = (element: Element) => {
    if (!(element instanceof HTMLElement)) return;

    const submitElementChange = () => {
      const path = getElementXAttribute(element);
      if (!path) return;

      props.changeHandler(path, element.innerText ?? "");

      element.setAttribute("contenteditable", "false");
    };

    const signal = abortController?.signal;

    element.addEventListener(
      "keydown",
      (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          if (event.shiftKey) return;
          submitElementChange();
        }
      },
      { signal }
    );

    element.addEventListener("blur", () => submitElementChange(), {
      signal,
    });
  };

  const scanAndAttach = () => {
    const elements = getAllEditableElements();

    elements.forEach((element) => {
      makeEditable(element);
    });

    setEditableElements(Array.from(elements) as HTMLElement[]);
  };

  useObserveDocument({
    onChange: scanAndAttach,
  });

  return (
    <>
      {props.children}
      <EditablePopovers
        editableElements={editableElements}
        imageChangeHandler={props.imageChangeHandler}
        changeHandler={props.changeHandler}
      />
    </>
  );
};

export default ContentEditable;
