import { useEffect, useState } from "react";
import { Map } from "react-yandex-maps";
import TaxiCard from "../components/TaxiCard";
import TaxiRow from "../components/TaxiRow";
import { ITaxi } from "../components/TaxiCard";
import { YMapsApi } from "react-yandex-maps";

const t = {
  model: "tesla",
  color: "green",
  licensePlate: "34324",
  distance: "400 m",
};
function Home() {
  const [taxi, setTaxi] = useState<ITaxi | null>(t);
  const [ymap, setYmap] = useState<any>();
  const [ymapApi, setYmapApi] = useState<YMapsApi>();
  const [currentAddress, setCurrentAdress] = useState<string>("")
  const [coordinates, setCoordinates] = useState();

  useEffect(rerenderMarker, [coordinates, currentAddress])

  function onLoadYMapApi(ymap: any) {
    setYmapApi(ymap);
  }

  function rerenderMarker(){
    if(!ymap) return
    let placeMarker = createPlacemark();
    ymap.geoObjects.removeAll()
    ymap.geoObjects.add(placeMarker);
  }

  function updateMarker(coords: any) {
    setCoordinates(coords);
    setAddress(coords)
  }

  function createPlacemark() {
    return (
      ymapApi &&
      new ymapApi.Placemark(
        coordinates,
        {
          iconCaption: currentAddress?currentAddress:"поиск...",
        },
        {
          preset: "islands#yellowCircleDotIcon",
        }
      )
    );
  }

  function setAddress(coords:any) {

    ymapApi?.geocode(coords).then(function (res:any) {
        const firstGeoObject = res.geoObjects.get(0);
        const address = firstGeoObject.getAddressLine()
        const slicedAddress = address.split(",").slice(-2).join()
        setCurrentAdress(slicedAddress)
        
    });
}

  function handleChangeSearch(event: React.ChangeEvent<HTMLInputElement>) {
    handleSearch(event.target.value);
    setCurrentAdress(event.target.value)
  }

  function handleClickMap(e: any) {
    let coords = e.get("coords");
    updateMarker(coords);
  }

  function handleSearch(address: string) {
    ymapApi
      ?.geocode(`Ижевск, ${address}`, {
        results: 1,
      })
      .then(function (res: any) {
        ymap.geoObjects.removeAll();
        // Выбираем первый результат геокодирования.
        let firstGeoObject = res.geoObjects.get(0);
        console.log(
          "Все данные геообъекта: ",
          firstGeoObject.properties.getAll()
        );
        // Область видимости геообъекта.
        let bounds = firstGeoObject.properties.get("boundedBy");

        firstGeoObject.options.set("preset", "islands#yellowCircleDotIcon");
        // Получаем строку с адресом и выводим в иконке геообъекта.
        firstGeoObject.properties.set(
          "iconCaption",
          firstGeoObject.getAddressLine()
        );

        // Добавляем первый найденный геообъект на карту.
        ymap.geoObjects.add(firstGeoObject);
        // Масштабируем карту на область видимости геообъекта.
        ymap.setBounds(bounds, {
          // Проверяем наличие тайлов на данном масштабе.
          checkZoomRange: true,
        });
      })
      .catch((err: any) => {
        console.log(err);
      });
  }



  return (
    <div className=" mt-5 max-w-screen-md mx-auto flex flex-col">
      <div className="text-xl">Детали заказа</div>
      <div className="flex items-center mb-10">
        <label className="pr-4 w-1/3 text-right" htmlFor="address">
          Откуда
        </label>
        <div className="w-2/3">
          <input
            className="p-2 border border-gray-200 hover:border-gray-400 focus:outline-none rounded shadow-md min-w-full"
            id="address"
            placeholder="Введите адрес"
            type="text"
            onChange={handleChangeSearch}
            value={currentAddress}
          />
        </div>
      </div>
      <div className="flex">
        <div className="text-right pr-4 w-1/3">Подходящий экипаж</div>
        {taxi ? <TaxiCard {...taxi} /> : <div>Такси не найдено</div>}
      </div>

      <div className="flex my-10">
        <div id="map" className="bg-yellow-200 w-3/4 h-96">
          <Map
            height="100%"
            width="100%"
            defaultState={{ center: [56.8619, 53.2324], zoom: 9 }}
            onLoad={onLoadYMapApi}
            instanceRef={(m) => {
              setYmap(m);
            }}
            onClick={handleClickMap}
          />
        </div>
        <div className="bg-green-200 w-1/4">
          {taxi && <TaxiRow {...taxi} />}
          {taxi && <TaxiRow {...taxi} />}
        </div>
      </div>
      <button className="bg-green-600 border border-gray-300 rounded-md hover:bg-green-500 px-4 py-1 shadow-md max-w-min self-center">
        Заказать
      </button>
    </div>
  );
}

export default Home;
