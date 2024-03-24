import { getCategories, products } from "../../../../lib/helper";
import { useQuery } from "react-query";
import LoadingComponets from "../../../Shared/LoadingComponets";
import Link from "next/link";

import { useContext, useEffect, useState } from "react";
import CreateContext from "../../CreateContex";
import CustomFeaturedCategoriesSkeleton from "../../CustomSkeleton/CustomFeaturedCategoriesSkeleton";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper';
import Image from "next/image";

const Category = ({ catagories }) => {
  const { setQueryFromCategory } = useContext(CreateContext);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (catagories) {
      setIsLoading(false)
    }
  }, [catagories])
  // const {
  //   data: catagories,
  //   isLoading,
  //   refetch,
  // } = useQuery(["categories"], getCategories);

  const handelCategoryParams = (cat) => {
    const params = new URLSearchParams();
    params.append("category", cat);
    const url = `${params.toString()}`;
    setQueryFromCategory(url)
  }


  return (
    <>
      <div className="sm:py-5  py-0 bg-accent">
        <div className="mid-container2">
          <div className="text-center mb-4 hidden md:block">
            <h1 className="text-3xl md:text-4xl font-bold capitalize text-[#444]  mt-8 mb-2">
              Featured Categories
            </h1>
            <p className=" text-neutral">
              Choose your necessary products from this feature categories.
            </p>
          </div>


          {/* ====================== old code ==================== */}
          {/* {
          isLoading?<CustomFeaturedCategoriesSkeleton/>:<div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {catagories?.data?.result?.slice(0, 8).map((category,index) => {
            return (
              <div
                key={index}
                className=" justify-center p-2 h-28 md:h-24 rounded-md flex items-center"
                style={{
                  boxShadow:
                    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                }}
              >
                <div className="w-1/3">
                  <Image
                    alt="category icon"
                    src={category?.imageURLs[0]}
                    width={35}
                    height={35}
                    className="rounded-md object-fill w-5 h-5 mx-auto"
                  />
                </div>
                <div className="w-2/3">
                  <Link
                    onClick={() =>
                      setQueryFromCategory(
                        `category=${category.parentCategory}`
                      )
                    }
                    href={"/shop"}
                    className="text-sm font-bold hover:text-primary"
                  >
                    {category.parentCategory}
                  </Link>
                  <ul className="">
                    {category.childCategory.map((child, index) => (
                      <li key={index} className="p-0 -m-[3px]">
                        <Link
                          onClick={() =>
                            setQueryFromCategory(`subCategory=${child}`)
                          }
                          href={"/shop"}
                          className="text-xs hover:text-primary capitalize cursor-pointer"
                        >
                          - {child}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
        } */}

          {/* ====================== old code ==================== */}


          {
            isLoading ? <CustomFeaturedCategoriesSkeleton /> : (
              <Swiper
                slidesPerView={2}
                spaceBetween={10}
                breakpoints={{
                  '@.50': {
                    slidesPerView: 3,
                    spaceBetween: 10,
                  },
                  '@1.00': {
                    slidesPerView: 4,
                    spaceBetween: 10,
                  },
                  '@1.50': {
                    slidesPerView: 4,
                    spaceBetween: 10,
                  },
                  '@1.75': {
                    slidesPerView: 6,
                    spaceBetween: 15,
                  },
                  '@2.25': {
                    slidesPerView: 8,
                    spaceBetween: 15,
                  }
                }}
                navigation={true}
                modules={[Navigation]}
                className=" mySwiper_2"
              >
                {catagories?.data?.result?.map((category, index) => {
                  return (
                    <SwiperSlide key={index} className="">
                      <div
                        className=" justify-center flex-col p-2 h-28 md:h-28 rounded-md my-5 flex items-center"
                        style={{
                          boxShadow:
                            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                        }}
                      >
                        <div className="w-full">
                          <Image
                            alt="category icon"
                            src={category?.imageURLs[0]}
                            width={35}
                            height={35}
                            className="rounded-md object-fill w-10 h-10 mx-auto"
                          />
                        </div>
                        <div className="w-full text-center">
                          <Link
                            onClick={() =>
                              // setQueryFromCategory(
                              //   `category=${category.parentCategory}`
                              // )
                              handelCategoryParams(category.parentCategory)
                            }
                            href={"/shop"}
                            className="text-sm font-bold hover:text-primary"
                          >
                            {category.parentCategory}
                          </Link>
                          {/* <ul className="">
                        {category.childCategory.map((child, index) => (
                          <li key={index} className="p-0 -m-[3px]">
                            <Link
                              onClick={() =>
                                setQueryFromCategory(`subCategory=${child}`)
                              }
                              href={"/shop"}
                              className="text-xs hover:text-primary capitalize cursor-pointer"
                            >
                              - {child}
                            </Link>
                          </li>
                        ))}
                      </ul> */}
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            )
          }


        </div>
      </div>
    </>

  );
};

export default Category;
