import { useState } from "react";
import fillCheckIco from "../../assets/icon/fillCheckIco.svg";
import noneCheckIco from "../../assets/icon/noneCheckIco.svg";
import checkIco from "../../assets/icon/checkIco.svg";
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
        className="flex items-center border rounded bg-white px-6 py-2 cursor-pointer min-w-48 justify-between"
      >
        <div>
        <span className="font-bold mr-2">{label}</span>
        <span className="text-gray-400 mx-2">|</span>
        </div>
       
        <span className="ml-2">{selectedLabel}</span>
        {/* 드롭다운 화살표 */}
        <span className={`ml-2 transition-transform duration-400 ${open ? 'rotate-180' : ''}`}>▼</span>
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
              <img
                src={checkIco}
                alt={opt.value === value ? "선택됨" : "선택되지 않음"}
                className={`mr-2 w-4 h-4 ${opt.value === value ? '' : 'opacity-50 grayscale'}`}
              />
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
