import { Input } from "antd";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
const UploadImages = ({ images, setImages }) => {
  const FileInputRef = useRef(null);
  const [imagePreview, setimagePreview] = useState([]);

  const onChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length >= 6) {
      return alert("En fazla 6 resim yükleyebilirsin.");
    }
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setimagePreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImagePreviewDelete = (image) => {
    const filteredImagePreview = imagePreview.filter((img) => img !== image);
    setImages(filteredImagePreview);
    setimagePreview(filteredImagePreview);
  };
  const handleResetFileInput = () => {
    if (FileInputRef.current) {
      FileInputRef.current.value = "";
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="mt-4">
      <form onSubmit={submitHandler}>
        <div className="bg-gray-400">
          <Input
            type="file"
            name="product_images"
            multiple
            ref={FileInputRef}
            onChange={onChange}
            onClick={handleResetFileInput}
          />
        </div>
        <div className="flex gap-2 mt-6">
          {imagePreview?.length > 0 && (
            <>
              {imagePreview.map((img, index) => (
                <div key={index}>
                  <img
                    src={img}
                    className="border object-cover border-gray-400 w-32 h-32 rounded-md"
                    alt="Card"
                  />
                  <button
                    onClick={() => handleImagePreviewDelete(img)}
                    type="button"
                  >
                    <DeleteOutlined />
                  </button>
                </div>
              ))}
            </>
          )}
        </div>
      </form>
    </div>
  );
};
UploadImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  setImages: PropTypes.func.isRequired,
};
export default UploadImages;
