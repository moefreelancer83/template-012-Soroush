import _ from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";

import { useDebounce } from "use-debounce";
import { Grid } from "react-window";

import IconPickerIconItem from "./icon-picker-icon-item";
import { iconsList } from "./icons-list";

type IconPickerProps = {
  value?: string;
  onChange: (iconName: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const ICON_PICKER_COLUMN_COUNT = 4;
const ICON_PICKER_ITEM_HEIGHT = 80;
const ICON_PICKER_ITEM_WIDTH = 100;

const IconPicker: React.FC<IconPickerProps> = ({
  value,
  onChange,
  isOpen,
  setIsOpen,
}) => {
  const [search, setSearch] = useState("");

  const [debouncedSearch] = useDebounce(search, 500);

  const filteredIcons = useMemo(() => {
    if (!debouncedSearch || debouncedSearch.trim() === "") {
      return iconsList;
    }
    const fuse = new Fuse(iconsList, {
      threshold: 0.2,
      includeScore: true,
    });

    return fuse.search(debouncedSearch).map((result) => result.item);
  }, [debouncedSearch]);

  const rowCount = Math.ceil(filteredIcons.length / ICON_PICKER_COLUMN_COUNT);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-xl shadow-lg max-w-lg p-4 w-[450px]"
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

            <div className="border rounded-md overflow-hidden h-[400px] w-[418px]">
              <Grid
                className="grid grid-cols-4 w-[430px] !overflow-x-hidden scrollbar-modern"
                columnCount={ICON_PICKER_COLUMN_COUNT}
                columnWidth={ICON_PICKER_ITEM_WIDTH}
                rowCount={rowCount}
                rowHeight={ICON_PICKER_ITEM_HEIGHT}
                cellComponent={IconPickerIconItem}
                cellProps={{
                  columnCount: ICON_PICKER_COLUMN_COUNT,
                  icons: filteredIcons,
                  onChange,
                  setIsOpen,
                  value,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default IconPicker;
