"use client";
import { useState } from "react";
import Image from "next/image";
import Select from "react-select";
import axios from "axios";

import AirWays from "../../assets/airlogo.png";

export default function Home() {
  const [origin, setOrigin] = useState<any>(null);
  const [destination, setDestination] = useState<any>(null);
  const [cabin, setCabin] = useState<any>(null);
  const [results, setResults] = useState<any>(null);

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        //@ts-ignore
        process.env.NEXT_PUBLIC_API_ENDPOINT, {
        origin: origin?.value,
        destination: destination?.value,
        cabin: cabin?.value,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const originOptions = [
    { value: "JFK", label: "JFK" },
    { value: "DEL", label: "DEL" },
    { value: "SYD", label: "SYD" },
    { value: "BOM", label: "BOM" },
    { value: "BNE", label: "BNE" },
    { value: "BLR", label: "BLR" },
  ];

  const destinationOptions = [
    { value: "JFK", label: "JFK" },
    { value: "DEL", label: "DEL" },
    { value: "SYD", label: "SYD" },
    { value: "LHR", label: "LHR" },
    { value: "CDG", label: "CDG" },
    { value: "DOH", label: "DOH" },
    { value: "SIN", label: "SIN" },
  ];

  const cabinOptions = [
    { value: "Economy", label: "Economy" },
    { value: "Business", label: "Business" },
    { value: "First", label: "First" },
  ];

  const customStyles = {
    control: (provided:any) => ({
      ...provided,
      backgroundColor: "#1F2937",
      color: "#FFFFFF",
      borderRadius: "0.375rem",
      padding: "0.5rem",
    }),
    menu: (provided:any) => ({
      ...provided,
      backgroundColor: "#1F2937",
      color: "#FFFFFF",
    }),
    singleValue: (provided:any) => ({
      ...provided,
      color: "#FFFFFF",
    }),
    option: (provided:any, state:any) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#2D3748" : "#1F2937",
      color: "#FFFFFF",
    }),
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-950 text-white">
      <div className="p-8 w-full max-w-md">
        <h1 className="text-[20px] font-bold mb-4 whitespace-nowrap">
          Choose Origin & Destination Airports:
        </h1>
        <div className="mb-4">
          <label className="block mb-2">Origin</label>
          <Select
            styles={customStyles}
            options={originOptions}
            value={origin}
            onChange={setOrigin}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Destination</label>
          <Select
            styles={customStyles}
            options={destinationOptions}
            value={destination}
            onChange={setDestination}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Cabin</label>
          <Select
            styles={customStyles}
            options={cabinOptions}
            value={cabin}
            onChange={setCabin}
          />
        </div>
        <button
          className="px-6 bg-teal-500 text-white p-2 rounded"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {results && (
        <div className="p-8 w-full max-w-4xl mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {results.data.length > 0 ? (
              results.data.map((result:any, index:any) => (
                <div key={index} className="bg-green-900 p-4 text-center">
                  <div className="flex justify-center">
                    <Image
                      src={AirWays}
                      alt="logo"
                      className="mb-2 w-20 h-20"
                    />
                  </div>
                  <p>
                    {origin?.label} ➔ {destination?.label}
                  </p>
                  <p>
                    {result.departure_time} - {result.return_time}
                  </p>
                  {cabin?.value === "Business" && (
                    <div className="mt-4">
                      <p className="text-lg">
                        {result.min_business_miles === "N/A"
                          ? "N/A"
                          : `${result.min_business_miles} + $${result.min_business_tax}`}
                      </p>
                      <p className="text-sm">Min Business Miles</p>
                    </div>
                  )}
                  {cabin?.value === "Economy" && (
                    <div className="mt-4">
                      <p className="text-lg">
                        {result.min_economy_miles === "N/A"
                          ? "N/A"
                          : `${result.min_economy_miles} + $${result.min_economy_tax}`}
                      </p>
                      <p className="text-sm">Min Economy Miles</p>
                    </div>
                  )}
                  {cabin?.value === "First" && (
                    <div className="mt-4">
                      <p className="text-lg">
                        {result.min_first_miles === "N/A"
                          ? "N/A"
                          : `${result.min_first_miles} + $${result.min_first_tax}`}
                      </p>
                      <p className="text-sm">Min First Miles</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>Try another search route.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
