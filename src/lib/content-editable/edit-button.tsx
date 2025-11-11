import { ImageDown, Palette, Pen, Plus, X } from "lucide-react";
import { POSITION_PRECISION } from "./constants";
import { EditableElementType } from "./types";
import { cn } from "../utils";
import { twMerge } from "tailwind-merge";

type PropsType = {
  type: EditableElementType;
  left: number;
  top: number;
  onClick: () => void;
  showRemoveButton: boolean;
  isHovered: boolean;
};

const typeToIcon: Record<EditableElementType, JSX.Element> = {
  field: <Pen size="20" />,
  item: <X />,
  group: <Plus />,
  icon: <Palette />,
  image: <ImageDown />,
};

const EditButton = ({
  left,
  top,
  type,
  onClick,
  showRemoveButton,
  isHovered,
}: PropsType) => {
  if (type === "item" && !showRemoveButton) {
    return null;
  }

  return (
    <div
      className={
        `absolute z-40 flex flex-col gap-1 transition-all ${isHovered ? "opacity-60" : "opacity-0"} `
      }
      style={{
        left: left > POSITION_PRECISION ? left - POSITION_PRECISION : left,
        top: top > POSITION_PRECISION / 2 ? top - POSITION_PRECISION / 2 : top,
      }}
    >
      <button
        onClick={onClick}
        className="rounded-md p-1 border shadow-md bg-white hover:bg-gray-200 transition"
      >
        {typeToIcon[type]}
      </button>
    </div>
  );

  return (
    <div
      className="data-x-button absolute z-40 flex flex-col gap-1 opacity-60"
      style={{
        left: left > POSITION_PRECISION ? left - POSITION_PRECISION : left,
        top: top > POSITION_PRECISION / 2 ? top - POSITION_PRECISION / 2 : top,
      }}
    >
      {type === "field" && (
        <button
          onClick={onClick}
          className="w-7 h-7 rounded-full bg-yellow-200 hover:bg-yellow-300 transition"
        >
          <Pen />
        </button>
      )}
      {type === "item" && showRemoveButton && (
        <button
          onClick={onClick}
          className="w-7 h-7 rounded-full bg-red-200 hover:bg-red-300 transition"
        >
          <X />
        </button>
      )}
      {type === "group" && (
        <button
          onClick={onClick}
          className="w-7 h-7 rounded-full bg-green-200 hover:bg-green-300 transition"
        >
          <Plus />
        </button>
      )}
      {type === "icon" && (
        <button
          onClick={onClick}
          className="w-7 h-7 rounded-full bg-blue-200 hover:bg-blue-300 transition"
        >
          <Palette />
        </button>
      )}
      {type === "image" && (
        <button
          onClick={onClick}
          className="w-7 h-7 rounded-full bg-purple-200 hover:bg-purple-300 transition"
        >
          <ImageDown />
        </button>
      )}
    </div>
  );
};

export default EditButton;
