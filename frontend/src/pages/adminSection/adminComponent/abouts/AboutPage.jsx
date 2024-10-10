import { useEffect, useState } from "react";
import StaticModalForm from "./partials/StaticModal";
import {
  useCreateAboutMutation,
  useGetAboutQuery,
} from "../../../../redux/api/AboutApi";

const AboutPage = () => {
  const initialState = {
    titleStatic: "",
    descriptionStatic: "",
    experience: { years: "", description: "" },
    customers: { count: "", description: "" },
    dishes: { count: "", description: "" },
    staticImages: [{ url: "" }],
  };
  const [staticModal, setStaticModal] = useState(initialState);
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
    }
  }, [getAbout]);

  const onSubmit = (e) => {
    e.preventDefault();
    createAbout({ staticModal });
  };
  return (
    <div className="mt-[100px]">
      <form onSubmit={onSubmit} className="space-y-4">
        <StaticModalForm
          initialState={initialState}
          setStaticModal={setStaticModal}
          staticModal={staticModal}
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
