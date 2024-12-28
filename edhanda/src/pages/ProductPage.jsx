import { useParams } from "react-router-dom";
import { useContext, useMemo, memo } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const StarRating = ({ rating = 4 }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: 5 }).map((_, idx) => (
      <img
        key={idx}
        src={idx < rating ? assets.star_icon : assets.star_dull_icon}
        className="w-3.5"
        alt={`star-${idx + 1}`}
      />
    ))}
    <p className="pl-12">(112)</p>
  </div>
);

const SizeSelector = ({ selectedSize, onSizeChange }) => (
  <div className="flex flex-col gap-4 my-8">
    <p>Select Size</p>
    <div className="flex gap-4">
      {["S", "M", "L"].map((sizeOption) => (
        <button
          key={sizeOption}
          onClick={() => onSizeChange(sizeOption)}
          className={`border-2 px-4 py-2 ${
            selectedSize === sizeOption
              ? "border-accent2 bg-gray-200"
              : "bg-gray-100 hover:border-accent2"
          }`}
        >
          {sizeOption}
        </button>
      ))}
    </div>
  </div>
);

const ImageGallery = ({ images, selectedImage, onImageSelect }) => (
  <div className="flex flex-1 flex-col-reverse gap-3 sm:flex-row">
    <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal w-full sm:w-[18.7%]">
      {images.map((item, index) => (
        <img
          src={item}
          key={index}
          onClick={() => onImageSelect(item)}
          className={`cursor-pointer w-[24%] sm:w-full sm:mb-3 flex-shrink-0 ${
            selectedImage === item ? "border-2 border-accent2" : ""
          }`}
          alt={`product-${index + 1}`}
        />
      ))}
    </div>
    <div className="w-full sm:w-[80%]">
      <img src={selectedImage} className="w-full h-auto" alt="main-product" />
    </div>
  </div>
);

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const {
    productData,
    initialImage,
    handleImageChange,
    handleSizeChange,
    selectedSize,
    selectedImage,
  } = useMemo(() => {
    const product = products.find((item) => item._id === productId);

    if (!product) {
      return {
        productData: null,
        initialImage: "",
        handleImageChange: () => {},
        handleSizeChange: () => {},
        selectedSize: "",
        selectedImage: "",
      };
    }

    let currentImage = product.image[0];
    let currentSize = "";

    const handleImageChange = (newImage) => {
      currentImage = newImage;
    };

    const handleSizeChange = (newSize) => {
      currentSize = newSize;
    };

    return {
      productData: product,
      initialImage: product.image[0],
      handleImageChange,
      handleSizeChange,
      get selectedSize() {
        return currentSize;
      },
      get selectedImage() {
        return currentImage;
      },
    };
  }, [productId, products]);

  if (!productData) {
    return <div className="opacity-0" />;
  }

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in opacity-100 duration-500">
      <div className="flex gap-12 flex-col sm:flex-row">
        <ImageGallery
          images={productData.image}
          selectedImage={selectedImage || initialImage}
          onImageSelect={handleImageChange}
        />

        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <StarRating />

          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>

          <SizeSelector
            selectedSize={selectedSize}
            onSizeChange={handleSizeChange}
          />

          <button
            onClick={() => addToCart(productData._id, selectedSize)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-accent2"
          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5" />

          <div className="flex flex-col gap-1 text-sm text-gray-500">
            <p>Delivery</p>
            <p>Free delivery on all orders over $100</p>
            <p>Easy Return and Save Policy within 7 days</p>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            E-Dhanda is a comprehensive online marketplace that caters to all of
            your shopping needs...
          </p>
          <p>
            E-Dhanda is more than just an online marketplace- it is a
            destination that caters to your every shopping need...
          </p>
        </div>
      </div>

      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;
