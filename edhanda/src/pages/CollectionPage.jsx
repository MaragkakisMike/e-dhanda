import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ShopContext } from "../context/ShopContext";
import { useContext, useState, useCallback, memo } from "react";
import { assets } from "../assets/assets";
import ProductItem from "../components/ProductItem";
import SearchBar from "../components/SearchBar";

const FilterSection = ({ title, options, onChange }) => (
  <div className="border border-gray-400 pl-5 py-3 mt-6">
    <p className="mb-3 text-sm font-medium">{title}</p>
    <div className="flex flex-col gap-2 text-sm font-light text-gray-600">
      {options.map(({ value, label }) => (
        <p key={value} className="flex gap-2">
          <input
            type="checkbox"
            className="w-3"
            value={value}
            onChange={onChange}
          />
          {label}
        </p>
      ))}
    </div>
  </div>
);

const CATEGORIES = [
  { value: "Kitchen", label: "Kitchen Appliances" },
  { value: "Clothing", label: "Clothing" },
  { value: "Men", label: "Men" },
  { value: "Women", label: "Women" },
  { value: "Tech", label: "Tech" },
];

const SUBCATEGORIES = [
  { value: "Topwear", label: "Topwear" },
  { value: "Bottomwear", label: "Bottomwear" },
  { value: "Winterwear", label: "Winterwear" },
];

const SORT_FUNCTIONS = {
  relavent: null,
  "low-high": (a, b) => a.price - b.price,
  "high-low": (a, b) => b.price - a.price,
  "a-z": (a, b) => a.name.localeCompare(b.name),
  "z-a": (a, b) => b.name.localeCompare(a.name),
};

const CollectionPage = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    categories: new Set(),
    subcategories: new Set(),
    sortType: "relavent",
  });

  const handleFilterChange = useCallback((type, value) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      const set = new Set(prev[type]);

      if (set.has(value)) {
        set.delete(value);
      } else {
        set.add(value);
      }

      newFilters[type] = set;
      return newFilters;
    });
  }, []);

  const handleSortChange = useCallback((e) => {
    setFilters((prev) => ({
      ...prev,
      sortType: e.target.value,
    }));
  }, []);

  const displayedProducts = (() => {
    let filtered = [...products];
    const { categories, subcategories, sortType } = filters;

    // Apply category filter
    if (categories.size > 0) {
      filtered = filtered.filter((item) => categories.has(item.category));
    }

    // Apply subcategory filter
    if (subcategories.size > 0) {
      filtered = filtered.filter((item) => subcategories.has(item.subCategory));
    }

    // Apply search filter
    if (search && showSearch) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply sorting
    const sortFn = SORT_FUNCTIONS[sortType];
    if (sortFn) {
      filtered.sort(sortFn);
    }

    return filtered;
  })();

  const handleCategoryChange = useCallback(
    (e) => {
      handleFilterChange("categories", e.target.value);
    },
    [handleFilterChange]
  );

  const handleSubCategoryChange = useCallback(
    (e) => {
      handleFilterChange("subcategories", e.target.value);
    },
    [handleFilterChange]
  );

  return (
    <>
      <Navbar />
      <SearchBar />
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t ml-8 mr-8">
        <div className="min-w-60">
          <p
            onClick={() => setShowFilter((prev) => !prev)}
            className="my-2 text-xl flex items-center cursor-pointer gap-2"
          >
            Filters
            <img
              src={assets.dropdown_icon}
              alt=""
              className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            />
          </p>
          <div className={`${showFilter ? "" : "hidden"} sm:block`}>
            <FilterSection
              title="CATEGORIES"
              options={CATEGORIES}
              onChange={handleCategoryChange}
            />
            <FilterSection
              title="SUB-CATEGORIES"
              options={SUBCATEGORIES}
              onChange={handleSubCategoryChange}
            />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex justify-between text-base mb-4 sm:text-2xl">
            <h2 className="font-bold text-4xl text-secondary -sm:text-3xl">
              E-Dhanda's Collection
            </h2>
            <select
              value={filters.sortType}
              onChange={handleSortChange}
              className="border-2 border-gray-300 text-sm px-2"
            >
              <option value="relavent">Sort By: Relavence</option>
              <option value="high-low">Sort By: High to Low</option>
              <option value="low-high">Sort By: Low to High</option>
              <option value="a-z">Sort By: A to Z</option>
              <option value="z-a">Sort By: Z to A</option>
            </select>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 mt-10">
            {displayedProducts.map((item) => (
              <ProductItem key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CollectionPage;
