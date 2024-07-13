import { useState } from "react";

export default function Dropdown({ label, options, value, onChange }:any) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option:any) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="">
      <label className="block mb-2 border">{label}</label>
      <div
        className="w-full p-2 bg-gray-950 text-white rounded cursor-pointer border"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value || "Select"}
      </div>
      {isOpen && (
        <div className=" w-full mt-1 bg-gray-900 rounded shadow-lg z-10 cursor-pointer">
          {options.map((option:any) => (
            <div
              key={option}
              className="p-2 cursor-pointer hover:bg-red-600"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
