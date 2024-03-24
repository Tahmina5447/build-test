import React, { useContext, useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsBagCheck } from "react-icons/bs";

import Link from "next/link";
import CartDrawer from "./drawer/CartDrawer";
import CreateContext from "../Components/CreateContex";
import WishlilstDrawer from "./drawer/WishlilstDrawer";
import CatagoryMenu from "./CatagoryMenu";
import { useRouter } from "next/router";
import { reactLocalStorage } from "reactjs-localstorage";
import AuthUser from "../../lib/AuthUser";
import { useMyShopData, useUserData } from "../hooks/useMyShopData";
import { SlUser } from "react-icons/sl";
import NavbarSearch from "../Components/NavbarSerach/NavbarSearch";
import LogoLoader from "./LogoLoader";
import Image from "next/image";

const Navbar = () => {
  const router = useRouter();
  const { logout } = AuthUser();
  const {
    addToCartRefresher,
    isOpen,
    setIsOpen,
    localStorageCartItems,
    setlocalStorageCartItems,
    localStorageWishlistItems,
    setlocalStorageWishlistItems,
    wishlistRefresher,
    isOpenWishlist,
    setIsOpenWishlist,
    user,
    token,
    setUser,
    setToken,
    setQueryFromCategory,
  } = useContext(CreateContext);

  const userRole = user?.role;
  const { isLoading, data: shopData, error } = useMyShopData();
  // const { user: userData } = useUserData();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user_info"));
    const token = localStorage.getItem("access");
    setUser(user);
    setToken(token);
  }, [router, setUser, setToken]);

  const { pathname } = useRouter();

  // const [isOpen, setIsOpen] = React.useState(false);
  // use for open cart drawer
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  // ---------use for open wishlist drawer--------------
  const toggleDrawerWishlist = () => {
    setIsOpenWishlist(!isOpenWishlist);
  };

  useEffect(() => {
    const carts = reactLocalStorage.getObject("shopping-cart", true);
    const cart = JSON.parse(carts);
    setlocalStorageCartItems(cart);

    const wishilists = reactLocalStorage.getObject("wishlist", true);
    const wishilist = JSON.parse(wishilists);
    setlocalStorageWishlistItems(wishilist);
  }, [
    setlocalStorageCartItems,
    setlocalStorageWishlistItems,
    wishlistRefresher,
    addToCartRefresher,
  ]);

  const handleLogOut = () => {
    // reactLocalStorage.clear();
    // remove user from local storage to log user out
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  const handleAdminDashboard = async () => {
    await router.push("/admin/dashboard");
  };
  const handleUserDashboard = async () => {
    await router.push("/user/dashboard");
  };

  return (
    <>
      {/* ------top small menu------------------ */}
      <div className="py-2 hidden lg:block">
        <div className="grid grid-cols-1 md:grid-cols-2  mid-container mx-auto text-xs  px-2">
          <div>
          </div>
          <div>
            <ul className="flex justify-end gap-2">
              <li>
                <a
                  href="#"
                  className="px-8 inline-block border-r-2 border-slate-300"
                >
                  Call: {shopData?.data?.phone}
                </a>
              </li>
              <li>
                <a
                  href={shopData?.data?.facebookPage || "#"}
                  target="_blank"
                  className="px-8 inline-block border-r-2 border-slate-300"
                >
                  FB Page
                </a>
              </li>
              <li>
                <a
                  href={shopData?.data?.facebookGroup || "#"}
                  target="_blank"
                  className="px-8 inline-block  border-slate-300"
                >
                  FB Group{" "}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* --------------------main navbar------------------------ */}
      <div className="sticky top-0 z-[15]">
        <div className="bg-white ">
          <div className="navbar mid-container mx-auto">
            <div className="navbar-start hidden lg:block w-[25%]  -mt-9">
              <Link href={"/"} className="">
                <Image
                  src={"/logo1.png"}
                  alt="logo"
                  height={50}
                  width={200}
                  className=" w-[180px] py-2 "
                />
              </Link>
            </div>
            {/* ------serachbar center-------- */}
            <NavbarSearch />

            <div className="navbar-end text-end w-[20%] lg:block hidden">
              <div className="flex justify-end gap-2">
                {/* --------------wishilist--------------------------- */}
                <div className="flex">
                  <div className="">
                    <label
                      onClick={toggleDrawerWishlist}
                      tabIndex={0}
                      className="btn btn-ghost btn-circle text-primary hover:text-white hover:bg-primary"
                    >
                      <div className="indicator">
                        <AiOutlineHeart className="" size={28} />
                        <span className="badge badge-sm indicator-item bg-primary border-none text-white">
                          {localStorageWishlistItems.totalItems
                            ? localStorageWishlistItems.totalItems
                            : 0}
                        </span>
                      </div>
                    </label>
                  </div>
                  {/* -------------------------cart box----------------------- */}
                  <div className="">
                    <label
                      tabIndex={0}
                      className="btn btn-ghost btn-circle text-primary hover:text-white hover:bg-primary"
                      onClick={toggleDrawer}
                    >
                      <div className="indicator">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7 "
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        <span className="badge badge-sm indicator-item bg-primary border-none text-white">
                          {localStorageCartItems.totalItems
                            ? localStorageCartItems.totalItems
                            : 0}
                        </span>
                      </div>
                    </label>
                  </div>
                  {!token && (
                    <div className="ml-4 mt-2">
                      <label
                        tabIndex={0}
                        className=""
                      >
                        <div className="flex items-center gap-2 ">
                          <SlUser size={24} className="text-primary" />
                          <div className="text-primary text-xs flex flex-col items-start">
                            <Link
                              className="hover:text-black duration-150"
                              href={"/auth/login"}
                            >
                              Login
                            </Link>
                            <Link
                              className="hover:text-black duration-150"
                              href={"/auth/register"}
                            >
                              Register
                            </Link>
                          </div>
                        </div>
                      </label>
                    </div>
                  )}
                </div>
                {/* nav drop */}

                {token && (
                  <div className="dropdown dropdown-end">
                    <label
                      tabIndex={0}
                      className="btn btn-ghost btn-circle avatar bg-primary"
                    >
                      <div className="w-10 rounded-full">
                        <Image
                          src={user?.imageURL || "/assets/user.jpg"}
                          className="rounded-full"
                          height={100}
                          width={100}
                          alt="profile"
                        />
                      </div>
                    </label>

                    <ul
                      tabIndex={0}
                      className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li>
                        {token && userRole === "user" && (
                          <Link
                            href={"/user/dashboard"}
                            className="justify-between"
                          >
                            Dashboard
                          </Link>
                        )}
                        {token && userRole === "admin" && (
                          <Link
                            href={"/admin/dashboard"}
                            className="justify-between"
                          >
                            Dashboard
                          </Link>
                        )}
                      </li>

                      {token && userRole === "user" && (
                        <li>
                          <Link
                            href={"/user/my-order"}
                            className="justify-between"
                          >
                            My Order
                          </Link>
                        </li>
                      )}

                      {token &&
                        (userRole === "admin" || userRole === "user") ? (
                        <>
                          <li>
                            <span onClick={logout}>Logout</span>
                          </li>
                        </>
                      ) : (
                        <></>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* -------------------------3rd menu--------------- */}
        <div className="lg:block hidden border-b shadow-sm z-50 bg-primary">
          {/* ------second bg color write in global.css */}
          <div className="mid-container mx-auto">
            <div>
              {/* ----------catgoriy dropdown---- */}

              <div className="navbar py-0 min-h-0 z-50">
                <div className="flex-none mx-auto" >
                  <ul className="menu menu-horizontal py-1 px-0 w-full  font-medium text-lg text-white">
                    {pathname != "/" && (
                      <li tabIndex={0}>
                        <a className="w-[300px] shadow-sm py-2 ">
                          <GiHamburgerMenu size={25} />
                          Shop By Department
                          <svg
                            className="fill-current ml-auto"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                          >
                            <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                          </svg>
                        </a>
                        <CatagoryMenu />
                      </li>
                    )}
                    <li>
                      <Link
                        className="py-2"
                        href="/"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={() => setQueryFromCategory("")}
                        className="py-2"
                        href="/shop"
                      >
                        Shop
                      </Link>
                    </li>
                    <li>
                      <Link href="/offer" className="py-2">
                        Offer
                      </Link>
                    </li>
                    <li>
                      <Link href="/about" className="py-2">
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact" className="py-2">
                        Contact Us
                      </Link>
                    </li>
                    {/* <li>
                      <Link href="/faq" className="py-2">
                        FAQ
                      </Link>
                    </li> */}
                  </ul>
                </div>
              </div>
              {/* -----------end 3rd emnu dropdown */}
            </div>
          </div>
        </div>
      </div>
      <CartDrawer
        isOpen={isOpen}
        toggleDrawer={toggleDrawer}
        dir={"right"}
        products={localStorageCartItems}
      />
      <WishlilstDrawer
        isOpenWishlist={isOpenWishlist}
        toggleDrawerWishlist={toggleDrawerWishlist}
        dir={"right"}
        products={localStorageWishlistItems}
      />

      {/* shopping bag for dekstop */}

      {localStorageCartItems.totalItems > 0 && (
        <div
          className="toast toast-end toast-middle z-10 cursor-pointer hidden md:block"
          onClick={toggleDrawer}
        >
          <div className="alert p-0 bg-primary">
            <div className="flex flex-col text-xs">
              <div className="text-white font-bold flex flex-col items-center px-5 bg-slate-300  rounded-t-md py-3">
                <BsBagCheck size={25} className="text-primary mb-1" />
                <span className="text-slate-600 text-sm">
                  {localStorageCartItems?.totalItems} Items
                </span>
              </div>
              <p className="text-white font-bold  text-sm pb-2">
                ৳{localStorageCartItems?.cartTotal}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* shopping bag for mobile */}
      {localStorageCartItems.totalItems > 0 && (
        <div
          className="toast toast-end toast-middle z-10 mr-[-20px] cursor-pointer block md:hidden "
          onClick={toggleDrawer}
        >
          <div className="alert p-0 bg-primary">
            <div className="flex flex-col text-xs">
              <div className="text-white font-bold flex flex-col items-center px-3 bg-slate-300  rounded-md py-3">
                <BsBagCheck size={22} className="text-primary mb-1" />
                <span className="text-slate-600 text-sm">
                  {localStorageCartItems?.totalItems} Items
                </span>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

// cart drawer
