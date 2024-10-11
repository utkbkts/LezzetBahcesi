import { useEffect, useState } from "react";
import StaticModalForm from "./partials/StaticModal";
import {
  useCreateAboutMutation,
  useGetAboutQuery,
} from "../../../../redux/api/AboutApi";
import SecondsModalForm from "./partials/SecondsModalForm";
import ThirdModalForm from "./partials/ThirdModalForm";
import toast from "react-hot-toast";

const AboutPage = () => {
  const initialState = {
    titleStatic: "",
    descriptionStatic: "",
    experience: { years: "" },
    customers: { count: "" },
    dishes: { count: "" },
    staticImages: [{ url: "" }],
  };
  const secondsInitialState = {
    header: "",
    content: "",
    paragraph: [""],
    secondsImage: [{ url: "" }],
  };
  const thirdsInitialState1 = {
    title: "",
    paragraph: "",
    header: "",
    content: "",
    imageChef: [{ url: "" }],
  };
  const fourthInitialState = {
    header: "",
    paragraph: "",
  };
  const fivethInitialState = {
    header: "",
    paragraph: "",
  };
  const [staticModal, setStaticModal] = useState(initialState);
  const [secondsModal, setSecondsModal] = useState(secondsInitialState);
  const [chefs1, setChefsModal1] = useState(thirdsInitialState1);
  const [mission, setMission] = useState(fourthInitialState);
  const [whoChoose, setWhoChoose] = useState(fivethInitialState);
  const [createAbout, { isSuccess, isError, error }] = useCreateAboutMutation();
  const { data: getAbout } = useGetAboutQuery();
  useEffect(() => {
    if (getAbout) {
      setStaticModal({
        titleStatic: getAbout?.about?.staticModal?.titleStatic || "",
        descriptionStatic:
          getAbout?.about?.staticModal?.descriptionStatic || "",
        experience: {
          years: getAbout?.about?.staticModal?.experience?.years || "",
          description:
            getAbout?.about?.staticModal?.experience?.description || "",
        },
        customers: {
          count: getAbout?.about?.staticModal?.customers?.count || "",
          description:
            getAbout?.about?.staticModal?.customers?.description || "",
        },
        dishes: {
          count: getAbout?.about?.staticModal?.dishes?.count || "",
          description: getAbout?.about?.staticModal?.dishes?.description || "",
        },
        staticImages: getAbout?.about?.staticModal?.staticImages || [],
      });
      setSecondsModal({
        header: getAbout?.about?.secondsModal?.header || "",
        content: getAbout?.about?.secondsModal?.content || "",
        paragraph: getAbout?.about?.secondsModal?.paragraph || "",
        secondsImage: getAbout?.about?.secondsModal?.secondsImage || "",
      });
      setChefsModal1({
        header: getAbout?.about?.chefs1?.header || "",
        content: getAbout?.about?.chefs1?.content || "",
        title: getAbout?.about?.chefs1?.title || "",
        paragraph: getAbout?.about?.chefs1?.paragraph || "",
        imageChef: getAbout?.about?.chefs1?.imageChef || "",
      });
      setMission({
        header: getAbout?.about?.mission?.header || "",
        paragraph: getAbout?.about?.mission?.paragraph || "",
      });
      setWhoChoose({
        header: getAbout?.about?.whoChoose?.header || "",
        paragraph: getAbout?.about?.whoChoose?.paragraph || "",
      });
    }
  }, [getAbout]);
  useEffect(() => {
    if (isSuccess) {
      toast.success("Başarılı bir şekilde güncellendi");
    }
    if (isError) {
      toast.error(error.data.message);
    }
  }, [isSuccess, isError, error]);

  const onSubmit = (e) => {
    e.preventDefault();
    createAbout({ staticModal, secondsModal, chefs1, mission, whoChoose });
  };
  return (
    <div className="mt-[100px]">
      <form onSubmit={onSubmit} className="space-y-4">
        <h1>İlk alan</h1>
        <StaticModalForm
          setStaticModal={setStaticModal}
          staticModal={staticModal}
        />
        <h1>İkinci alan</h1>
        <SecondsModalForm
          setSecondsModal={setSecondsModal}
          secondsModal={secondsModal}
        />
        <h1>Üçüncü alan</h1>
        <ThirdModalForm setChefsModal1={setChefsModal1} chefs1={chefs1} />
        <h1>Dördüncü alan</h1>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            name="header"
            placeholder="misyon başlığı"
            value={mission.header}
            onChange={(e) =>
              setMission((prevState) => ({
                ...prevState,
                header: e.target.value,
              }))
            }
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            type="text"
            name="paragraph"
            rows={4}
            placeholder="misyon paragrafı"
            value={mission.paragraph}
            onChange={(e) =>
              setMission((prevState) => ({
                ...prevState,
                paragraph: e.target.value,
              }))
            }
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <h1>Beşinci alan</h1>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            name="header"
            placeholder="Neden Biz başlık "
            value={whoChoose.header}
            onChange={(e) =>
              setWhoChoose((prevState) => ({
                ...prevState,
                header: e.target.value,
              }))
            }
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            type="text"
            name="paragraph"
            rows={4}
            placeholder="Neden Biz açıklama "
            value={whoChoose.paragraph}
            onChange={(e) =>
              setWhoChoose((prevState) => ({
                ...prevState,
                paragraph: e.target.value,
              }))
            }
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white py-2 px-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Güncelle
        </button>
      </form>
    </div>
  );
};

export default AboutPage;
