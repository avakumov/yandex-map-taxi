import taxiImage from "../images/taxi.svg"
import {CrewI} from "../api"


function TaxiRow(car:CrewI):JSX.Element {

    return(
        <div data-carid={car.crew_id} className="flex p-1  border-b-2 
         border-gray-200 justify-start items-center 
         hover:border-green-300  hover:bg-green-300 cursor-pointer hover:shadow-md">
            <img className="w-8 mx-1 fill-current text-yellow-100" src={taxiImage} alt="taxi"/>
            <div className="pl-1 flex flex-col">
                <div className="text-xl">{car.car_model}</div>
                <div className="">{car.car_color} </div>
            </div>
            <div className="flex-grow text-right">
                {car.distance} м
            </div>
        </div>
    )
}

export default TaxiRow