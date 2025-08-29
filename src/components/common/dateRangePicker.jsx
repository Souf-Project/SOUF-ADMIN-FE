import { useState } from "react";

export default function DateRangePicker({ title = "기간", onChange }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleStartChange = (e) => {
    const newStart = e.target.value;
    setStartDate(newStart);

    // 마감일이 시작일보다 앞서면 초기화되게 하기
    if (endDate && newStart && endDate < newStart) {
      setEndDate("");
    }

    if (onChange) onChange({ start: newStart, end: endDate });
  };

  const handleEndChange = (e) => {
    const newEnd = e.target.value;

    // 시작일보다 뒤인지 확인
    if (startDate && newEnd < startDate) {
      alert("마감일은 시작일 이후여야 합니다.");
      return;
    }

    // 오늘보다 뒤인지 확인
    if (newEnd < today) {
      alert("마감일은 오늘 이후여야 합니다.");
      return;
    }

    setEndDate(newEnd);
    if (onChange) onChange({ start: startDate, end: newEnd });
  };

  return (
    <div className="flex flex-col gap-2 w-full ">
      <label className="text-lg md:text-2xl font-semibold">{title}</label>
      <div className="flex items-center gap-4 justify-between">
        {/* 시작일 */}
        <div className="flex items-center border border-black w-full">
          <input
            type="date"
            value={startDate}
            onChange={handleStartChange}
            min={today}
            className="p-2 outline-none w-full"
          />
        </div>

        <span >~</span>

        {/* 마감일 */}
        <div className="flex items-center border border-black w-full">
          <input
            type="date"
            value={endDate}
            onChange={handleEndChange}
            min={startDate || today}
            className="p-2 outline-none w-full"
          />
        </div>
      </div>
    </div>
  );
}
