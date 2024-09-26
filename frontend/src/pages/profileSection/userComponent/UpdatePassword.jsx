import { useEffect } from "react";
import LoadingButton from "../../../ui/LoadingButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updatePassword } from "../../../utils/validation";
import { useUpdateProfilePasswordMutation } from "../../../redux/api/UserApi";
import { toast } from "react-hot-toast";
import Loading from "../../../components/loading/Loader";
const UpdatePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updatePassword),
  });
  const [passwordUpdate, { isLoading, isSuccess, error }] =
    useUpdateProfilePasswordMutation();
  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message || "tekrar deneyiniz.");
    }
    if (isSuccess) {
      toast.success("Parola başarılı bir şekilde güncellenmiştir.");
    }
  }, [isSuccess, error]);

  const onSubmit = async (values) => {
    await passwordUpdate(values);
  };

  if (isLoading) return <Loading />;
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full mt-10 p-6 bg-white rounded-lg shadow-lg"
    >
      <h1 className="text-3xl !font-light open-sans mb-6">Parola Değiştir</h1>
      <hr className="mb-6" />
      <div className="w-full flex flex-col gap-6">
        {/* İsim */}
        <div className="flex flex-col">
          <label className="text-gray-700 mb-1 text-sm font-medium">
            Eski Parola
          </label>
          <input
            className={`border-b-2 border-gray-300 focus:border-blue-500 p-2 outline-none transition-all ${
              errors.OldPassword ? "border-red-500 focus:border-red-500" : ""
            }`}
            type="text"
            {...register("OldPassword")}
          />
          {errors.OldPassword && (
            <p className="text-red-500">{errors?.OldPassword?.message}</p>
          )}
        </div>
        {/* Soy İsim */}
        <div className="flex flex-col">
          <label className="text-gray-700 mb-1 text-sm font-medium">
            Yeni Parola
          </label>
          <input
            className={`border-b-2 border-gray-300 focus:border-blue-500 p-2 outline-none transition-all ${
              errors.newPassword ? "border-red-500 focus:border-red-500" : ""
            }`}
            type="text"
            {...register("password")}
          />
          {errors.newPassword && (
            <p className="text-red-500">{errors?.password?.message}</p>
          )}
        </div>

        <div>
          <LoadingButton loading={isLoading} htmlType="submit" type="primary">
            Güncelle
          </LoadingButton>
        </div>
      </div>
    </form>
  );
};

export default UpdatePassword;
