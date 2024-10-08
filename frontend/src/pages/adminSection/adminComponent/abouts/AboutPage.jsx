import {
  useCreateAboutMutation,
  useGetAboutQuery,
} from "../../../../redux/api/AboutApi";
import Loading from "../../../../components/loading/Loader";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "antd";
const AboutPage = () => {
  const { data, isLoading } = useGetAboutQuery();
  const [createAbout, { isSuccess, isLoading: CreateLoading }] =
    useCreateAboutMutation();
  const FileInputRef = useRef(null);
  const maxSize = 2 * 1024 * 1024;

  const [staticModal, setStaticModal] = useState({
    titleStatic: "",
    descriptionStatic: "",
    dishes: { count: "", description: "" },
    customers: { count: "", description: "" },
    experience: { years: "", description: "" },
    staticImages: [],
  });
  const [introduction, setIntroduction] = useState({
    titleIntro: "",
    descriptionIntro: "",
    content: "",
    imagesIntro: [],
  });
  const [chefs, setChefs] = useState({
    titleChefs: "",
    descriptionChefs: "",
    content: "",
    imagesChefs: [],
  });
  const [mission, setMission] = useState({
    titleMission: "",
    descriptionMission: "",
  });
  const [whoChoose, setWhoChoose] = useState({
    titleWhoChoose: "",
    descriptionWhoChoose: "",
  });

  const filterStaticImages = data?.about?.staticModal[0]?.staticImages?.map(
    (item) => item.url
  );
  useEffect(() => {
    if (isSuccess) {
      toast.success("Başarıyla güncellendi");
    }
  }, [isSuccess]);
  useEffect(() => {
    if (data) {
      // API'den gelen verileri kullanarak state'leri doldur
      setStaticModal({
        titleStatic: data?.about?.staticModal[0]?.titleStatic || "",
        descriptionStatic: data?.about?.staticModal[0]?.descriptionStatic || "",
        dishes: {
          count: data?.about?.staticModal[0]?.dishes?.count || "",
          description: data?.about?.staticModal[0]?.dishes?.description || "",
        },
        customers: {
          count: data?.about?.staticModal[0]?.customers?.count || "",
          description:
            data?.about?.staticModal[0]?.customers?.description || "",
        },
        experience: {
          years: data?.about?.staticModal[0]?.experience?.years || "",
          description:
            data?.about?.staticModal[0]?.experience?.description || "",
        },
        staticImages: filterStaticImages || [],
      });

      setIntroduction({
        titleIntro: data?.about?.introduction[0]?.titleIntro || "",
        descriptionIntro: data?.about?.introduction[0]?.descriptionIntro || "",
        content: data?.about?.introduction[0]?.content || "",
        imagesIntro: data?.about?.introduction[0]?.imagesIntro || [],
      });

      setChefs({
        titleChefs: data?.about?.chefs[0]?.titleChefs || "",
        descriptionChefs: data?.about?.chefs[0]?.descriptionChefs || "",
        content: data?.about?.chefs[0]?.content || "",
        imagesChefs: data?.about?.chefs[0]?.imagesChefs || [],
      });

      setMission({
        titleMission: data?.about?.mission[0]?.titleMission || "",
        descriptionMission: data?.about?.mission[0]?.descriptionMission || "",
      });

      setWhoChoose({
        titleWhoChoose: data?.about?.whoImChoose[0]?.titleWhoChoose || "",
        descriptionWhoChoose:
          data?.about?.whoImChoose[0]?.descriptionWhoChoose || "",
      });
    }
  }, [data]);
  console.log(chefs);

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    if (staticModal.staticImages.length + files.length > 4) {
      return alert("En fazla 4 resim yükleyebilirsin.");
    }
    files.forEach((file) => {
      if (file.size > maxSize) {
        return toast.error("en fazla 2 mb boyutunda resimler yükleyebilirsin.");
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setStaticModal((prevState) => ({
            ...prevState,
            staticImages: [...prevState.staticImages, reader.result],
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };
  const handleResetFileInput = () => {
    if (FileInputRef.current) {
      FileInputRef.current.value = "";
    }
  };
  //intro & chef
  const onChangeIntro = (e) => {
    const file = e.target.files[0];

    if (file.size > maxSize) {
      return toast.error("En fazla 2 MB boyutunda resimler yükleyebilirsin.");
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setIntroduction((prevState) => ({
          ...prevState,
          imagesIntro: reader.result,
        }));
      }
    };
    reader.readAsDataURL(file);
  };
  const onChangeChefs = (e) => {
    const file = e.target.files[0];

    if (file.size > maxSize) {
      return toast.error("En fazla 2 MB boyutunda resimler yükleyebilirsin.");
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setChefs((prevState) => ({
          ...prevState,
          imagesChefs: reader.result,
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const inputFields = {
    staticModal: [
      {
        id: 1,
        name: "titleStatic",
        label: "Birinci alan başlık",
        component: (
          <input
            type="text"
            value={staticModal.titleStatic}
            placeholder="Başlık ismi"
            className="border p-2 rounded w-full"
            onChange={(e) =>
              setStaticModal({ ...staticModal, titleStatic: e.target.value })
            }
          />
        ),
      },
      {
        id: 2,
        name: "descriptionStatic",
        label: "Birinci alan Açıklama",
        component: (
          <textarea
            value={staticModal.descriptionStatic}
            placeholder="Açıklama"
            className="border p-2 rounded w-full"
            onChange={(e) =>
              setStaticModal({
                ...staticModal,
                descriptionStatic: e.target.value,
              })
            }
          />
        ),
      },
      {
        id: 3,
        name: ["experience", "years"],
        label: "Deneyim yılı",
        component: (
          <input
            type="text"
            value={staticModal.experience.years}
            placeholder="Deneyim yılı"
            className="border p-2 rounded w-full"
            onChange={(e) =>
              setStaticModal({
                ...staticModal,
                experience: {
                  ...staticModal.experience,
                  years: e.target.value,
                },
              })
            }
          />
        ),
      },
      {
        id: 4,
        name: ["experience", "description"],
        label: "Deneyim açıklaması",
        component: (
          <textarea
            placeholder="Deneyim açıklaması"
            value={staticModal.experience.description}
            className="border p-2 rounded w-full"
            onChange={(e) =>
              setStaticModal({
                ...staticModal,
                experience: {
                  ...staticModal.experience,
                  description: e.target.value,
                },
              })
            }
          />
        ),
      },
      {
        id: 5,
        name: ["customers", "description"],
        label: "Müşteri açıklaması",
        component: (
          <input
            value={staticModal.customers.description}
            type="text"
            placeholder="Müşteri açıklaması"
            className="border p-2 rounded w-full"
            onChange={(e) =>
              setStaticModal({
                ...staticModal,
                customers: {
                  ...staticModal.customers,
                  description: e.target.value,
                },
              })
            }
          />
        ),
      },
      {
        id: 6,
        name: ["customers", "count"],
        label: "Müşteri Sayısı",
        component: (
          <input
            value={staticModal.customers.count}
            type="text"
            placeholder="Müşteri sayısı"
            className="border p-2 rounded w-full"
            onChange={(e) =>
              setStaticModal({
                ...staticModal,
                customers: { ...staticModal.customers, count: e.target.value },
              })
            }
          />
        ),
      },
      {
        id: 7,
        name: ["dishes", "count"],
        label: "Yemek Sayısı",
        component: (
          <input
            value={staticModal.dishes.count}
            type="text"
            placeholder="Yemek sayısı"
            className="border p-2 rounded w-full"
            onChange={(e) =>
              setStaticModal({
                ...staticModal,
                dishes: { ...staticModal.dishes, count: e.target.value },
              })
            }
          />
        ),
      },
      {
        id: 8,
        name: ["dishes", "description"],
        label: "Yemek Çeşidi Açıklaması",
        component: (
          <textarea
            placeholder="Yemek çeşidi açıklaması"
            className="border p-2 rounded w-full"
            value={staticModal.dishes.description}
            onChange={(e) =>
              setStaticModal({
                ...staticModal,
                dishes: { ...staticModal.dishes, description: e.target.value },
              })
            }
          />
        ),
      },
      {
        id: 9,
        name: ["staticModal", "staticImages"],
        label: "Resim",
        component: (
          <input
            type="file"
            ref={FileInputRef}
            className="border p-2 rounded w-full"
            onChange={onChange}
            onClick={handleResetFileInput}
            accept="image/*"
            multiple
          />
        ),
      },
    ],
    introduction: [
      {
        id: 10,
        name: "descriptionIntro",
        label: "Açıklama",
        component: (
          <textarea
            className="border p-2 rounded w-full"
            value={introduction.descriptionIntro}
            placeholder="Açıklama"
            onChange={(e) =>
              setIntroduction({
                ...introduction,
                descriptionIntro: e.target.value,
              })
            }
          />
        ),
      },
      {
        id: 11,
        name: "titleIntro",
        label: "Başlık",
        component: (
          <textarea
            className="border p-2 rounded w-full"
            value={introduction.titleIntro}
            placeholder="Başlık"
            onChange={(e) =>
              setIntroduction({ ...introduction, titleIntro: e.target.value })
            }
          />
        ),
      },
      {
        id: 12,
        name: "content",
        label: "Paragraf",
        component: (
          <textarea
            placeholder="Paragraf"
            value={introduction.content}
            className="border p-2 rounded w-full"
            onChange={(e) =>
              setIntroduction({ ...introduction, content: e.target.value })
            }
          />
        ),
      },
      {
        id: 13,
        name: ["introduction", "imagesIntro"],
        label: "Resim",
        component: (
          <input
            type="file"
            accept="image/*"
            className="border p-2 rounded w-full"
            onChange={onChangeIntro}
            onClick={handleResetFileInput}
            ref={FileInputRef}
            multiple
          />
        ),
      },
    ],
    chefs: [
      {
        id: 14,
        name: "descriptionChefs",
        label: "Açıklama",
        component: (
          <textarea
            placeholder="Açıklama"
            className="border p-2 rounded w-full"
            value={chefs.descriptionChefs}
            onChange={(e) =>
              setChefs({ ...chefs, descriptionChefs: e.target.value })
            }
          />
        ),
      },
      {
        id: 15,
        name: "titleChefs",
        label: "Başlık",

        component: (
          <textarea
            value={chefs.titleChefs}
            placeholder="Başlık"
            className="border p-2 rounded w-full"
            onChange={(e) => setChefs({ ...chefs, titleChefs: e.target.value })}
          />
        ),
      },
      {
        id: 16,
        name: "content",
        label: "Açıklama content",
        component: (
          <textarea
            value={chefs.content}
            placeholder="Açıklama content"
            className="border p-2 rounded w-full"
            onChange={(e) => setChefs({ ...chefs, content: e.target.value })}
          />
        ),
      },
      {
        id: 18,
        name: ["chefs", "imagesChefs"],
        label: "Resim",
        component: (
          <input
            type="file"
            accept="image/*"
            className="border p-2 rounded w-full"
            ref={FileInputRef}
            onChange={onChangeChefs}
            onClick={handleResetFileInput}
            multiple
          />
        ),
      },
    ],
    mission: [
      {
        id: 19,
        name: "descriptionMission",
        label: "Misyon",

        component: (
          <textarea
            placeholder="Misyon"
            value={mission.descriptionMission}
            className="border p-2 rounded w-full"
            onChange={(e) =>
              setMission({ ...mission, descriptionMission: e.target.value })
            }
          />
        ),
      },
      {
        id: 20,
        name: "titleMission",
        label: "Misyon başlık",
        component: (
          <input
            placeholder="Misyon başlık"
            className="border p-2 rounded w-full"
            value={mission.titleMission}
            onChange={(e) =>
              setMission({ ...mission, titleMission: e.target.value })
            }
          />
        ),
      },
    ],
    whoImChoose: [
      {
        id: 21,
        name: "descriptionWhoChoose",
        label: "Neden biz",
        component: (
          <textarea
            placeholder="Seçim"
            className="border p-2 rounded w-full"
            value={whoChoose.descriptionWhoChoose}
            onChange={(e) =>
              setWhoChoose({
                ...whoChoose,
                descriptionWhoChoose: e.target.value,
              })
            }
          />
        ),
      },
      {
        id: 22,
        name: "titleWhoChoose",
        label: "Neden biz başlık",
        component: (
          <input
            placeholder="başlık"
            className="border p-2 rounded w-full"
            value={whoChoose.titleWhoChoose}
            onChange={(e) =>
              setWhoChoose({ ...whoChoose, titleWhoChoose: e.target.value })
            }
          />
        ),
      },
    ],
  };

  const handleImagePreviewDelete = (index) => {
    const filteredImagePreview = staticModal.staticImages.filter(
      (img, i) => i !== index
    );
    setStaticModal((prevState) => ({
      ...prevState,
      staticImages: filteredImagePreview,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      staticModal: [
        {
          titleStatic: staticModal.titleStatic,
          descriptionStatic: staticModal.descriptionStatic,
          dishes: staticModal.dishes,
          experience: staticModal.experience,
          customers: staticModal.customers,
          staticImages:
            staticModal.staticImages.url || staticModal.staticImages,
        },
      ],
      introduction: [
        {
          titleIntro: introduction.titleIntro,
          descriptionIntro: introduction.descriptionIntro,
          content: introduction.content,
          imagesIntro: introduction.imagesIntro.url || introduction.imagesIntro,
        },
      ],
      chefs: [
        {
          titleChefs: chefs.titleChefs,
          descriptionChefs: chefs.descriptionChefs,
          content: chefs.content,
          imagesChefs: chefs.imagesChefs.url || chefs.imagesChefs,
        },
      ],
      mission: [
        {
          titleMission: mission.titleMission,
          descriptionMission: mission.descriptionMission,
        },
      ],
      whoImChoose: [
        {
          titleWhoChoose: whoChoose.titleWhoChoose,
          descriptionWhoChoose: whoChoose.descriptionWhoChoose,
        },
      ],
    };
    createAbout(payload);
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Hakkımızda</h1>
      <form
        onSubmit={onSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        {inputFields.staticModal.map((field) => (
          <div key={field.id} className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor={field.name}
            >
              {field.label}
            </label>
            {field.component}
          </div>
        ))}
        <div className="flex">
          {staticModal?.staticImages.map((item, index) => (
            <>
              {" "}
              <img
                key={index}
                src={item}
                className="w-24 h-24 rounded-full"
              />{" "}
              <span onClick={() => handleImagePreviewDelete(index)}>X</span>
            </>
          ))}
        </div>

        {inputFields.introduction.map((field) => (
          <div key={field.id} className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor={field.name}
            >
              {field.label}
            </label>
            {field.component}
          </div>
        ))}
        <div className="flex">
          <img
            src={introduction.imagesIntro.url}
            className="w-24 h-24 rounded-full"
          />
        </div>
        {inputFields.chefs.map((field) => (
          <div key={field.id} className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor={field.name}
            >
              {field.label}
            </label>
            {field.component}
          </div>
        ))}
        <div className="flex">
          <img src={chefs.imagesChefs.url} className="w-24 h-24 rounded-full" />
        </div>
        {inputFields.mission.map((field) => (
          <div key={field.id} className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor={field.name}
            >
              {field.label}
            </label>
            {field.component}
          </div>
        ))}

        {inputFields.whoImChoose.map((field) => (
          <div key={field.id} className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor={field.name}
            >
              {field.label}
            </label>
            {field.component}
          </div>
        ))}
        <Button disabled={CreateLoading} type="primary" htmlType="submit">
          {CreateLoading ? "yükleniyor" : "Güncelle"}
        </Button>
      </form>
    </div>
  );
};

export default AboutPage;
