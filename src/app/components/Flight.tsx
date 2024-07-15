"use client";
import { useState } from "react";
import Image from "next/image";
import Select from "react-select";
import axios from "axios";
import { css } from "@emotion/react";
import { SyncLoader } from "react-spinners"; // Import SyncLoader from react-spinners

import {
  AIRWAYS,
  cabinOptions,
  customStyles,
  destinationOptions,
  originOptions,
} from "../common/common";

export default function Flight() {
  const [origin, setOrigin] = useState<any>(null);
  const [destination, setDestination] = useState<any>(null);
  const [cabin, setCabin] = useState<any>(null);
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false); // State for loading indicator

  const handleSearch = async () => {
    setLoading(true); // Set loading state to true
    try {
      const response = await axios.post(
        //@ts-ignore
        process.env.NEXT_PUBLIC_API_ENDPOINT,
        {
          origin: origin?.value,
          destination: destination?.value,
          cabin: cabin?.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false); // Set loading state to false after fetching
    }
  };

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

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
      {loading ? (
        <div className="loader-container">
          <SyncLoader
          //@ts-ignore
            css={override}
            size={10}
            color={"#00BFFF"}
            loading={loading}
          />
        </div>
      ) : (
        results && (
          <div className="p-8 w-full max-w-4xl mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {results.data.length > 0 ? (
                results.data.map((result: any, index: any) => (
                  <div key={index} className="bg-green-900 p-4 text-center">
                    <div className="flex justify-center">
                      <Image
                        src={AIRWAYS}
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
        )
      )}
    </div>
  );
}
