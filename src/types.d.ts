type IDate = string | number | Date;

interface IBookings {
  id: string | number;
  pickupReturnStationId: string;
  customerName: string;
  startDate: IDate;
  endDate: IDate;
  title: string;
  color: string;
  station: string;
}

interface IEvents {
  id: string | number;
  name: string;
  bookings: IBookings[];
}

interface State {
  events: IEvents[];
  bookings: IBookings[];
  stationNames: Array;
}

interface Store {
  state: State;
  methods?: any;
  getters?: any;
}
