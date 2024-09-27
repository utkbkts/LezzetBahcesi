import { useEffect } from "react";
import CuisineFilter from "../../components/cuisineFilter/CuisineFilter";
import SearchResultCard from "../../components/searchResultCard/SearchResultCard";
import PaginationPage from "../../components/pagination/Pagination";
import { useSearchParams } from "react-router-dom";
import { useGetAllProductsQuery } from "../../redux/api/ProductApi";
import toast from "react-hot-toast";
import "./Search.css";
import Loading from "../../components/loading/Loader";
const Search = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page") || 1;
  const search = searchParams.get("query") || "";
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const category = searchParams.get("category");
  const ratings = searchParams.get("ratings");
  const params = { page, search };

  min !== null && (params.min = min);
  max !== null && (params.max = max);

  category !== null && (params.category = category);
  ratings !== null && (params.ratings = ratings);

  const { data, isError, error, isLoading } = useGetAllProductsQuery(params);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError]);

  const handleClick = () => {
    searchParams = new URLSearchParams();
    setSearchParams(searchParams);
  };
  if (isLoading) return <Loading />;
  return (
    <div className="search min-h-screen">
      <div className="cuisines-list">
        <CuisineFilter data={data} />
      </div>
      <div id="main-content" className="searchBar">
        <div className="grid grid-cols-3 gap-2">
          {data?.products?.length > 0 ? (
            data?.products?.map((product) => (
              <div key={product._id}>
                <SearchResultCard {...product} />
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center text-center h-screen">
              <h1 className="text-2xl font-semibold text-gray-800 mb-4 open-sans">
                Arama sonucu maalesef bulunamadı.
              </h1>
              <p className="text-gray-600">
                Aradığınız ürün mevcut değil. Lütfen başka bir anahtar kelime
                deneyin.
              </p>
              <button
                onClick={handleClick}
                className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
              >
                Yeniden Ara
              </button>
            </div>
          )}
        </div>
        {data?.products?.length > 0 && (
          <PaginationPage
            resPerPage={data?.resPerPage}
            filteredProductsCount={data?.FilteredProductCount}
          />
        )}
      </div>
    </div>
  );
};

export default Search;
