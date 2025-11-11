export type EditableContentValue = string | Record<string, string>[];

export type EditableElementData = {element : HTMLElement; parentSection: HTMLElement | null};

export type EditableElementType = "group" | "field" | "item" | "icon" | "image";

export type DataChangeHandler = (changePath: string, newValue: EditableContentValue) => void;