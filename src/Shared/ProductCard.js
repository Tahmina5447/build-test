
import { useContext, useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import CreateContext from "../Components/CreateContex";
import setCartInLocalStorage from "../../lib/setCartInLocalStorage";
import AlreadyProductHave from "../Components/Home/PopularProducts/AlreadyProductHave";
import { AiOutlineHeart } from "react-icons/ai";
import setWishlistInLocalStorage from "../../lib/setWishlistInLocalStorage";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
const ProductCard = ({ product }) => {
  // use for toast
  const [isAlreadyAvailable, setIsAlreadyAvailable] = useState(false);

  const navigate = useRouter();


  const handleBuyNowButtonClick = () => {
    window.gtag("event", "begin_checkout", {
      currency: "BDT",
      value: product?.salePrice,
      items: [
        {
          item_id: product?._id,
          item_name: product?.name,
          price: product?.salePrice,
          quantity: 1
        }
      ]
    });
  }

  const {
    addToCartRefresher,
    setAddToCartRefresher,
    setWishlistRefresher,
    wishlistRefresher,
    setBuyNowProduct,
  } = useContext(CreateContext);

  const handleSetLocalStorage = () => {
    setAddToCartRefresher(!addToCartRefresher);
    const localStorageMessage = setCartInLocalStorage(product);

    setIsAlreadyAvailable(false);

    if (localStorageMessage) {
      setIsAlreadyAvailable("Already Added In Cart");
    }
  };

  const handleSetLocalStorageWishlist = () => {
    setWishlistRefresher(!wishlistRefresher);
    const localStorageMessageWishlist = setWishlistInLocalStorage(product);

    setIsAlreadyAvailable(false);

    if (localStorageMessageWishlist) {
      setIsAlreadyAvailable("Already Added In Wishlist");
    }
  };

  const productView = () => {
    navigate.push(`/product/${product?._id}`)
    window.gtag("event", "view_item", {
      currency: "BDT",
      value: product?.salePrice,
      items: [
        {
          item_id: product?._id,
          item_name: product?.name,
          price: product?.salePrice,
          quantity: 1
        }
      ]

    });
  }

  const handleAddCartButtonClick = () => {
    window.gtag('event', 'add_to_cart', {
      currency: 'BDT',
      value: product?.salePrice,
      items: [
        {
          item_id: product?._id,
          item_name: product?.name,
          price: product?.salePrice,
          quantity: 1
        }
      ]
    });
  };

  return (
    <div className="bg-white rounded-md shadow box-border  hover:shadow-lg duration-100  overflow-hidden">
      <div className="mb-auto overflow-hidden relative">
        <Link
          href={`/product/${product?._id}`}
          className="w-full h-[200px] overflow-hidden relative cursor-pointer"
          onClick={() => { productView(); }}
        >
          <Image
            src={product?.imageURLs[0]}
            alt="product image"
            width={300}
            height={167}
            className="rounded-t-md h-[200px] hover:scale-110 duration-150 overflow-hidden object-cover"
          />
        </Link>
        <label
          onClick={() => { handleSetLocalStorageWishlist(); }}
          disabled={product?.quantity < 1}
          tabIndex={0}
          className="btn btn-sm btn-ghost btn-circle absolute top-0 right-0 bg-[#00000033]"
        >


          <AiOutlineHeart
            className="text-secondary hover:text-primary"
            size={22}
          />

        </label>
        {product?.quantity > 0 && (
          <Link
            href={`/checkout/direct-buy/${product?._id}`}
            tabIndex={0}
            className=" absolute top-0 left-0 "
          >
            <div onClick={() => handleBuyNowButtonClick(product?.name?.slice(0, 50))} className="flex items-center gap-1 text-xs  p-1 rounded-md cursor-pointer bg-primary bg-opacity-80 duration-150 hover:bg-opacity-70 text-white hover:text-black font-bold  border-2 border-primary ">
              <AiOutlineHeart className="" size={15} />
              <span className="text-[9px]">Buy Now</span>
            </div>
          </Link>
        )}
        {product?.discount > 0 && <span className=" absolute bottom-0 right-0 ">
          <div className="text-xs  px-1 rounded-sm cursor-pointer bg-red-600 bg-opacity-80  text-white  font-bold   ">
            <span className="text-[9px]">{product?.discount}% off</span>
          </div>
        </span>}
      </div>

      <div className="p-4 flex flex-col h-[140px] md:h-[130px]  justify-between ">
        <div>
          <h1
            className="text-sm font-semibold hover:text-primary cursor-pointer duration-150"
            onClick={() => { productView(); }}
          >
            {product?.name?.length > 38
              ? product?.name.slice(0, 37) + "..."
              : product?.name}
          </h1>
        </div>

        <div className="flex justify-between items-center mt-auto ">
          <div className="sm:flex items-center">
            <p className="text-lg text-primary font-bold">
              ৳ {product?.salePrice}
            </p>
            <p className="text-xs text-neutral line-through ml-1 mb-2">
              ৳{product?.productPrice}
            </p>
          </div>
          {product?.quantity < 1 ? (
            <span className="text-xs text-red-600 font-extrabold">
              Out Of Stock
            </span>
          ) : (
            <div className="flex items-center">
              <button
                disabled={product?.quantity < 1}
                onClick={() => { handleSetLocalStorage(); handleAddCartButtonClick(); }}
                // onClick={handleSetLocalStorage}
                className="bg-primary text-white btn-square btn-sm rounded-md flex justify-center items-center hover:bg-secondary hover:text-primary"
              >
                <MdAddShoppingCart size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
      <>
        {isAlreadyAvailable && (
          <AlreadyProductHave
            setIsAlreadyAvailable={setIsAlreadyAvailable}
            isAlreadyAvailable={isAlreadyAvailable}
          />
        )}
      </>
    </div>
  );
};

export default ProductCard;
