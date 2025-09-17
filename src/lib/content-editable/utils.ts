export const getElementXAttribute = (element: Element) =>
  element.getAttribute("data-x") ?? "";

export const getAllEditableElements = () =>
  Array.from(document.body.querySelectorAll("[data-x]"));

export const getAllEditableElementGroups = () =>
  Array.from(document.body.querySelectorAll("[data-x-group]"));
