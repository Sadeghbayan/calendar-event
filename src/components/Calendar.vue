<template>
  <div class="calendar">
    <div class="card" ref="cal"></div>
  </div>
  <teleport to="#portal-target">
    <Modal
      :isShow="isShow"
      :bookings="bookingsInfo"
      @close="handleCloseModal"
    />
  </teleport>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, onUpdated } from "vue";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import Modal from "@/components/Modal.vue";

export default defineComponent({
  name: "Calendar",
  components: {
    Modal,
  },
  props: {
    events: {
      type: Array,
    },
  },
  async setup(props) {
    const cal = ref<HTMLElement | null>(null);
    const isShow = ref(false);
    const bookingsInfo = ref({});
    const handleCloseModal = () => {
      isShow.value = false;
    };

    onMounted(() => {
      if (cal.value) {
        const Tcalendar = new Calendar(cal.value, {
          plugins: [
            dayGridPlugin,
            timeGridPlugin,
            listPlugin,
            interactionPlugin,
          ],
          editable: true,
          selectable: true,
          initialView: "timeGridWeek",
          eventClick: function (info) {
            isShow.value = true;
            bookingsInfo.value = {
              customerName: info.event.extendedProps.customerName,
              days: info.event.extendedProps.days,
              endDate: info.event.extendedProps.endDate,
              startDate: info.event.extendedProps.startDate,
              station: info.event.extendedProps.station,
            };
          },
          events: props.events as any,
          noEventsContent: "No Pickups/Returns planned",
        });
        Tcalendar.render();
      }
    });
    // I had to re-write this as I need to update the data based on selected value
    onUpdated(() => {
      if (cal.value) {
        const Tcalendar = new Calendar(cal.value, {
          plugins: [
            dayGridPlugin,
            timeGridPlugin,
            listPlugin,
            interactionPlugin,
          ],
          editable: true,
          selectable: true,
          initialView: "timeGridWeek",
          eventClick: function (info) {
            isShow.value = true;
            bookingsInfo.value = {
              customerName: info.event.extendedProps.customerName,
              days: info.event.extendedProps.days,
              endDate: info.event.extendedProps.endDate,
              startDate: info.event.extendedProps.startDate,
              station: info.event.extendedProps.station,
            };
          },
          events: props.events as any,
          noEventsContent: "No Pickups/Returns planned",
        });
        Tcalendar.render();
      }
    });
    return {
      cal,
      isShow,
      bookingsInfo,
      handleCloseModal,
    };
  },
});
</script>

<style lang="scss">
.fc {
  font-size: $font-size-small;
  .fc-toolbar-title {
    font-size: $font-size-default;
  }
  .fc-view-harness {
    background: $white;
    height: 500px !important;
  }
}
</style>
