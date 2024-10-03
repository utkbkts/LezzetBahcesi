import { Button, Image, Input } from "antd";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { useCategoryAddMutation } from "../../../../redux/api/CategoryApi";
import toast from "react-hot-toast";
import Loading from "../../../../components/loading/Loader";
const CategoryProducts = () => {
  const [tagsCategory, setTagsCategory] = useState([]);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const FileInputRef = useRef(null);
  const [createCategory, { isLoading, isSuccess, isError, error }] =
    useCategoryAddMutation();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
        setImagePreview(reader.result);
      }
    };

    reader.readAsDataURL(file);
  };
  const handleResetFileInput = () => {
    if (FileInputRef.current) {
      FileInputRef.current.value = "";
    }
  };
  const removePriview = () => {
    setImage(null);
    setImagePreview(undefined);
  };
  const handleKeyDown = (e) => {
    const code = e.keyCode || e.which;

    if ((code !== 13 && code !== 188) || category.trim().length === 0) {
      return;
    }

    if (!tagsCategory.includes(category.toLowerCase().trim())) {
      setTagsCategory(category.toLowerCase().trim());
      setCategory("");
    }

    e.preventDefault();
  };

  const handleRemoveTag = () => {
    setTagsCategory("");
  };

  const addTag = () => {
    if (
      category.trim().length > 0 &&
      !tagsCategory.includes(category.toLowerCase().trim())
    ) {
      setTagsCategory(category.toLowerCase().trim());
      setCategory("");
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Kategori başarılı bir şekilde oluşturuldu");
    }
    if (isError) {
      toast.error(error.data.message);
    }
  }, [isSuccess, isError, error]);
  const handleSubmit = () => {
    const data = {
      image,
      name: tagsCategory,
    };
    createCategory(data);
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Kategori Ekle</h2>
      <div className="flex flex-col gap-4">
        <Input
          className="w-full"
          placeholder="Kategori adı girin"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {imagePreview && (
          <div className="relative">
            <Image width={200} src={imagePreview} className="rounded-lg" />
            <span
              className="cursor-pointer absolute right-0 top-0 bg-gray-700 text-white rounded-full p-1"
              onClick={removePriview}
            >
              <X />
            </span>
          </div>
        )}

        <Input
          type="file"
          name="product_images"
          className="w-full"
          ref={FileInputRef}
          onChange={handleImageChange}
          onClick={handleResetFileInput}
        />

        <Button onClick={addTag} type="primary">
          Tag Ekle
        </Button>

        {tagsCategory && (
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-2">
              <span>{tagsCategory}</span>
              <button
                onClick={() => handleRemoveTag(tagsCategory)}
                className="ml-2 text-white hover:text-red-400"
              >
                &times;
              </button>
            </span>
          </div>
        )}

        <Button onClick={handleSubmit} type="primary" className="mt-4">
          Kaydet
        </Button>
      </div>
    </div>
  );
};

export default CategoryProducts;
