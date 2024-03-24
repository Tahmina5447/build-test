import React, { useContext, useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";

import Link from "next/link";
import { useCustomQuery } from "../../hooks/useMyShopData";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import CreateContext from "../CreateContex";
import { setCookie } from "../../hooks/useCustomCookie";
import Image from "next/image";
import NavbarProductCard from "../../Shared/NavbarProductCard";

const NavbarSearch = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [searchEnable, setSearchEnable] = useState(false);
  const containerRef = useRef(null);
  const { queryFromCategory, setQueryFromCategory } = useContext(CreateContext);
  //   const [result, setResult] = useState([]);
  const { data: result, loading } = useCustomQuery(
    ["product", searchValue],
    `product?status=true&search=${searchValue}`
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setSearchEnable(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCookie("searchQuery", e.target.search.value, 7);
    setSearchEnable(false);
    setQueryFromCategory(`search=${searchValue}`);
    router.push(`/shop`);
  };

  const handleIntersProductSave = (product) => {
    setCookie("searchQuery", searchValue, 7);
    setSearchEnable(false);
  };
  return (
    <div className="navbar-center block lg:flex justify-center items-center lg:w-[55%] w-full relative">
      <div className="form-control w-full">
        <form
          onSubmit={handleSearchSubmit}
          className="input-group input-group-md"
        >
          <input
            type="text"
            onChange={(e) => {
              setSearchValue(e.target.value);
              setSearchEnable(true);
            }}
            placeholder="I am looking for...."
            className="input input-bordered border-primary input-md block w-full h-10"
            style={{ outline: "none" }}
            name="search"
          />
          <button
            type="submit"
            className="btn btn-square btn-sm bg-primary  border-none hover:bg-secondary h-10"
          >
            <AiOutlineSearch size={22} color="white" />
          </button>
        </form>
        {/* search product list */}
        {result?.status === "success" &&
          searchEnable &&
          searchValue.length > 1 && (
            <div
              ref={containerRef}
              className="w-full max-h-[350px] bg-white border-gray-200 border p-3 rounded-md overflow-y-scroll shadow-xl absolute top-10 z-10 left-0 right-0"
            >
              {result.data.products.length > 0 ? (
                result.data.products.slice(0, 10).map((product) => (
                  <NavbarProductCard product={product}/>
                ))
              ) : (
                <div className="text-center uppercase py-8">
                  Product Not found
                </div>
              )}
            </div>
          )}
      </div>
    </div>
  );
};

export default NavbarSearch;
