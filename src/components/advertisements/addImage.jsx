import { useState } from "react";

export default function AddImage({ title = "이미지 추가", onChange }) {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreview(previewURL);
      if (onChange) onChange(file); 
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-lg md:text-2xl font-semibold">{title}</label>
      <div className="flex items-center justify-center border border-black bg-gray-100 w-full h-48 relative cursor-pointer">
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <label
          htmlFor="imageUpload"
          className="w-full h-full flex items-center justify-center cursor-pointer"
        >
          {preview ? (
            <img
              src={preview}
              alt="미리보기"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-4xl">+</span>
          )}
        </label>
      </div>
    </div>
  );
}

