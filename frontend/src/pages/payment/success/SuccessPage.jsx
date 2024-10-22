import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle, HandHeart } from "lucide-react";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";
import { useGetUserOrderQuery } from "../../../redux/api/OrderApi";
import { useEffect } from "react";
import Loading from "../../../components/loading/Loader";

const SuccessPage = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetUserOrderQuery();

  useEffect(() => {
    if (!isLoading) {
      if (!data?.orders?.length) {
        navigate("/", { replace: true });
      }
    }

    window.scrollTo(0, 0);
  }, [data, isLoading, navigate]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="h-screen flex items-center justify-center !overflow-hidden">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        gravity={0.1}
        style={{ zIndex: 99 }}
        numberOfPieces={700}
        recycle={false}
      />
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl !overflow-hidden relative z-10">
        <div className="p-6 sm:p-8">
          <div className="flex justify-center">
            <CheckCircle className="text-emerald-400 w-16 h-16 mb-4" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-emerald-400 mb-2">
            Ödeme Başarılı &ldquo;{data?.orders[0]?.user?.name}&ldquo;
            teşekkürler
          </h1>

          <p className="text-gray-300 text-center mb-2">
            Sipariş için teşekkür ederiz. siparişlerini kullanıcı panelinden
            takip edebilirsin.
          </p>
          <p className="text-emerald-400 text-center text-sm mb-6">
            Detaylı bilgiler için email hesabını kontrol edebilirsin
          </p>
          <div className="bg-gray-700 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Sipariş Numaran</span>
              <span className="text-sm font-semibold text-emerald-400">
                #{data?.orders[0]?._id}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <button
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4
             rounded-lg transition duration-300 flex items-center justify-center"
            >
              <HandHeart className="mr-2" size={18} />
              Bize güvendiğiniz için teşekkür ederiz!
            </button>
            <Link
              to={"/"}
              className="w-full bg-gray-700 hover:bg-gray-600 text-emerald-400 font-bold py-2 px-4 
            rounded-lg transition duration-300 text-sm flex items-center justify-center"
            >
              Lezzetli ürünlerimize bakmak ister misin
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
