import React, { useEffect, useState } from "react";
import axios from "axios";

function Vehicles({ setDownload, refresh, usernic }) {
  const [vehicle, setVehicle] = useState([]);
  const [numberplates, setNumberplates] = useState([]);
  const [activeVehicle, setActiveVehicle] = useState(0);

  const getVehicle = async () => {
    try {
      const response = await axios.get(
        `https://vehicle-service-b32q.onrender.com/api/vehicles/search_nic/${usernic}`
      );
      setVehicle(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const extractNumberplates = () => {
    const plates = vehicle.map((vehicle) => vehicle.regNo);
    setNumberplates(plates);
  };

  useEffect(() => {
    getVehicle();
  }, [refresh]);

  useEffect(() => {
    extractNumberplates();
  }, [vehicle]);

  useEffect(() => {
    if (vehicle.length > 0) {
      setDownload(vehicle[activeVehicle]);
    }
  }, [activeVehicle, vehicle, setDownload]);

  return (
    <div className="ml-[26rem] overflow-y-auto mt-[4rem] w-[40rem] h-[31rem] bg-[#F8F9FA] drop-shadow-2xl shadow-[#405C5C] rounded-3xl">
      <div className="auto-rows-auto mx-6 text-[#405D5C] text-lg my-4 grid grid-cols-3">
        {numberplates.map((numberplate, index) => (
          <span
            className={`mx-1 rounded-xl my-1 flex flex-col place-content-center text-center w-[10rem] h-[5rem] drop-shadow-lg ${
              index === activeVehicle
                ? "bg-slate-300 mx-1 rounded-xl my-1 flex flex-col place-content-center text-center w-[10rem] h-[5rem] drop-shadow-lg"
                : "bg-slate-100"
            } `}
            key={numberplate}
            style={{
              color: vehicle[index]?.status === "stolen" ? "red" : "inherit",
            }}
            onClick={() => setActiveVehicle(index)}
          >
            {numberplate}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Vehicles;
