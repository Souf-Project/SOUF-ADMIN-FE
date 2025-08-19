import React from "react";

export default function TabButton({ label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 border rounded-md mx-2 
        ${isActive ? "bg-[#FFC400] gray-200 font-bold border-black border-2" : "bg-white hover:bg-gray-100"}`}
    >
      {label}
    </button>
  );
}
