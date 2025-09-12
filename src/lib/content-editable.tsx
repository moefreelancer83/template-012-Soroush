import { PropsWithChildren, useEffect, useState } from "react";
import ReactDOM from "react-dom";

type PropsType = PropsWithChildren<{
  container?: HTMLElement;
  onChange: (changePath: string, newValue: string) => void;
}>;

const ContentEditable = (props: PropsType) => {
  const [editableElements, setEditableElements] = useState<HTMLElement[]>([]);

  useEffect(() => {
    const container = props.container ?? document.body;

    const controller = new AbortController();

    Array.from(container.querySelectorAll("*")).forEach((element) => {
      element.setAttribute("contenteditable", "false");
    });

    const editables = Array.from(container.querySelectorAll("[data-x]"));
    setEditableElements(editables as HTMLElement[]);

    editables.forEach((element) => {
      element.setAttribute("contenteditable", "false");
      element.addEventListener(
        "blur",
        (event) => {
          const path = element.getAttribute("data-x");
          if (!path) return;
          props.onChange(
            path,
            (event.target as HTMLElement)?.textContent ?? ""
          );
          element.setAttribute("contenteditable", "false");
        },
        { signal: controller.signal }
      );
    });

    return () => {
      controller.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.onChange, props.container]);

  const handlePopoverClick = (el: HTMLElement) => {
    el.setAttribute("contenteditable", "true");
    el.focus();
  };

  return (
    <>
      {props.children}
      {editableElements.map((el, i) =>
        ReactDOM.createPortal(
          <div
            style={{
              top: el.getBoundingClientRect().top + window.scrollY - 20,
              left: el.getBoundingClientRect().left + window.scrollX,
            }}
            className="bg-[#d6cf6d73] text-sm cursor-pointer shadow-md rounded-full p-2 absolute"
            onClick={() => handlePopoverClick(el)}
          >
            ✏️
          </div>,
          document.body,
          `editable-popover-${i}`
        )
      )}
    </>
  );
};

export default ContentEditable;
