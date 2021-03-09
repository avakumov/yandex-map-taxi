import taxiImage from "../images/taxi.svg"
import { CrewI } from "../api"

function TaxiCard(car: CrewI): JSX.Element {
  return (
    <div className="flex shadow-md w-max p-3 rounded border border-gray-200">
      <img className="w-16 fill-current text-yellow-100" src={taxiImage} alt="taxi" />
      <div className="flex flex-col pl-4">
        <div className="text-2xl">{car.car_model}</div>
        <div className="py-2">{car.car_color}</div>
        <div className="border p-2 w-min truncate rounded-md border-gray-300">{car.car_number}</div>
      </div>
    </div>
  )
}

export default TaxiCard
