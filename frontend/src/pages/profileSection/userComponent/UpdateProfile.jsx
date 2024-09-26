import { useEffect } from "react";
import { useUpdateProfileMutation } from "../../../redux/api/UserApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileCreate } from "../../../utils/validation";
import { useForm } from "react-hook-form";
import LoadingButton from "../../../ui/LoadingButton";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { updateProfileData } from "../../../constants/data";

const UpdateProfile = () => {
  const [updateProfile, { isLoading, error, isSuccess }] =
    useUpdateProfileMutation();
  const { user } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateProfileCreate),
  });
  useEffect(() => {
    if (user) {
      setValue("name", user?.name);
      setValue("lastName", user?.lastName);
      setValue("email", user?.email);
      setValue("phoneNumber", user?.userAddress?.phoneNumber);
      setValue("city", user?.userAddress?.city);
      setValue("country", user?.userAddress?.country);
      setValue("address", user?.userAddress?.address);
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("profil başarıyla güncellendi");
    }
  }, [isSuccess, error]);

  const handleUpdate = async (values) => {
    const userAddress = {
      city: getValues("city"),
      country: getValues("country"),
      address: getValues("address"),
      phoneNumber: getValues("phoneNumber"),
    };
    const updatedValues = {
      ...values,
      userAddress,
    };

    await updateProfile(updatedValues);
  };

  return (
    <div className="w-full  mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl !font-light open-sans mb-6">Profil Güncelle</h1>
      <hr className="mb-6" />
      <form
        onSubmit={handleSubmit(handleUpdate)}
        className="w-full flex flex-col gap-6"
      >
        {updateProfileData.map((item) => (
          <div key={item.id} className="flex flex-col">
            <label className="text-gray-700 mb-1 text-sm font-medium">
              {item.label}
            </label>
            <input
              className={`border-b-2 border-gray-300 focus:border-blue-500 p-2 outline-none transition-all ${
                errors.name ? "border-red-500 focus:border-red-500" : ""
              }`}
              type={item.type}
              {...register(item.name)}
            />
            {errors[item.name] && (
              <p className="text-red-500"> {errors[item.name].message}</p>
            )}
          </div>
        ))}

        <div>
          <LoadingButton loading={isLoading} htmlType="submit" type="primary">
            Güncelle
          </LoadingButton>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
