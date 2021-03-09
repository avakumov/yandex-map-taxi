import _ from "lodash"
import { v1 as uuidv1 } from "uuid"
import { getDistance } from "../utils"
export interface CrewI {
  crew_id: string
  car_mark: string
  car_model: string
  car_color: string
  car_number: string
  driver_phone: string
  driver_name: string
  lat: number
  lon: number
  distance: number
}
interface GetTaxiResponseI {
  code: number
  descr: string
  data: {
    crews_info: Array<CrewI>
  }
}

interface GetTaxiI {
  source_time: string
  addresses: Array<LocationI>
}

interface LocationI {
  address: string
  lat: number
  lon: number
}

interface OrderI extends GetTaxiI {
  crew_id: string
}

interface OrderResponseI {
  code: number
  descr: string
  data: {
    order_id: number
  }
  req: any
}

async function getTaxi(getTaxi: GetTaxiI) {
  const destLat = getTaxi.addresses[0].lat
  const destLon = getTaxi.addresses[0].lon

  function getCar() {
    const lat = getRandomLat()
    const lon = getRandomLon()
    const distance = getDistance(lat, lon, destLat, destLon)
    return {
      crew_id: uuidv1(),
      car_mark: _.sample(["Toyota", "VAZ", "Renault"]) || "",
      car_model: _.sample(["Lachetti", "Supra", "Vesta"]) || "",
      car_color: _.sample(["белый", "серый", "красный"]) || "",
      car_number: _.sample(["D945HF", "A945HF", "C945HF"]) || "",
      driver_name: _.sample(["Petrov", "Ivanov", "Putin"]) || "",
      driver_phone: "7788",
      lat: lat,
      lon: lon,
      distance: 10 * Math.round(distance / 10),
    }
  }
  return new Promise<GetTaxiResponseI>((resolve, reject) => {
    setTimeout(() => {
      resolve({
        code: 0,
        descr: "OK",
        data: {
          crews_info: [getCar(), getCar(), getCar(), getCar()],
        },
      })
    }, 200)
  })
}

async function order(order: OrderI) {
  return new Promise<OrderResponseI>((resolve, reject) => {
    setTimeout(() => {
      resolve({
        code: 0,
        descr: "OK",
        req: order,
        data: {
          order_id: 123,
        },
      })
    }, 1000)
  })
}
function getRandomLat(): number {
  return Math.random() * (56.87326729612429 - 56.83753847268933) + 56.83753847268933
}

function getRandomLon(): number {
  return Math.random() * (53.28441339721679 - 53.19793546714898) + 53.19793546714898
}
// [56.87326729612429, 53.19793546714898]
// [56.83753847268933, 53.28441339721679]

export const api = { getTaxi, order }
