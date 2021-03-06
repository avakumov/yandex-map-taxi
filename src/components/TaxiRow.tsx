import taxiImage from "../images/taxi.svg"

export interface ITaxi {
    model: string
    color: string
    licensePlate?: string
    distance?: string
  }

function TaxiRow(taxi:ITaxi):JSX.Element {

    return(
        <div className="flex bg-blue-50 p-1  border-b-0 border border-gray-300 justify-between items-center">
            <img className="w-8 mx-1 fill-current text-yellow-100" src={taxiImage} alt="taxi"/>
            <div className="flex flex-col">
                <div className="text-xl">{taxi.model}</div>
                <div className="">{taxi.color}</div>
            </div>
            <div>
                {taxi.distance&&taxi.distance}
            </div>
        </div>
    )
}

export default TaxiRow