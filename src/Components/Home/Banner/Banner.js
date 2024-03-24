import React from "react";
import SidebarMenu from "./SiebarMenu";
import SliderInHeader from "./SliderInHeader";

const Banner = ({data,catagories}) => {
  return (
    <div className="bg-accent md:pb-5">
      <div className="mid-container mx-auto px-1 m:px-2">
        <div className="flex gap-0 md:gap-3">
          <div className="lg:w-[27%] lg:block hidden max-h-96 bg-white mt-4 pt-3 rounded-sm">
            <SidebarMenu catagories={catagories} />
          </div>
          {/* -----------------------------slider */}
          <div className="lg:w-[73%] w-full mt-4 ">
            <SliderInHeader data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
