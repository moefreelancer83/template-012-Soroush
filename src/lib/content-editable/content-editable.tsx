"use client";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import EditablePopovers from "./editable-popover";
import useObserveDocument from "./use-observe-document";
import useAbortController from "./use-abort-controller";
import { DataChangeHandler, EditableContentValue } from "./types";
import IconPicker from "./icon-picker/icon-picker";

type PropsType = PropsWithChildren<{
  changeHandler: DataChangeHandler;
  imageChangeHandler: (file: File) => Promise<string> | string;
}>;

const ContentEditable = (props: PropsType) => {
  const [editableElements, setEditableElements] = useState<HTMLElement[]>([]);

  useObserveDocument({
    changeHandler: props.changeHandler,
    setEditableElements,
  });

  return (
    <>
      {/* {props.children} */}
      <div className="w-96 h-96 bg-red-400">
      <IconPicker onChange={() => {}}  variant="solid" />

      </div>
      <EditablePopovers
        editableElements={editableElements}
        imageChangeHandler={props.imageChangeHandler}
        changeHandler={props.changeHandler}
      />
    </>
  );
};

export default ContentEditable;
export type {
  PropsType as ContentEditableProps,
  DataChangeHandler as ChangeHandler,
};
