import Hero from "../../components/hero/Hero";
import { Button } from "antd";
import contact from "/food/about-img.jpg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactPage } from "../../utils/validation";
import { useSendMessageMutation } from "../../redux/api/ContactApi";
import toast from "react-hot-toast";
import menu7 from "/menuPage/img-def.png";

import { useEffect } from "react";
const ContactPage = () => {
  const [sendMessages, { isSuccess, isLoading, error }] =
    useSendMessageMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactPage),
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Mesaj başarılı bir şekilde gönderildi");
      reset();
    }
    console.log(error);
  }, [isSuccess, error]);

  const onSubmit = async (data) => {
    await sendMessages({
      message: data.message,
      email: data.email,
    });
  };
  return (
    <div className="h-full">
      {/* Hero Section */}
      <div className="relative">
        <Hero
          classNameHero={"bg-contact"}
          title={"İletişim."}
          titleClass={"berkshire-swash-regular"}
          subTitle={"Aklınıza takılan her soruyu sorabilirsiniz."}
          titleMainClass={"items-center"}
        />
        <div className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <img src={menu7} alt="image" />
        </div>
      </div>
      <div className="container mx-auto mt-12 mb-12">
        <div className="flex items-center justify-center w-full">
          <img src={contact} alt="" />
        </div>
        <div className="flex items-start justify-center py-16 px-8  ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-1/2 border border-gray-400 p-4 h-[500px] flex flex-col justify-center"
          >
            <h2 className="open-sans leading-relaxed py-4 px-4 text-center uppercase">
              İletişim kur
            </h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="email"
                {...register("email")}
                placeholder="email"
                className="border outline-none p-2 text-[13px] text-[#333] h-[50px] border-[#e6e6e6]"
              />
              {errors.email && (
                <span className="text-red-600 text-sm">
                  {errors.email.message}
                </span>
              )}
              <textarea
                name="message"
                placeholder="mesaj"
                {...register("message")}
                rows={4}
                className="border outline-none p-2 text-[13px] text-[#333] border-[#e6e6e6] resize-none"
              />
              {errors.message && (
                <span className="text-red-600 text-sm">
                  {errors.message.message}
                </span>
              )}
              <Button htmlType="submit" type="default" disabled={isLoading}>
                {isLoading ? "gönderiliyor.." : "Gönder"}
              </Button>
            </div>
          </form>
          <div className="w-1/2 border border-gray-400  h-[500px] flex flex-col justify-center">
            <iframe
              width="100%"
              height="100%"
              src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(lezzet%20bah%C3%A7esi)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            >
              <a href="https://www.gps.ie/">gps devices</a>
            </iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
