
import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import BkashPayment from "./BkashPayment";
import { AiOutlineRollback } from "react-icons/ai";
import { usePostOrder } from "../../../lib/usePostOrder";
import server_url from "../../../lib/config";
import CreateContext from "../CreateContex";
import Link from "next/link";
import Image from "next/image";
const PaymentIndex = ({ order }) => {
  const [method, setMethod] = useState("");
  const [isClickMethod, setIsClickMethod] = useState(false);
  const { setOrderResponse } = useContext(CreateContext);

  const router = useRouter();

  const onSubmitOrder = (data) => {
    if (data === "bkash") {
      order.paymentDetails = {
        method: "bkash",
      };
    } else {
      order.paymentDetails = {
        method: "cod",
      };
    }

    const url = `${server_url}/order`;
    usePostOrder(url, order, setOrderResponse, router);

  };

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold uppercase flex items-center">
        {isClickMethod && (
          <span
            onClick={() => {
              setIsClickMethod(false);
              setMethod("");
            }}
            className="cursor-pointer mr-2 bg-red-600 hover:bg-primary hover:text-black text-white duration-200"
          >
            <AiOutlineRollback />
          </span>
        )}{" "}
        Payment Method
      </h2>
      <span className="divider -mt-1"></span>
      {!isClickMethod && (
        <div className=" flex flex-wrap gap-2 md:gap-5 mb-3">
          <Image
            onClick={() => {
              setMethod("cod");
              onSubmitOrder("cod");
            }}
            src={"/assets/cod.jpeg"}
            alt="cod"
            width={200}
            height={200}
            className="w-20 h-20 rounded-md object-fill hover:scale-50 duration-300 cursor-pointer border-4 p-2"
          />
          <Link target="_blank" href={'https://shop.bkash.com/arshi-tread-international01716/paymentlink/default-payment'}>
            <Image
              onClick={() => {
                setMethod("");
                // setIsClickMethod(false);
                onSubmitOrder("bkash");
              }}
              src={"/assets/bkash.png"}
              alt="cod"
              width={200}
              height={200}
              className="w-20 h-20 rounded-md object-fill hover:scale-50 duration-300 cursor-pointer border-2 p-2"
            /></Link>
          {/* <Image
            onClick={() => {
              setMethod("rocket");
              setIsClickMethod(true);
            }}
            width={200}
            height={200}
            src={"/assets/nogod.png"}
            alt="cod"
            className="w-20 h-20 rounded-md object-fill hover:scale-50 duration-300 cursor-pointer border-2 p-2"
          /> */}
          <Image
            onClick={() => {
              setMethod("nagad");
              setIsClickMethod(true);
            }}
            src={"/assets/nogod.png"}
            alt="cod"
            width={200}
            height={200}
            className="w-20 h-20 rounded-md object-fill hover:scale-50 duration-300 cursor-pointer border-2 p-2"
          />
        </div>
      )}
      {(method === "bkash" || method === "rocket" || method === "nagad") && (
        <BkashPayment method={method} order={order} />
      )}
    </div>
  );
};

export default PaymentIndex;
