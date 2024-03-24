import React from "react";

import Drawer from "react-modern-drawer";
import { BiHeart } from "react-icons/bi";

import "react-modern-drawer/dist/index.css";
import WishlistProductItems from "./WishlistProductItems";

const WishlilstDrawer = ({
  isOpenWishlist,
  toggleDrawerWishlist,
  dir,
  products,
}) => {
  return (
    <>
      <Drawer
        open={isOpenWishlist}
        onClose={toggleDrawerWishlist}
        direction={dir}
        className="cart-drawer "
        style={{ width: "400px" }}
      >
        <div className="bg-primary p-3 md:py-4 md:px-7">
          <div className="flex justify-between">
            <span className="flex items-center text-white gap-2">
              <BiHeart size={26} />
              <span className="text-xl font-bold">Wishlist</span>
            </span>
            <span className=" p-3">
              <button
                onClick={toggleDrawerWishlist}
                className="text-white hover:text-red-500"
              >
                <span>x</span> close
              </button>
            </span>
          </div>
        </div>
        {/* ------------------------items------------------- */}

        <div className=" overflow-y-scroll h-[85%]">
          {products?.items?.map((product) => (
            <WishlistProductItems key={product._id} product={product} />
          ))}
        </div>
      </Drawer>
    </>
  );
};

export default WishlilstDrawer;
