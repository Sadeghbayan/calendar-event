import useApi from "./useApi";
import { eventsUrl } from "../utils/config";
import { Ref, ref } from "vue";
import { useStore } from "@/store/store";

export type UsableEvents = Promise<{
  events: Ref<IEvents[] | undefined>;
  error: Ref<any>;
}>;

export default async function useEvents(stationId = ""): UsableEvents {
  const { response: events, request, error } = useApi<IEvents[]>(
    `${eventsUrl}/${stationId}`
  );
  const loaded = ref(false);
  const store = useStore();
  const { methods } = store;
  if (loaded.value === false) {
    await request();
    const stationNames =
      events && events.value?.map((station: IEvents) => station.name);
    methods.saveStationNames(stationNames);
    loaded.value = true;
  }
  return { events, error };
}
