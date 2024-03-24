
import React, { useContext, useEffect, useRef, useState } from "react";
import InvoiceTableItemRow from "../../src/Components/SuccessPayment/InvoiceTableItemRow";
import ReactToPrint from "react-to-print";
import { getNowDateInFormate } from "../../lib/externalFunction";
import { MdDoneOutline } from "react-icons/md";
import CreateContext from "../../src/Components/CreateContex";
import QRCode from "qrcode.react";
import { useMyShopData } from "../../src/hooks/useMyShopData";
import RequireAuth from "../../src/RequireAuth/RequireAuth";
import { AiFillPrinter } from "react-icons/ai";
import Image from "next/image";
const SuccessOrder = () => {
  const { orderResponse } = useContext(CreateContext);

  const componentRef = useRef();

  const { data, isLoading } = useMyShopData();

  const transformedItems = orderResponse?.orderItem?.map(item => ({
    item_id: item._id,
    item_name: item.name,
    price: item.price,
    quantity: item.quantity,
  }));

  useEffect(() => {

    window.gtag("event", "purchase", {
      transaction_id: orderResponse?.invoiceNumber,
      value: orderResponse?.afterDiscountPrice,
      shipping: orderResponse?.shippingPrice,
      discount: orderResponse?.discount,
      currency: "BDT",
      items: transformedItems,
      user_data: {
        billing_first_name:orderResponse?.shippingAddress?.firstName,
        billing_last_name:orderResponse?.shippingAddress?.lastName,
        billing_phone:orderResponse?.shippingAddress?.phone,
        billing_address: orderResponse?.shippingAddress?.address,
        shipping_city: orderResponse?.shippingAddress?.city,
        shipping_postcode:orderResponse?.shippingAddress?.postalCode,

      }
      // user_data: orderResponse?.shippingAddress

    });
  }, [])

  return (
    // <RequireAuth>
    <div className="my-8">
      <div className="mid-container">
        <div className="flex md:flex-row items-center justify-between gap-2">
          <div className="flex gap-1 text-xs md:text-sm text-green-600 font-bold">
            <MdDoneOutline />
            <span>
              Thank Your {orderResponse?.shippingAddress?.firstName}
              {orderResponse?.shippingAddress?.lastName} Your order Done
            </span>
          </div>
          <div className="">
            <ReactToPrint
              trigger={() => (
                <button className=" text-center btn btn-sm text-white capitalize btn-primary my-5">
                  <AiFillPrinter size={18} className="mr-1" /> Print/Download
                </button>
              )}
              content={() => componentRef.current}
            />
          </div>
        </div>

        <div className="h-full py-12 " ref={componentRef}>
          <div className="  px-8  block md:flex justify-between ">
            <div>
              <h2 className="text-3xl font-bold uppercase text-black">
                invoice
              </h2>
              <QRCode
                size={110}
                className="my-2 "
                value={`Invoice:#${orderResponse?.invoiceNumber} | Total Amount: ৳${orderResponse?.totalAmount}.00`}
              />
            </div>
            <div className="w-1/3  md:my-0 my-8">
              <Image
                src={data?.data?.logo}
                alt="logo"
                className="w-32"
                width={100}
                height={100}
              />
              <p className="text-xs text-slate-600 mt-3">
                {data?.data?.address}
              </p>
              <p className="text-xs text-slate-600 mt-3">
                {data?.data?.phone}
              </p>
            </div>
          </div>
          <div className="  px-8">
            <div className=" grid md:mt-6 grid-cols-1 md:grid-cols-3 gap-3 justify-between">
              <div>
                <h2 className="text-sm font-bold mb-1">Date</h2>
                <p className="text-xs text-slate-600 ">
                  {getNowDateInFormate()}
                </p>
              </div>
              <div>
                <h2 className="text-sm font-bold mb-1">INVOICE NO.</h2>
                <p className="text-xs text-slate-600 ">
                  #{orderResponse?.invoiceNumber}
                </p>
              </div>
              <div>
                <h2 className="text-sm font-bold mb-1">INVOICE TO.</h2>
                <p className="text-xs text-slate-600 ">
                  {orderResponse?.shippingAddress?.firstName}{" "}
                  {orderResponse?.shippingAddress?.lastName}
                </p>
                <p className="text-xs text-slate-600 ">
                  {orderResponse?.shippingAddress?.address}{" "}
                  {orderResponse?.shippingAddress?.thana}{" "}
                  {orderResponse?.shippingAddress?.city}{" "}
                  {orderResponse?.shippingAddress?.postalCode}
                </p>
              </div>
            </div>
            {/* date-invoice no- invoice to */}
            {/* ----------------table data of product items--------- */}
            <div className="my-5 mx-auto sm:p-4 text-gray-800">
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs">
                  <thead className="bg-gray-300">
                    <tr className="text-left">
                      <th className="p-3">SR</th>
                      <th className="p-3">PRODUCT NAME</th>
                      <th className="p-3">QUANTITY</th>
                      <th className="p-3">PRICE</th>
                      <th className="p-3 ">TOTAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderResponse?.orderItem?.map((item, index) => (
                      <InvoiceTableItemRow
                        key={index}
                        index={index}
                        product={item}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* payment info */}
            <div className="p-8 bg-primary bg-opacity-5">
              <div className="grid grid-cols-1 md:grid-cols-4 justify-between gap-2">
                <div>
                  <h2 className="text-md font-bold ">PAYMENT METHOD</h2>
                  <p className="text-sm font-bold text-slate-600 uppercase">
                    {orderResponse?.paymentDetails?.method}
                  </p>
                  {orderResponse?.paymentDetails?.number && (
                    <p className="text-sm font-bold text-slate-600 uppercase">
                      {orderResponse?.paymentDetails?.number}
                    </p>
                  )}
                  {orderResponse?.paymentDetails?.trxId && (
                    <p className="text-sm font-bold text-slate-600 uppercase">
                      {orderResponse?.paymentDetails?.trxId}
                    </p>
                  )}
                </div>
                <div>
                  <h2 className="text-md font-bold ">SHIPPING COST</h2>
                  <p className="text-sm font-bold text-slate-600">
                    ৳{orderResponse?.shippingPrice}.00
                  </p>
                </div>
                <div>
                  <h2 className="text-md font-bold ">DISCOUNT</h2>
                  <p className="text-sm font-bold text-slate-600">
                    ৳{orderResponse?.discount}.00
                  </p>
                  {orderResponse?.couponDiscount > 0 && (
                    <small className="text-success">
                      Here coupon discount {orderResponse?.couponDiscount}TK.
                    </small>
                  )}
                </div>
                <div>
                  <h2 className="text-md font-bold ">TOTAL AMOUNT</h2>
                  <p className="text-sm font-bold text-primary">
                    ৳{orderResponse?.totalAmount}.00
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </RequireAuth>
  );
};

export default SuccessOrder;
