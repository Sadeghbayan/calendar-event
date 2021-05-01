<template>
  <div class="modal" :class="isShow ? 'isOpen' : 'isClose'">
    <div class="modal__overlay"></div>
    <div class="modal__inner">
      <div class="modal__box">
        <div class="modal__header">
          <div class="modal__header--logo">
            <img
              alt="Roadsurfer logo"
              src="../assets/logo-icon.svg"
              class="header__logo"
            />
            <p>Booking Details</p>
          </div>
          <button type="button" class="modal__close" @click="closeModal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal__body">
          <div class="item">
            <h2>Customer Name:</h2>
            <span class="text">{{ bookings.customerName }}</span>
          </div>
          <div class="item">
            <h2>Start Date:</h2>
            <span class="text">{{ bookings.startDate }}</span>
          </div>
          <div class="item">
            <h2>End Date:</h2>
            <span class="text">{{ bookings.endDate }}</span>
          </div>
          <div class="item">
            <h2>Duration:</h2>
            <span class="text">{{ bookings.days }}</span>
          </div>
          <div class="item">
            <h2>Pickup-Return Station:</h2>
            <span class="text">{{ bookings.station }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from "vue";
export default defineComponent({
  name: "Modal",
  props: {
    bookings: {
      type: Object,
    },
    isShow: Boolean,
  },
  emits: ["handleClose"],
  setup(props, context: SetupContext) {
    const closeModal = () => {
      context.emit("close");
    };
    return {
      closeModal,
    };
  },
});
</script>

<style scoped lang="scss">
.modal {
  font-family: $font-family-base;
  color: $navy-blue;

  &__inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: none;
    .isOpen & {
      z-index: 100;
      display: flex;
    }
  }

  &__header {
    background: $green;
    height: 60px;
    width: 100%;
    &--logo {
      padding: 0 15px;
      display: flex;
      font-size: $font-size-small;
      color: $white;
      align-items: center;
      height: 60px;
      p {
        margin-left: 10px;
      }
      img {
        width: 50px;
      }
    }
  }

  &__close {
    color: $white;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    padding: 0;
    font-weight: 100;
    font-size: 33px;
    line-height: 1;
    text-decoration: none;
    background: 0 0;
    border: 0;
    outline: 0;
    cursor: pointer;
    width: 45px;
    height: 60px;
  }

  &__box {
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    background: $light-brown;
    position: relative;
    margin: 0 auto;
    -webkit-animation: slide-in-bottom 0.5s cubic-bezier(0.23, 1, 0.32, 1)
      backwards;
    animation: slide-in-bottom 0.5s cubic-bezier(0.23, 1, 0.32, 1) backwards;

    @include mq(md) {
      width: 400px;
    }
  }
  &__body {
    padding: 15px;
    width: 100%;
    box-sizing: border-box;
    font-size: $font-size-small;
    .item {
      display: flex;
      margin: 20px 0;
      justify-content: space-between;
      h2 {
        font-size: $font-size-small;
        margin: 0;
        margin-right: 10px;
      }
    }
  }
}

.modal__overlay {
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
  display: none;
  .isOpen & {
    display: block;
  }
  .isClose & {
    display: none;
  }
}

// Keyframes

@-webkit-keyframes slide-in-bottom {
  0% {
    -webkit-transform: translateY(40px);
    transform: translateY(40px);
    opacity: 0;
  }

  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slide-in-bottom {
  0% {
    -webkit-transform: translateY(40px);
    transform: translateY(40px);
    opacity: 0;
  }

  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}

@-webkit-keyframes slide-out-bottom {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }

  100% {
    -webkit-transform: translateY(40px);
    transform: translateY(40px);
    opacity: 0;
  }
}

@keyframes slide-out-bottom {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }

  100% {
    -webkit-transform: translateY(40px);
    transform: translateY(40px);
    opacity: 0;
  }
}
</style>
