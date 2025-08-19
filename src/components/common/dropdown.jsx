import { useState } from "react";

export default function Dropdown({
  label,
  options,
  value,
  onChange,
  showRemove = false,
  onRemove,
}) {
  const [open, setOpen] = useState(false);

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || "필터 선택";

  return (
    <div className="relative inline-block">
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center border rounded bg-white px-6 py-2 cursor-pointer"
      >
        <span className="font-bold mr-2">{label}</span>
        <span className="text-gray-400 mx-2">|</span>
        <span className="ml-2">{selectedLabel}</span>

        {/* 드롭다운 화살표 */}
        <span className="ml-2">▼</span>
      </div>

      {/* 옵션 박스 */}
      {open && (
        <div className="absolute mt-1 bg-white border rounded shadow-lg p-2 z-10 min-w-full">
          {options.map((opt) => (
            <div
              key={opt.value}
              className="flex items-center px-2 py-1 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              <input
                type="radio"
                name={label}
                checked={opt.value === value}
                onChange={() => {}}
                className="mr-2"
              />
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
