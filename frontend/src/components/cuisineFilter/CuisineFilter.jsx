import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Checkbox, Form, Input } from "antd";
import StarRatings from "react-star-ratings";
import { getPriceQuery } from "../../helpers/helpers";
const fixedPriceRanges = [
  { label: "0-30 TL", min: 0, max: 30 },
  { label: "30-50 TL", min: 30, max: 50 },
  { label: "50-100 TL", min: 50, max: 100 },
  { label: "100-150 TL", min: 100, max: 150 },
  { label: "150-200 TL", min: 150, max: 200 },
  { label: "200-300 TL", min: 200, max: 300 },
  { label: "300-500 TL", min: 300, max: 500 },
  { label: "500-1000 TL", min: 500, max: 1000 },
  { label: "1000-2000 TL", min: 1000, max: 2000 },
  { label: "2000 TL ve üstü", min: 2000, max: Infinity },
];

const CuisineFilter = ({ data }) => {
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const [minPrice, setMinPrice] = useState(searchParams.get("min") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("max") || "");

  //kategori filterlama fonksiyonu
  const handleCategoryFilter = (checkbox) => {
    const checkBoxes = document.getElementsByName(checkbox.name);

    checkBoxes.forEach((item) => {
      if (item !== checkbox) {
        item.checked = false;
      }

      if (checkbox.checked === false) {
        if (searchParams.has(checkbox.name)) {
          searchParams.delete(checkbox.name);
          const path = window.location.pathname + "?" + searchParams.toString();
          navigate(path);
        }
      } else {
        if (searchParams.has(checkbox.name)) {
          searchParams.set(checkbox.name, checkbox.value);
        } else {
          searchParams.append(checkbox.name, checkbox.value);
        }
        const path = window.location.pathname + "?" + searchParams.toString();

        navigate(path);
      }
    });
  };
  const defaultCheckHandler = (checkboxType, checkboxValue) => {
    const values = searchParams.getAll(checkboxType);
    return values.includes(checkboxValue);
  };

  //fiyat listeleme
  const handlePrice = (range) => {
    const currentMin = searchParams.get("min");
    const currentMax = searchParams.get("max");

    if (
      currentMin === range.min.toString() &&
      currentMax === range.max.toString()
    ) {
      searchParams.delete("min");
      searchParams.delete("max");
    } else {
      searchParams.set("min", range.min);
      searchParams.set("max", range.max);
    }

    setSearchParams(searchParams);
    navigate(window.location.pathname + "?" + searchParams.toString());
  };

  const handleButtonOnclick = () => {
    if (!minPrice && searchParams.has("min")) {
      searchParams.delete("min");
    }
    if (!maxPrice && searchParams.has("max")) {
      searchParams.delete("max");
    }

    if (minPrice) {
      searchParams = getPriceQuery(searchParams, "min", minPrice);
    }
    if (maxPrice) {
      searchParams = getPriceQuery(searchParams, "max", maxPrice);
    }

    setSearchParams(searchParams);
  };

  const handleCheck = () => {
    searchParams = new URLSearchParams();
    setSearchParams(searchParams);
    setMaxPrice("");
    setMinPrice("");
    navigate(window.location.pathname);
  };

  return (
    <div className="cuisine">
      <div>
        <Button onClick={handleCheck}>Aramayı Sıfırla</Button>
      </div>
      <h5>Kategoriler</h5>
      <hr />
      {data.categories?.map((item, index) => (
        <Checkbox
          onClick={(e) => handleCategoryFilter(e.target)}
          key={index}
          value={item}
          checked={defaultCheckHandler("category", item)}
          name="category"
        >
          {item}
        </Checkbox>
      ))}
      <hr />
      <h5>Değerlendirmeler</h5>
      {[5, 4, 3, 2, 1, 0]?.map((item, index) => {
        return (
          <div key={index}>
            <Checkbox
              name="ratings"
              value={item}
              checked={defaultCheckHandler("ratings", item?.toString())}
              onClick={(e) => handleCategoryFilter(e.target)}
            >
              <StarRatings
                rating={parseFloat(item)}
                starRatedColor="#ffb829"
                numberOfStars={5}
                name="ratings"
                starDimension="14px"
                starSpacing="1px"
              />
            </Checkbox>
          </div>
        );
      })}
      <hr />
      <h5>Fiyat Listesi</h5>
      <div className="flex flex-col gap-2">
        {fixedPriceRanges.map((item, index) => (
          <Checkbox
            name="productDetail"
            onClick={() => handlePrice(item)}
            key={index}
            checked={defaultCheckHandler("min", item.min.toString())}
          >
            {item.label}
          </Checkbox>
        ))}
        <Form
          onFinish={handleButtonOnclick}
          className="flex items-center gap-4"
        >
          <Input
            name="min"
            placeholder="min"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <Input
            name="max"
            placeholder="max"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          <Button type="primary" htmlType="submit">
            Ara
          </Button>
        </Form>
      </div>
    </div>
  );
};

CuisineFilter.propTypes = {
  data: PropTypes.shape({
    categories: PropTypes.array.isRequired,
    FilteredProductCount: PropTypes.number,
    resPerPage: PropTypes.number,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        category: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default CuisineFilter;
