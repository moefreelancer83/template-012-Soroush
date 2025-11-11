"use client";
import { PropsWithChildren, useState } from "react";
import EditablePopovers from "./editable-popover";
import useObserveDocument from "./use-observe-document";
import { DataChangeHandler, EditableElementData } from "./types";

type PropsType = PropsWithChildren<{
  changeHandler: DataChangeHandler;
  imageChangeHandler: (file: File) => Promise<string> | string;
}>;

const ContentEditable = (props: PropsType) => {
  const [editableElements, setEditableElements] = useState<
    EditableElementData[]
  >([]);

  useObserveDocument({
    changeHandler: props.changeHandler,
    setEditableElements,
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
export type {
  PropsType as ContentEditableProps,
  DataChangeHandler as ChangeHandler,
};
