import { DeleteOutlined } from "@ant-design/icons";
import { inputFields } from "../InputFields";
import { useGetAboutQuery } from "../../../../../redux/api/AboutApi";
import { PropTypes } from "prop-types";
import { useRef, useState } from "react";

const SecondsModalForm = ({ setSecondsModal, secondsModal }) => {
  const { data: getAbout } = useGetAboutQuery();
  const [imagePreview, setImagePreview] = useState([]);
  const [tags, setTags] = useState([]);
  const FileInputRef = useRef(null);
  const [currentParagraph, setCurrentParagraph] = useState("");
  const handleSecondsChange = (e) => {
    const { name, value } = e.target;

    setSecondsModal((prevState) => ({
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
      setSecondsModal((prevState) => ({
        ...prevState,
        secondsImage: { url: reader.result },
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

  const handleKeyDown = (e) => {
    const code = e.keyCode;

    if ((code !== 13 && code !== 188) || currentParagraph.length === 0) {
      return;
    }

    if (!tags.includes(currentParagraph)) {
      const updatedTags = [...tags, currentParagraph];
      setTags(updatedTags);

      setSecondsModal((prevState) => ({
        ...prevState,
        paragraph: updatedTags,
      }));

      setCurrentParagraph("");
    }
  };
  const setFilterTag = (tag) => {
    const filter = tags.filter((filter) => filter !== tag);
    setTags(filter);
    setSecondsModal((prevState) => ({
      ...prevState,
      paragraph: filter,
    }));
  };
  return (
    <>
      {inputFields.introduction.map((item) => {
        return (
          <div key={item.id} className="flex flex-col">
            <label className="mb-1 font-semibold">{item.label}</label>
            {item.name !== "secondsImage" && item.name !== "paragraph" ? (
              <input
                type="text"
                value={secondsModal[item.name] || ""}
                name={item.name}
                onChange={handleSecondsChange}
                className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : item.name === "paragraph" ? (
              <>
                <input
                  type="text"
                  value={currentParagraph}
                  name={item.name}
                  onChange={(e) => setCurrentParagraph(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag, index) => (
                      <div
                        key={index}
                        className="bg-blue-500 text-white px-2 py-1 rounded relative"
                      >
                        {tag}
                        <span
                          onClick={() => setFilterTag(tag)}
                          className="absolute -top-2 -right-2 text-black cursor-pointer"
                        >
                          X
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                <h4>Yüklü Tagler</h4>
                {getAbout?.about?.secondsModal?.paragraph && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {getAbout?.about?.secondsModal?.paragraph.map(
                      (tag, index) => (
                        <div
                          key={index}
                          className="bg-blue-500 text-white px-2 py-1 rounded relative"
                        >
                          {tag}
                        </div>
                      )
                    )}
                  </div>
                )}
              </>
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
      {getAbout?.about?.secondsModal?.secondsImage && (
        <div className="flex flex-col">
          <h1 className="text-sm">Yüklü Resimler</h1>
          <div className="flex gap-2">
            <div>
              <img
                src={getAbout?.about?.secondsModal?.secondsImage?.url}
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
SecondsModalForm.propTypes = {
  setSecondsModal: PropTypes.func,
  secondsModal: PropTypes.string,
};
export default SecondsModalForm;
