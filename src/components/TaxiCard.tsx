import taxiImage from "../images/taxi.svg"

export interface ITaxi {
    model: string
    color: string
    licensePlate?: string
    distance?: string
  }

function TaxiCard(taxi:ITaxi):JSX.Element {

    return(
        <div className="flex shadow-md bg-blue-50 w-max p-3 rounded border border-gray-300">
            <img className="w-16 fill-current text-yellow-100" src={taxiImage} alt="taxi"/>
            <div className="flex flex-col pl-4">
                <div className="text-2xl">{taxi.model}</div>
                <div className="py-2">{taxi.color}</div>
                {taxi.licensePlate&&<div className="border p-2 w-min truncate rounded-md border-gray-300">{taxi.licensePlate}</div>}
            </div>
        </div>
    )
}

export default TaxiCard