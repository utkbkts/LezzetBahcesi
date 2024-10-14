import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { DeleteOutlined } from "@ant-design/icons";
import { inputFields } from "../InputFields";
import {
  useDeleteAboutMutation,
  useGetAboutQuery,
} from "../../../../../redux/api/AboutApi";
import { PropTypes } from "prop-types";

const StaticModalForm = ({ setStaticModal, staticModal }) => {
  const FileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState([]); // Yüklenmek üzere seçilen resimler
  const maxSize = 2 * 1024 * 1024;
  const { data: getAbout } = useGetAboutQuery();
  const [deleteAbout] = useDeleteAboutMutation();
  const handleStaticChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");
    if (keys.length === 2) {
      setStaticModal((prev) => ({
        ...prev,
        [keys[0]]: {
          ...prev[keys[0]],
          [keys[1]]: value,
        },
      }));
    } else {
      setStaticModal((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleStaticImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (
      staticModal?.staticImages?.length + imagePreview.length + files.length >
      4
    ) {
      return toast.error("En fazla 4 resim yükleyebilirsin.");
    }

    files.forEach((file) => {
      const reader = new FileReader();
      if (file.size > maxSize) {
        return toast.error("2MB'dan büyük resimler yükleyemezsiniz.");
      }

      reader.onload = () => {
        const newImage = reader.result;
        setStaticModal((prevState) => ({
          ...prevState,
          staticImages: [...prevState.staticImages, { url: newImage }],
        }));
        setImagePreview((prevImages) => [...prevImages, newImage]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImagePreviewDelete = (image) => {
    setImagePreview((prevImages) => prevImages.filter((img) => img !== image));
  };

  const handleResetFileInput = () => {
    if (FileInputRef.current) {
      FileInputRef.current.value = "";
    }
  };

  const getValueFromState = (name) => {
    const keys = name.split(".");
    return keys.reduce((acc, key) => acc && acc[key], staticModal);
  };

  const handleDeleteClick = (id) => {
    console.log(id);
    deleteAbout(id);
  };

  return (
    <>
      {inputFields.staticModal.map((item) => {
        return (
          <div key={item.id} className="flex flex-col">
            <label className="mb-1 font-semibold">{item.label}</label>
            {item.name !== "staticImages" ? (
              <input
                type="text"
                value={getValueFromState(item.name)}
                name={
                  Array.isArray(item.name) ? item.name.join(".") : item.name
                }
                onChange={handleStaticChange}
                className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <input
                type="file"
                accept="image/*"
                multiple
                onClick={handleResetFileInput}
                ref={FileInputRef}
                name={
                  Array.isArray(item.name) ? item.name.join(".") : item.name
                }
                onChange={handleStaticImageChange}
                className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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
            {imagePreview.map((img, index) => (
              <div key={index}>
                <img
                  src={img}
                  className="border object-cover border-gray-400 w-32 h-32 rounded-md"
                  alt="Preview"
                />
                <button
                  onClick={() => handleImagePreviewDelete(img)}
                  type="button"
                >
                  <DeleteOutlined />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Yüklü Resimler */}
      {getAbout?.about?.staticModal?.staticImages && (
        <div className="flex flex-col">
          <h1 className="text-sm">Yüklü Resimler</h1>
          <div className="flex gap-2">
            {getAbout?.about?.staticModal?.staticImages?.map((item, index) => (
              <div key={index}>
                <img
                  src={item.url}
                  className="border object-cover border-gray-400 w-32 h-32 rounded-md"
                  alt="Yüklü"
                />
                <span
                  className="cursor-pointer"
                  onClick={() => handleDeleteClick(item._id)}
                >
                  X
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
StaticModalForm.propTypes = {
  setStaticModal: PropTypes.func,
  staticModal: PropTypes.string,
};
export default StaticModalForm;
