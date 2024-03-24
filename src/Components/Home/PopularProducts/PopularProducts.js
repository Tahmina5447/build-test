import { useContext, useEffect, useState } from "react";
import { MdOutlineUnfoldMore } from "react-icons/md";
import { useQuery } from "react-query";
import { products } from "../../../../lib/helper";
import { getCookie, setCookie } from "../../../hooks/useCustomCookie";
import { useCustomQuery } from "../../../hooks/useMyShopData";
import ProductCard from "../../../Shared/ProductCard";
import CreateContext from "../../CreateContex";
import CustomProductSectionSkeleton from "../../CustomSkeleton/CustomProductSectionSkeleton";

const PopularProducts = () => {
  const { setUser, setToken } = useContext(CreateContext);
  const [queryFilter, setQuery] = useState("");
  const [userInterest, setUserInterest] = useState("");
  const [visible, setVisible] = useState(10);

  const { data, isLoading, refetch } = useCustomQuery(
    ["products", userInterest],
    `product/user-interested-product?interest=${userInterest}`
  );

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 10);
  };

  useEffect(() => {
    const searchCookie = getCookie("searchQuery");
    if (!searchCookie) {
      return setUserInterest("a");
    }
    setUserInterest(searchCookie);
  }, []);

  return (
    <>
      {isLoading ? <CustomProductSectionSkeleton /> :
        <div className="py-1 md:py-10 bg-accent">
          <div className="mid-container">
            <div className="md:mb-7 mb-[-30px] mx-auto md:w-[600px]">
              <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold capitalize text-[#444]  mt-3 md:mt-8 md:mb-2">
                  Just For You
                </h1>
                <p className=" text-neutral">
                  Find Products Tailored to Your Unique Style and Preferences
                </p>
              </div>
            </div>
            <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3">
              {data?.data.result?.slice(0, visible).map((item) => (
                <ProductCard key={item._id} product={item}></ProductCard>
              ))}
            </div>
          </div>
          {data?.data.result.length > visible && <div className="w-full text-center">
            <button
              onClick={showMoreItems}
              className="bg-primary  px-3 py-2 font-bold mt-5 rounded-md mx-auto flex items-center gap-1 hover:bg-opacity-0 duration-150 text-white hover:text-primary border border-primary"
            >
              <MdOutlineUnfoldMore size={22} />
              Load More
            </button>
          </div>}
        </div>

      }
    </>
  );
};

export default PopularProducts;
