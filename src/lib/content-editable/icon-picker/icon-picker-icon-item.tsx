import { CellComponentProps } from "react-window";
import Icon from "./icon";
import _ from "lodash";
import { ReactElement, ReactNode } from "react";
import { IconName } from "./icons-list";

const IconPickerIconItem = (
  props: CellComponentProps<{
    columnCount: number;
    icons: IconName[];
    onChange: (iconName: IconName) => void;
    setIsOpen: (open: boolean) => void;
    value?: string;
  }>
) => {
  const {
    columnIndex,
    rowIndex,
    style,
    columnCount,
    icons,
    onChange,
    setIsOpen,
    value,
  } = props;

  const index = rowIndex * columnCount + columnIndex;
  const name = icons[index];

  if (!name) return null as unknown as ReactElement;

  return (
    <div style={style} className="p-1">
      <button
        onClick={() => {
          onChange(name);
          setIsOpen(false);
        }}
        className={`flex flex-col items-center justify-center w-full h-full rounded-lg border hover:bg-gray-100 transition ${
          value === name ? "bg-gray-200 border-gray-400" : "border-gray-200"
        }`}
      >
        <Icon name={name} />
      </button>
    </div>
  );
};
export default IconPickerIconItem;
