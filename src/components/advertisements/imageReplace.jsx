import { useState } from "react";

export default function ImageReplace({ title, width = 200, height = 200, defaultImage }) {
  const [original] = useState(defaultImage || null); // 왼쪽 원본 이미지 (고정)
  const [preview, setPreview] = useState(null); // 오른쪽 새로 선택한 이미지

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreview(previewURL);
    }
  };

  return (
    <div className="flex flex-col items-start gap-2">
      {/* 타이틀 */}
      {title && <h3 className="font-semibold text-lg mb-4">{title}</h3>}
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-center">
          <div
            className="border rounded-md flex items-center justify-center bg-gray-50"
            style={{ width, height }}
          >
            {original ? (
              <img
                src={original}
                alt="Original"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                className="rounded"
              />
            ) : (
              <span className="text-gray-400 text-sm">기존 이미지 없음</span>
            )}
          </div>
          <span className="mt-2 text-md text-gray-600">변경 전</span>
        </div>

        <span className="text-2xl text-gray-500">{">"}</span>

        <div className="flex flex-col items-center">
          <div
            className="border rounded-md flex items-center justify-center bg-gray-100 hover:bg-gray-200 cursor-pointer"
            style={{ width, height }}
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                className="rounded"
              />
            ) : (
              <label className="flex flex-col items-center justify-center cursor-pointer w-full h-full">
                <span className="text-gray-600 text-sm">이미지 선택</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>
          <span className="mt-2 text-md text-gray-600">변경 후</span>
        </div>
      </div>
    </div>
  );
}
