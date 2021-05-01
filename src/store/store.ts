// created a simple store without Vuex
import { reactive, readonly, inject, DeepReadonly, provide } from "vue";
import { formatEvents } from "@/utils/helper";
//State
const state = reactive<State>({
  events: [],
  bookings: [],
  stationNames: [],
});

//Methods
const methods = {
  saveEvents(data: IEvents[]) {
    state.events = data;
  },
  saveBookings(data: IBookings[]) {
    state.bookings = data;
  },
  saveStationNames(names: []) {
    state.stationNames = names;
  },
  showFilterStation(name: string) {
    const events = getters.events();
    const filteredEvents =
      events &&
      events.filter((event: IEvents) => {
        return event.name === name;
      });
    const bookings = formatEvents(filteredEvents);
    this.saveBookings(bookings);
  },
};

// Getters
const getters = {
  events(): IEvents[] {
    return state.events;
  },
  stationNames(): [] {
    return state.stationNames;
  },
  bookings() {
    return state.bookings;
  },
};

export const StateSymbol = Symbol("Character Store");

// make it also available in router
export const store: DeepReadonly<Store> = readonly({
  state,
  methods,
  getters,
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function provideStore() {
  provide(StateSymbol, store);
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useStore() {
  const store = inject(StateSymbol);
  if (!store) {
    // throw error, no store provided
  }
  return store as Store;
}
