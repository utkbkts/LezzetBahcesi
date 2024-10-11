import { useEffect, useState } from "react";
import StaticModalForm from "./partials/StaticModal";
import {
  useCreateAboutMutation,
  useGetAboutQuery,
} from "../../../../redux/api/AboutApi";
import SecondsModalForm from "./partials/SecondsModalForm";

const AboutPage = () => {
  const initialState = {
    titleStatic: "",
    descriptionStatic: "",
    experience: { years: "", description: "" },
    customers: { count: "", description: "" },
    dishes: { count: "", description: "" },
    staticImages: [{ url: "" }],
  };
  const secondsInitialState = {
    header: "",
    content: "",
    paragraph: [""],
    secondsImage: [{ url: "" }],
  };
  const [staticModal, setStaticModal] = useState(initialState);
  const [secondsModal, setSecondsModal] = useState(secondsInitialState);
  const [createAbout] = useCreateAboutMutation();
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
    }
  }, [getAbout]);

  const onSubmit = (e) => {
    e.preventDefault();
    createAbout({ staticModal, secondsModal });
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
