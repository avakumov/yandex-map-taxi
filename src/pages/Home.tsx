import { useState } from "react";
import TaxiCard from "../components/TaxiCard";
import TaxiRow from "../components/TaxiRow"
import { ITaxi } from "../components/TaxiCard";

const t = { model: "tesla", color: "green", licensePlate: "34324", distance:"400 m"};
function Home() {
  const [taxi, setTaxi] = useState<ITaxi | null>(t);
  function handleChangeSearch() {}

  return (
    <div className=" mt-5 max-w-screen-md mx-auto flex flex-col">
        <div className="text-xl">Детали заказа</div>
      <div className="flex items-center mb-10">
        <label className="pr-4 w-1/3 text-right" htmlFor="address">
            Откуда
          
        </label>
        <div className="w-2/3">
          <input
            className="p-2 border border-gray-200 rounded shadow-md"
            id="address"
            placeholder="Введите адрес"
            type="text"
            onChange={handleChangeSearch}
          />
        </div>
      </div>
      <div className="flex">
        <div className="text-right pr-4 w-1/3">Подходящий экипаж</div>
        {taxi ? <TaxiCard {...taxi} /> : <div>Такси не найдено</div>}
      </div>

      <div className="flex my-10">
          <div id="map" className="bg-yellow-200 w-3/4 h-64">

          </div>
          <div className="bg-green-200 w-1/4">
          {taxi&&<TaxiRow {...taxi} />}
          {taxi&&<TaxiRow {...taxi} />}
          </div>

      </div>
      <button className="bg-green-600 border border-gray-300 rounded-md hover:bg-green-500 px-4 py-1 shadow-md max-w-min self-center">Заказать</button>
    </div>
  );
}

export default Home;
