<template>
  <div class="home container">
    <div class="wide">
      <Calendar :events="allBookings" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "@/store/store";
import Calendar from "@/components/Calendar.vue";
import useEvents from "@/hooks/useEvents";
import { formatEvents } from "@/utils/helper";
export default defineComponent({
  name: "Home",
  components: {
    Calendar,
  },
  async setup() {
    const bookings = ref([]);
    const store = useStore();
    const { methods, getters } = store;
    const { events } = await useEvents();
    const stataions = events.value;
    bookings.value = formatEvents(stataions);
    methods.saveEvents(events);
    methods.saveBookings(bookings);

    const allBookings = computed(() => {
      return getters.bookings();
    });

    return {
      allBookings,
      getters,
    };
  },
});
</script>

<style lang="scss"></style>
