export const getElementXAttribute = (element: Element) =>
  element.getAttribute("data-x") ?? "";

export const getElementXGroupAttribute = (element: Element) =>
  element.getAttribute("data-x-group") ?? "";

export const getElementXGroupKeyAttribute = (element: Element) =>
  element.getAttribute("data-x-key-in-group") ?? "";

export const getAllEditableElements = (): HTMLElement[] =>
  Array.from(document.body.querySelectorAll("[data-x]"));

export const getAllEditableElementGroups = (): HTMLElement[] =>
  Array.from(document.body.querySelectorAll("[data-x-group]"));

export const getAllEditableElementGroupItems = (
  container: HTMLElement
): HTMLElement[] =>
  Array.from(container.children).filter(
    (element) => element instanceof HTMLElement
  );

export const getAllGroupElementFields = (
  container = document.body
): HTMLElement[] =>
  Array.from(container.querySelectorAll("[data-x-key-in-group]"));

export const groupElementToArray = (
  groupElement: HTMLElement
): Record<string, string>[] => {
  const arr = getAllEditableElementGroupItems(groupElement).map((groupItem) =>
    Object.fromEntries(
      getAllGroupElementFields(groupItem).map((fieldElement) => [
        getElementXGroupKeyAttribute(fieldElement),
        fieldElement.innerText ?? "",
      ])
    )
  );

  return arr;
};

export const getTextStart = (el: HTMLElement, prevLeft?: number) => {
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
    return fallbackPosition;
  }
};
