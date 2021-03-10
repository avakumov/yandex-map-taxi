import { useState, useEffect } from "react"
import { Map } from "react-yandex-maps"
import { format } from "date-fns"
import { useHistory } from "react-router-dom"
import { connect } from "react-redux"
import TaxiCard from "../components/TaxiCard"
import TaxiRow from "../components/TaxiRow"
import { api } from "../api"
import { CrewI } from "../api"
import { taxiActions } from "../redux/actions"

function Home({ ymapApi, setMapApi, getOrder }: any) {
  const [taxi, setTaxi] = useState<CrewI | null>(null)
  const [cars, setCars] = useState<CrewI[]>([])
  const [ymap, setYmap] = useState<any>()
  const [currentAddress, setCurrentAdress] = useState<string>("")
  const [coordinates, setCoordinates] = useState<Array<number>>()
  const [showError, setShowError] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [iconAddress, setIconAddress] = useState("")
  const [errorMessage, setErrorMessage] = useState("Обязательно для заполнения")
  useEffect(validate, [currentAddress, iconAddress])

  const history = useHistory()

  function onLoadYMapApi(ymap: any) {
    setMapApi(ymap)
  }

  function createPlacemark(coord: Array<number>, address: string) {
    return (
      ymapApi &&
      new ymapApi.Placemark(
        coord,
        {
          iconCaption: address || "поиск...",
        },
        {
          preset: "islands#yellowCircleDotIcon",
        }
      )
    )
  }

  function createPlacemarkCar(car: CrewI) {
    return (
      ymapApi &&
      new ymapApi.Placemark(
        [car.lat, car.lon],
        {
          iconCaption: `${car.car_mark} ${car.car_model} ${car.car_color} (${car.car_number})`,
        },
        {
          preset: "islands#darkGreenCircleDotIcon",
        }
      )
    )
  }

  function changeInput(event: React.ChangeEvent<HTMLInputElement>) {
    const address = event.target.value
    setCurrentAdress(address)
    searchAddress(address)
  }

  function validate() {
    validateAddress()
    errorMessage && submitted ? setShowError(true) : setShowError(false)
  }
  function validateAddress() {

    if (!currentAddress) {
      return setErrorMessage("Обязательно для заполнения")
    }
    const arr = currentAddress.split(",")
    if (arr.length !== 2) {
      return setErrorMessage("Формат адреса неверный. Улица и дом через запятую")
    }

    if (!coordinates) {
      return setErrorMessage("Не установлено место на карте")
    }
    if (!checkAddress(iconAddress, currentAddress)) {
      return setErrorMessage("Ошибка в адресе")
    }
    setErrorMessage("")
  }

  function checkAddress(address1: string, address2: string) {
    const streetNumber1 = address1.split(",")
    const streetNumber2 = address2.split(",")

    if (streetNumber1.length !== 2 || streetNumber2.length !== 2) return false
    const [street1, number1] = streetNumber1
    const [street2, number2] = streetNumber2

    if (number1.toLowerCase().trim() !== number2.toLowerCase().trim()) return false
    if (!street1.toLowerCase().match(street2.trim().toLowerCase())) return false
    return true
  }

  function searchAddress(address: any) {
    ymapApi
      ?.geocode(`Ижевск, ${address}`, {
        results: 1,
      })
      .then((res: any) => {
        let firstGeoObject = res.geoObjects.get(0)
        const coords = firstGeoObject.geometry.getCoordinates()
        renderBySelectedPoint(coords, false)
      })
  }

  function handleSetTaxi(e: any) {
    const carId = e.target.closest("[data-carId]").dataset.carid
    const [car] = cars.filter((car) => car.crew_id === carId)
    setTaxi(car)
  }

  function renderBySelectedPoint(coords: any, isSetInputAddress: boolean = true) {
    //обновить координаты
    setCoordinates(coords)

    //обновить адрес
    ymapApi?.geocode(coords).then(function (res: any) {
      const firstGeoObject = res.geoObjects.get(0)
      const address = firstGeoObject.properties.get("name")

      const taxiRequest = {
        source_time: "time",
        addresses: [
          {
            address: address,
            lat: coords[0],
            lon: coords[1],
          },
        ],
      }
      //получить автомобили
      api.getTaxi(taxiRequest).then((res) => {
        //очистить карту
        ymap?.geoObjects.removeAll()

        //точка откуда
        const placeMarker = createPlacemark(coords, address)
        ymap.geoObjects.add(placeMarker)

        const cars = res.data.crews_info
        cars.sort((a, b) => a.distance - b.distance)

        setCars(cars)
        setTaxi(cars[0])

        //рендерить автомобили
        cars.forEach((car) => {
          const placeMarkerCar = createPlacemarkCar(car)
          ymap.geoObjects.add(placeMarkerCar)
        })
        isSetInputAddress && setCurrentAdress(address)
        setIconAddress(address)
      })
    })
  }

  function ClickMap(e: any) {
    const coords = e.get("coords")
    renderBySelectedPoint(coords)
  }

  function order(e: any) {
    e.preventDefault()
    setSubmitted(true)
    if (errorMessage) {
      setShowError(true)
      return
    }
    if (coordinates && taxi) {
      const order = {
        crew_id: taxi?.crew_id,
        source_time: format(new Date(), "yyyyMMddhhmmss"),
        addresses: [
          {
            address: currentAddress,
            lat: coordinates[0],
            lon: coordinates[1],
          },
        ],
      }
      getOrder(order, history)
    }
  }

  return (
    <form onSubmit={order}>
      <div className=" mt-5 max-w-screen-md mx-auto flex flex-col">
        <div className="text-xl">Детали заказа</div>
        <div className="flex items-center mb-10">
          <label className="pr-4 w-1/3 text-right" htmlFor="address">
            Откуда
          </label>
          <div className="w-2/3 h-10">
            <input
              className="p-2 border border-gray-200 hover:border-gray-400 focus:outline-none rounded shadow-md w-96"
              id="address"
              placeholder="Введите адрес"
              type="text"
              onChange={changeInput}
              value={currentAddress}
            />
            {showError ? (
              <div className="text-red-600 pl-2 h-10">{errorMessage}</div>
            ) : (
              <div className="h-10"> </div>
            )}
          </div>
        </div>
        <div className="flex">
          <div className="text-right pr-4 w-1/3">Подходящий экипаж</div>
          {taxi ? <TaxiCard {...taxi} /> : <div className="h-32">Такси не найдено</div>}
        </div>

        <div className="flex my-10 rounded-md shadow-md border border-gray-300 overflow-hidden">
          <div id="map" className="w-3/4 h-96">
            <Map
              height="100%"
              width="100%"
              defaultState={{ center: [56.8619, 53.2324], zoom: 11 }}
              onLoad={onLoadYMapApi}
              instanceRef={(m) => {
                setYmap(m)
              }}
              onClick={ClickMap}
            />
          </div>
          <div className="w-1/4 border-l-2" onClick={handleSetTaxi}>
            {cars.map((car) => (
              <TaxiRow key={car.crew_id} {...car} />
            ))}
          </div>
        </div>
        {submitted && errorMessage ? (
          <button
            disabled
            className="bg-gray-400 border border-gray-100 rounded-md  px-4 py-1 shadow-md max-w-min self-center"
          >
            Заказать
          </button>
        ) : (
          <button
            type="submit"
            className="bg-green-600 border border-gray-300 rounded-md hover:bg-green-500 px-4 py-1 shadow-md max-w-min self-center"
          >
            Заказать
          </button>
        )}
      </div>
    </form>
  )
}

function mapStateToProps(state: any) {
  return {
    ymapApi: state.taxi.mapApi,
  }
}
function mapDispatchToProps(dispatch: any) {
  return {
    setMapApi: (mapApi: any) => dispatch(taxiActions.setMapApi(mapApi)),
    getOrder: (order: any, history: any) => dispatch(taxiActions.getOrder(order, history)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
