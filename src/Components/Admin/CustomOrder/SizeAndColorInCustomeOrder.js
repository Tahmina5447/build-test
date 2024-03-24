import React, { useContext, useState } from "react";
import CreateContext from "../../CreateContex";
import ProductColorPicker from "../../ProductSection/ProductColorPicker";


const SizeAndColorInCustomeOrder = ({ product, setIsOpen }) => {
  const [sizeIndex, setSizeIndex] = useState(0);
  const [inputSize, setInputSize] = useState(product.userSize || " ");
  const [userProductColor, setUserProductColor] = useState(
    product.userColor || " "
  );

  const { setAddToCartRefresher, addToCartRefresher } =
    useContext(CreateContext);
  const handleSaveSizeInLocal = () => {
    product.userSize = inputSize;
    product.userColor = userProductColor;
    const action = "size";
    // updateCartLocalStorage({ product, action });
    // setAddToCartRefresher(!addToCartRefresher);
  };

  const handleSize = (index, item) => {
    setSizeIndex(index);
    setInputSize(item);
  };
  return (
    <div>
      <h2 className="p-2 font-bold">Size:</h2>
      {product.size?.length > 0 && (
        <div className="flex flex-wrap mb-2">
          {product?.size?.map((item, index) => (
            <>
              <div
                onClick={() => handleSize(index, item)}
                key={index}
                className={`mx-1 border items-center rounded-md font-bold ${
                  item === inputSize
                    ? "bg-[#000] text-white"
                    : "bg-[#fff] text-black"
                } cursor-pointer flex gap-2 p-1 text-xs `}
              >
                <span className="text-xs pt-[2px]">{item}</span>
              </div>
            </>
          ))}
        </div>
      )}
      {product?.productColor?.length > 0 && (
        <ProductColorPicker
          productColor={product?.productColor}
          setUserProductColor={setUserProductColor}
          userProductColor={userProductColor}
        />
      )}
      <button
        onClick={() => {
          handleSaveSizeInLocal();
          setIsOpen(false);
        }}
        className="bg-primary px-5 py-1 text-white rounded-sm mt-3 hover:bg-opacity-0 hover:text-primary duration-150 border border-primary"
      >
        Save
      </button>
    </div>
  );
};

export default SizeAndColorInCustomeOrder;
