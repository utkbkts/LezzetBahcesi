import { useSelector } from "react-redux";
const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="w-full  mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl !font-light open-sans mb-6">Profil</h1>
      <hr className="mb-6" />
      <div className="w-full flex flex-col gap-6">
        {/* İsim */}
        <div className="flex flex-col">
          <label className="text-gray-700 mb-1 text-sm font-medium">İsim</label>
          <input
            className="border-b-2 border-gray-300 focus:border-blue-500 p-2 outline-none transition-all"
            type="text"
            value={`${user?.name || "isim bilgisi girilmemiştir."}`}
            readOnly
          />
        </div>
        {/* Soy İsim */}
        <div className="flex flex-col">
          <label className="text-gray-700 mb-1 text-sm font-medium">
            Soy İsim
          </label>
          <input
            className="border-b-2 border-gray-300 focus:border-blue-500 p-2 outline-none transition-all"
            type="text"
            value={`${user?.lastName || "soy isim bilgisi girilmemiştir."}`}
            readOnly
          />
        </div>
        {/* Email */}
        <div className="flex flex-col">
          <label className="text-gray-700 mb-1 text-sm font-medium">
            Email
          </label>
          <input
            className="border-b-2 border-gray-300 focus:border-blue-500 p-2 outline-none transition-all"
            type="text"
            value={`${user?.email || "email bilgisi girilmemiştir."}`}
            readOnly
          />
        </div>
        {/* Email */}
        <div className="flex flex-col">
          <label className="text-gray-700 mb-1 text-sm font-medium">
            Adres
          </label>
          <input
            className="border-b-2 border-gray-300 focus:border-blue-500 p-2 outline-none transition-all"
            type="text"
            value={`${
              user?.userAddress?.address || "adres bilgisi girilmemiştir."
            }`}
            readOnly
          />
        </div>
        {/* şehir */}
        <div className="flex flex-col">
          <label className="text-gray-700 mb-1 text-sm font-medium">
            Şehir
          </label>
          <input
            className="border-b-2 border-gray-300 focus:border-blue-500 p-2 outline-none transition-all"
            type="text"
            value={`${
              user?.userAddress?.city || "şehir bilgisi girilmemiştir."
            }`}
            readOnly
          />
        </div>
        {/* telefon */}
        <div className="flex flex-col">
          <label className="text-gray-700 mb-1 text-sm font-medium">
            Telefon
          </label>
          <input
            className="border-b-2 border-gray-300 focus:border-blue-500 p-2 outline-none transition-all"
            type="text"
            value={`${
              user?.userAddress?.phoneNumber || "telefon bilgisi girilmemiştir."
            }`}
            readOnly
          />
        </div>
        {/* ülke */}
        <div className="flex flex-col">
          <label className="text-gray-700 mb-1 text-sm font-medium">Ülke</label>
          <input
            className="border-b-2 border-gray-300 focus:border-blue-500 p-2 outline-none transition-all"
            type="text"
            value={`${
              user?.userAddress?.country || "ülke bilgisi girilmemiştir."
            }`}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
