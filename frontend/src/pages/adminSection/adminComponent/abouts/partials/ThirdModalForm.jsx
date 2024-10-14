import { DeleteOutlined } from "@ant-design/icons";
import { inputFields } from "../InputFields";
import { useGetAboutQuery } from "../../../../../redux/api/AboutApi";
import { useRef, useState } from "react";
import { PropTypes } from "prop-types";

const ThirdModalForm = ({ setChefsModal1, chefs1 }) => {
  const { data: getAbout } = useGetAboutQuery();
  const [imagePreview, setImagePreview] = useState([]);
  const FileInputRef = useRef(null);
  const handleSecondsChange = (e) => {
    const { name, value } = e.target;

    setChefsModal1((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleResetFileInput = () => {
    if (FileInputRef.current) {
      FileInputRef.current.value = "";
    }
  };

  const handleSecondsImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setChefsModal1((prevState) => ({
        ...prevState,
        imageChef: { url: reader.result },
      }));
      setImagePreview([reader.result]);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleImagePreviewDelete = () => {
    setImagePreview("");
  };

  return (
    <>
      {inputFields.chefs.map((item) => {
        return (
          <div key={item.id} className="flex flex-col">
            <label className="mb-1 font-semibold">{item.label}</label>
            {item.name !== "imagesChefs" ? (
              <input
                type="text"
                value={chefs1[item.name] || ""}
                name={item.name}
                onChange={handleSecondsChange}
                className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onClick={handleResetFileInput}
                  ref={FileInputRef}
                  name={item.name}
                  onChange={handleSecondsImageChange}
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                />
                <div className="border border-gray-300 rounded p-2 bg-white flex items-center justify-between cursor-pointer hover:bg-gray-100 focus-within:ring-2 focus-within:ring-blue-500">
                  <span className="text-gray-500">Resim seçin 1 adet</span>
                  <button
                    type="button"
                    className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded focus:outline-none"
                  >
                    Seç
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Yüklenecek Resimler */}
      {imagePreview.length > 0 && (
        <div className="flex flex-col">
          <div>
            <h1 className="text-sm">Yüklenecek Resimler</h1>
          </div>
          <div className="flex gap-2">
            <div>
              <img
                src={imagePreview}
                className="border object-cover border-gray-400 w-32 h-32 rounded-md"
                alt="Preview"
              />
              <button onClick={() => handleImagePreviewDelete()} type="button">
                <DeleteOutlined />
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Yüklü Resimler */}
      {getAbout?.about?.chefs1?.imageChef && (
        <div className="flex flex-col">
          <h1 className="text-sm">Yüklü Resimler</h1>
          <div className="flex gap-2">
            <div>
              <img
                src={getAbout?.about?.chefs1?.imageChef?.url}
                className="border object-cover border-gray-400 w-32 h-32 rounded-md"
                alt="Yüklü"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
ThirdModalForm.propTypes = {
  setChefsModal1: PropTypes.func,
  chefs1: PropTypes.string,
};
export default ThirdModalForm;
