import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import styles from "./Sidebar.module.css";
import "swiper/css/autoplay";

// import required modules
import { Pagination, Autoplay } from "swiper";
import CustomBannerSkeleton from "../../CustomSkeleton/CustomBannerSkeleton";
import Image from "next/image";



const SliderInHeader = ({data}) => {
  const [isLoading,setIsLoading]=useState(true)
  useEffect(()=>{
    if(data){
      setIsLoading(false)
    }
  },[data])
  return (
    <div className="mt-1 md:mt-0">
      {
        isLoading ? <CustomBannerSkeleton /> :
          <Swiper
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, Autoplay]}
            className={styles}
            autoplay={{ delay: 10000 }}
          // navigation
          >
            {data?.status === "success" &&
              data.data.result.map((banner) => (
                <SwiperSlide>
                  <Image
                    width={700}
                    height={562}
                    alt="banner"
                    className="md:h-[370px] h-full object-cover md:object-fill w-full"
                    src={banner.image}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
      }

    </div>
  );
};

export default SliderInHeader;
