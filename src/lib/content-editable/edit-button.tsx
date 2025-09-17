import { POSITION_PRECISION } from "./constants";
import { EditableElementType } from "./types";

type PropsType = {
  type: EditableElementType;
  left: number;
  top: number;
  onClick: () => void;
  showRemoveButton: boolean;
};

const EditButton = ({
  left,
  top,
  type,
  onClick,
  showRemoveButton,
}: PropsType) => {
  return (
    <div
      className="absolute z-40 flex flex-col gap-1 opacity-60"
      style={{
        left: left > POSITION_PRECISION ? left - POSITION_PRECISION : left,
        top: top > POSITION_PRECISION / 2 ? top - POSITION_PRECISION / 2 : top,
      }}
    >
      <button></button>
      {type === "field" && (
        <button
          onClick={onClick}
          className="w-7 h-7 rounded-full bg-yellow-200 hover:bg-yellow-300 transition"
        >
          ✏️
        </button>
      )}
      {type === "item" && showRemoveButton && (
        <button
          onClick={onClick}
          className="w-7 h-7 rounded-full bg-red-200 hover:bg-red-300 transition"
        >
          ❌
        </button>
      )}
      {type === "group" && (
        <button
          onClick={onClick}
          className="w-7 h-7 rounded-full bg-green-200 hover:bg-green-300 transition"
        >
          ➕
        </button>
      )}
    </div>
  );
};

export default EditButton;