import {
  Dispatch,
  FocusEventHandler,
  KeyboardEventHandler,
  SetStateAction,
  useEffect,
  useRef,
} from "react";

import {
  getAllEditableElementGroupItems,
  getAllEditableElementGroups,
  getAllEditableElements,
  getElementXAttribute,
} from "./utils";
import { DataChangeHandler } from "./types";

type ParamsType = {
  setEditableElements: Dispatch<SetStateAction<HTMLElement[]>>;
  changeHandler: DataChangeHandler;
};

const useObserveDocument = ({
  setEditableElements,
  changeHandler,
}: ParamsType) => {
  const observerRef = useRef<MutationObserver | null>(null);

  useEffect(() => {
    const submitElementChange = (element: HTMLElement) => {
      const path = getElementXAttribute(element);
      if (!path) return;

      changeHandler(path, element.innerText ?? "");

      element.setAttribute("contenteditable", "false");
    };

    const keydownHandler = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        if (event.shiftKey) return;

        event.preventDefault();

        if (event.target instanceof HTMLElement)
          submitElementChange(event.target);
      }
    };

    const blurHandler = (event: FocusEvent) => {
      event.stopPropagation();

      if (event.target instanceof HTMLElement)
        submitElementChange(event.target);
    };

    const makeEditable = (element: Element) => {
      if (!(element instanceof HTMLElement)) return;

      element.addEventListener("keydown", keydownHandler);

      element.addEventListener("blur", blurHandler);
    };

    const scanAndAttach = () => {
      const elements = getAllEditableElements();
      elements.forEach(makeEditable);

      const groupElements = getAllEditableElementGroups();
      const groupItemElements = groupElements.flatMap(
        getAllEditableElementGroupItems
      );

      setEditableElements([
        ...groupElements,
        ...groupItemElements,
        ...elements,
      ] as HTMLElement[]);
    };

    observerRef.current = new MutationObserver(() => {
      scanAndAttach();
    });

    observerRef.current.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    scanAndAttach()

    return () => {
      getAllEditableElements().forEach((element) => {
        element.removeEventListener("blur", blurHandler);
        element.removeEventListener("keydown", keydownHandler);
      });

      observerRef.current?.disconnect();
    };
  }, [changeHandler, setEditableElements]);
};

export default useObserveDocument;
