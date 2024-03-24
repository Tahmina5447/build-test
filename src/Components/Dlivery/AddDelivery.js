import React from "react";
import { useState } from "react";
import BdCity from "../BdCity";
import { useForm } from "react-hook-form";
import { postMethodHook } from "../../../lib/usePostHooks";
import server_url from "../../../lib/config";

const AddDelivery = ({ refetch }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const [selectedCity, setSelectedCity] = useState("");
  const [postResponse, setPostResponse] = useState(null);

  const handleAddShippingCost = (data) => {
    if (selectedCity.length <= 0) {
      return alert("Please Select City");
    }
    const url = server_url + "/delivery-cost";

    const shippingCost = { city: selectedCity, cost: data.cost };

    postMethodHook(url, shippingCost, refetch);

    reset();
  };

  return (
    <div>
      <section className="p-6 bg-gray-100 text-gray-900">
        <div className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid">
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-50">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <p className="font-medium uppercase">Add Shipping Cost</p>
              <p className="text-xs">
                You Can Add Different shipping cost for different city
              </p>
            </div>
            <form onSubmit={handleSubmit(handleAddShippingCost)} className="">
              <div className="block md:flex items-center gap-2">
                <div className="">
                  <BdCity
                    selectedCity={selectedCity}
                    setSelectedCity={setSelectedCity}
                  />
                </div>
                <div className="">
                  <label className="text-sm">Shipping Cost</label>
                  <input
                    type="Number"
                    {...register("cost", { required: true })}
                    placeholder="Price"
                    className={`shadow-sm border mb-2  bg-white text-black w-64 p-3 flex items-center justify-between rounded-lg cursor-pointer `}
                  />
                </div>
              </div>
              <div>
                <input
                  type="submit"
                  className={`btn btn-primary btn-sm text-white `}
                  value="Add Cost"
                />
              </div>
            </form>
          </fieldset>
        </div>
      </section>
    </div>
  );
};

export default AddDelivery;
