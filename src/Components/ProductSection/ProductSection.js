import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import LoadingComponets from "../../Shared/LoadingComponets";
import ProductCard from "../../Shared/ProductCard";
import { AiFillEye } from "react-icons/ai";
import CreateContext from "../CreateContex";
import { products } from "../../../lib/helper";
import CustomProductSectionSkeleton from "../CustomSkeleton/CustomProductSectionSkeleton"
const ProductSection = ({
  // query,
  heading,
  subtitle = "",
  data,
  // viewQuery,
  // sliceItem = 10,
}) => {
  // const [queryFilter, setQuery] = useState(query);
  // const { queryFromCategory, setQueryFromCategory } = useContext(CreateContext);
  // const { data, isLoading, refetch } = useQuery(["products", queryFilter], () =>
  //   products(queryFilter)
  // );
const [isLoading,setIsLoading]=useState(true)

useEffect(()=>{
if(data){
  setIsLoading(false)
}
},[data])

  return (
    <>
      <div className=" mid-container">
        <div className="md:mb-7 mb-[-30px] mx-auto md:w-[600px]">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold capitalize text-[#444]  mt-8 mb-2">
              {heading}
            </h1>
            <p className=" text-neutral">{subtitle}</p>
          </div>
        </div>
        {!isLoading ? (
          <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3">
            {data.slice(0, 15)?.map((item) => (
              <ProductCard key={item._id} product={item}></ProductCard>
            ))}
          </div>
        ) : (
          <CustomProductSectionSkeleton />
        )}
      </div>
      <div className="text-center mt-10 mb-2">
        <Link
          onClick={() => setQueryFromCategory(viewQuery)}
          href={"/shop"}
          className="inline-block bg-primary px-4 py-2 rounded-md hover:bg-white hover:text-primary border border-primary text-white duration-150 font-bold "
        >
          <span className="flex justify-center items-center gap-2 ">
            <AiFillEye size={22} /> View All
          </span>
        </Link>
      </div>
    </>
  );
};

export default ProductSection;
