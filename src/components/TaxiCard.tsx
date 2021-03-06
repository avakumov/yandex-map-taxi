import taxiImage from "../images/taxi.svg"

export interface Props {
    model: string;
    color: string
    licensePlate: string
  }

function TaxiCard({model, color, licensePlate}:Props) {

    return(
        <div className="flex bg-blue-50 w-max px-6 py-4 rounded border border-gray-400">
            <img className="w-16 fill-current text-yellow-100" src={taxiImage} alt="taxi"/>
            <div className="flex flex-col pl-4">
                <div className="text-2xl">{model}</div>
                <div className="py-2">{color}</div>
                <div className="border p-2 w-min truncate rounded-md border-gray-400">{licensePlate}</div>
            </div>
        </div>
    )
}

export default TaxiCard