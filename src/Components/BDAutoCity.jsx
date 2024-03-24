import React, { useEffect, useState } from "react";
import Select from "react-select";

const BDAutoCity = ({ selectedCity, setSelectedCity, setShippingCost }) => {
    // ----------------------------
    const [searchResult, setSearchResult] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [open, setOpen] = useState(false);
    useEffect(() => {
        fetch(`https://akashwebs.github.io/data-of-district/bd.json`)
            .then((res) => res.json())
            .then((data) => {
                const match = data.districts.filter((d) =>
                    d.name.toLowerCase().includes(searchText.toLowerCase())
                );
                setSearchResult(match);
            });
    }, [searchText]);

    // ----------------------------
    const handleSearchChange = (event) => {
        const name = event.target.value;
        setSearchText(name);
    };
    const handleSelectCity = (district) => {
        if (district?.name) {
            let districtName = district.name;
            setSelectedCity(districtName);
            setOpen(false);
            setSearchText("");
            const url = `https://backend-five-teal.vercel.app/api/v1/delivery-cost/get-delivery-for-user?city=${districtName}`;
            fetch(url)
                .then((res) => res.json())
                .then((data) => setShippingCost(data?.data?.cost));
        }
    };


    const handleSelectedUser = (district) => {


        if (district.value) {
            let districtName = district.value;
            setSelectedCity(districtName);
            setOpen(false);
            setSearchText("");
            const url = `https://backend-five-teal.vercel.app/api/v1/delivery-cost/get-delivery-for-user?city=${districtName}`;
            fetch(url)
                .then((res) => res.json())
                .then((data) => setShippingCost(data?.data?.cost));
        }
    }
    // setSelectedUser(user.value)


    return (
        <>
            {/* ---------------------------------------------------------- */}
            <div className=''>
                <div className="w-full">
                    <label htmlFor="message" className="leading-7 text-sm">
                        Select City
                    </label>
                    <div className=" border  bg-white text-black md:w-[300px] w-full  p-1 flex items-center justify-between rounded cursor-pointer ">
                        <Select
                            defaultValue={selectedCity}
                            onChange={handleSelectedUser}
                            // isMulti
                            name="user"
                            required
                            options={searchResult?.map((district) => {
                                return {
                                    value: district.name, label: <div className="flex gap-5">
                                        <p className="w-20">{district.name}</p>
                                        <p className="w-2">-</p>
                                        <p className="w-20">{district.bn_name}</p>
                                    </div>
                                }
                            })}
                            className="outline-none w-full  text-[16px] border-none  focus:border-primary "
                            id='choose_account_category'
                            classNamePrefix="select"
                            isSearchable
                        />
                        {/* ----------------Create new user------------------ */}
                    </div>
                </div>
            </div>
            {/* ---------------------------------------------------------- */}
        </>
    );
};

export default BDAutoCity;
