import React from "react";
import { PinData } from "../context/PinContext";
import { Loading } from "../components/Loading";
import PinCard from "../components/PinCard";

const Home = () => {
  const { pins, loading } = PinData();
  // console.log( pins, loading ); // Debug to ensure values are coming through
  
  return (
    <div className="bg-gray-100 min-h-screen py-6">
      {loading ? (
        <Loading />
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pins && pins.length > 0 ? (
              pins.map((e, i) => (
                <PinCard
                  key={i}
                  pin={e}
                  className="bg-white shadow-md rounded-lg overflow-hidden"
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No Pins Yet
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
