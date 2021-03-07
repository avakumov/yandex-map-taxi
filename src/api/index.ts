export interface CrewI {
  crew_id: number;
  car_mark: string;
  car_model: string;
  car_color: string;
  car_number: string;
  driver_phone: string;
  driver_name: string;
  lat: number;
  lon: number;
  distance: number;
}
interface GetTaxiResponseI {
  code: number;
  descr: string;
  data: {
    crews_info: Array<CrewI>;
  };
}

interface GetTaxiI {
  source_time: string;
  addresses: Array<LocationI>;
}

interface LocationI {
  address: string;
  lat: number;
  lon: number;
}

interface OrderI extends GetTaxiI {
  crew_id: number;
}

interface OrderResponseI {
  code: number;
  descr: string;
  data: {
    order_id: number;
  };
}

async function getTaxi(getTaxi: GetTaxiI) {
  return new Promise<GetTaxiResponseI>((resolve, reject) => {
    setTimeout(() => {
      resolve({
        code: 0,
        descr: "OK",
        data: {
          crews_info: [
            {
              crew_id: 123,
              car_mark: "Chevrolet",
              car_model: "Lacetti",
              car_color: "синий",
              car_number: "Е234КУ",
              driver_name: "Деточкин",
              driver_phone: "7788",
              lat: 56.855532,
              lon: 53.217462,
              distance: 300,
            },
            {
              crew_id: 125,
              car_mark: "Hyundai",
              car_model: "Solaris",
              car_color: "белый",
              car_number: "Ф567АС",
              driver_name: "Петров",
              driver_phone: "8899",
              lat: 56.860581,
              lon: 53.209223,
              distance: 600,
            },
          ],
        },
      });
    }, 1000);
  });
}

async function order(order: OrderI) {
  return new Promise<OrderResponseI>((resolve, reject) => {
    setTimeout(() => {
      resolve({
        code: 0,
        descr: "OK",
        data: {
            order_id: 123
        },
      });
    }, 1000);
  });
}

export { getTaxi, order };
