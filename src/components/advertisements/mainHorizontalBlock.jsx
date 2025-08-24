import { useState } from "react";
import modifyIco from "../../assets/icon/modifyIco.svg";
export default function MainHorizontalBlock({ title, period,
registration,previewImage }) {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreview(previewURL);
    }
  };

  return (
    <div className="flex flex-row justify-between items-center gap-4 bg-white w-full p-6">
        <section className="w-[35%]">
            <h3 className="font-semibold text-xl">{title}</h3>
            <p className="font-light text-md">기간 {period} </p>
            <p>등록 {registration} </p>
        </section>
        {previewImage ? (
        <img
          src={previewImage}
          alt="preview"
          className="w-full h-32 object-cover rounded-md border"
        />
      ) : (
        <div className="w-full h-32 bg-gray-200 flex items-center justify-center rounded-md border">
          <span className="text-gray-500 text-sm">No Image</span>
        </div>
      )}
      <img src={modifyIco}/>
    </div>
  );
}
