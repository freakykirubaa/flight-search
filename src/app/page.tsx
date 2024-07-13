"use client";
import { useState } from "react";
import Image from "next/image";
import Dropdown from "../../components/Dropdown";
import AirWays from "../../assets/airlogo.png";

export default function Home() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [cabin, setCabin] = useState("");
  const [results, setResults] = useState(null);
  const [searchParams, setSearchParams] = useState({
    origin: "",
    destination: "",
    cabin: "",
  });

  const handleSearch = async () => {
    const response = await fetch("http://localhost:10000/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchParams),
    });
    const data = await response.json();
    setResults(data);
  };

  const handleSetOrigin = (value:any) => {
    setOrigin(value);
    setSearchParams((prev) => ({ ...prev, origin: value }));
  };

  const handleSetDestination = (value:any) => {
    setDestination(value);
    setSearchParams((prev) => ({ ...prev, destination: value }));
  };

  const handleSetCabin = (value:any) => {
    setCabin(value);
    setSearchParams((prev) => ({ ...prev, cabin: value }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-950 text-white">
      <div className="p-8 w-full max-w-md">
        <h1 className="text-[20px] font-bold mb-4 whitespace-nowrap">
          Choose Origin & Destination Airports:
        </h1>

        <div className="mb-4 cursor-pointer">
          <Dropdown
            label="Origin"
            options={["JFK", "DEL", "SYD", "LHR", "CDG", "DOH", "SIN"]}
            value={origin}
            onChange={handleSetOrigin}
          />
        </div>

        <div className="mb-4 cursor-pointer">
          <Dropdown
            label="Destination"
            options={["JFK", "DEL", "SYD", "LHR", "CDG", "DOH", "SIN"]}
            value={destination}
            onChange={handleSetDestination}
          />
        </div>

        <div className="mb-4 cursor-pointer">
          <Dropdown
            label="Cabin"
            options={["Economy", "Business", "First"]}
            value={cabin}
            onChange={handleSetCabin}
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
        
            {
              //@ts-ignore
            results.data.length > 0 ? (
              //@ts-ignore
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
                    {searchParams.origin} ➔ {searchParams.destination}
                  </p>
                  <p>
                    {result.departure_time} - {result.return_time}
                  </p>

                  {cabin === "Business" && (
                    <div className="mt-4">
                      <p className="text-lg">
                        {result.min_business_miles !== null &&
                        result.min_business_tax !== null
                          ? `${result.min_business_miles} + $${result.min_business_tax}`
                          : "N/A"}
                      </p>
                      <p className="text-sm">Min Business Miles</p>
                    </div>
                  )}

                  {cabin === "Economy" && (
                    <div className="mt-4">
                      <p className="text-lg">
                        {result.min_economy_miles !== null &&
                        result.min_economy_tax !== null
                          ? `${result.min_economy_miles} + $${result.min_economy_tax}`
                          : "N/A"}
                      </p>
                      <p className="text-sm">Min Economy Miles</p>
                    </div>
                  )}

                  {cabin === "First" && (
                    <div className="mt-4">
                      <p className="text-lg">
                        {result.min_first_miles !== null &&
                        result.min_first_tax !== null
                          ? `${result.min_first_miles} + $${result.min_first_tax}`
                          : "N/A"}
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
