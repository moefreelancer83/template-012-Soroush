import _ from "lodash";
import React, { useState } from "react";

import dynamicIconImports from "lucide-react/dynamicIconImports";
import Icon from "./icon";

type IconName = keyof typeof dynamicIconImports;

const iconsList = Object.keys(dynamicIconImports) as IconName[];

type IconPickerProps = {
  value?: string;
  onChange: (iconName: string) => void;
  variant?: "solid" | "outline";
};

const IconPicker: React.FC<IconPickerProps> = ({
  value,
  onChange,
  variant = "outline",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const SelectedIcon = "";
  // value && (LucideIcons as Record<string, React.FC<any>>)[value];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 border rounded-lg px-3 py-2 hover:bg-gray-100 transition"
      >
        {/* {SelectedIcon ? <SelectedIcon size={18} /> : null} */}
        <span>{value || "Select Icon"}</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-xl shadow-lg w-full max-w-lg p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">Select an Icon</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-800 text-sm"
              >
                ✕
              </button>
            </div>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search icons..."
              className="w-full border rounded-md px-3 py-2 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="grid grid-cols-4 gap-3 max-h-[400px] overflow-y-auto">
              {iconsList?.slice(0, 10).map((name) => (
                <button
                  key={name}
                  onClick={() => {
                    onChange(name);
                    setIsOpen(false);
                  }}
                  className={`flex flex-col items-center justify-center p-2 rounded-lg border hover:bg-gray-100 transition ${
                    value === name
                      ? "bg-gray-200 border-gray-400"
                      : "border-gray-200"
                  }`}
                >
                  <Icon name={name} />
                  <span className="text-xs mt-1 truncate whitespace-break-spaces">
                    {_.startCase(name)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default IconPicker;
