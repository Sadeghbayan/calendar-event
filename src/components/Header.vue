<template>
  <header class="header">
    <div class="header__inner container">
      <div class="header__branding">
        <router-link to="/">
          <img
            alt="Roadsurfer logo"
            src="../assets/logo-icon.svg"
            class="header__logo"
          />
        </router-link>
        <h1>Calendar event</h1>
      </div>
      <div class="header__search">
        <Autocomplete
          @input="searchForStation"
          @onSelect="handlSelectItem"
          :results="result"
          :debounce="debounce"
          placeholder="Type station name"
        />
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import Autocomplete from "@/components/Autocomplete/Autocomplete.vue";
import { useStore } from "@/store/store";

export default defineComponent({
  name: "Header",
  components: { Autocomplete },
  setup() {
    const debounce = ref(500);
    // const result = ref([]);
    const text = ref("");
    const store = useStore();
    const { getters, methods } = store;

    const searchForStation = async (e: string) => {
      text.value = e;
    };

    const result = computed(() => {
      if (text.value) {
        const stationNames = getters.stationNames();
        return stationNames.filter((name: string) => {
          return name.toLowerCase().includes(text.value);
        });
      } else {
        return "";
      }
    });

    const handlSelectItem = (e: unknown) => {
      //to display on calendar
      methods.showFilterStation(e);
    };

    return {
      searchForStation,
      handlSelectItem,
      debounce,
      result,
    };
  },
});
</script>

<style scoped lang="scss">
.header {
  background: $white;
  padding: 16px 0;
  height: 40px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: $dark-gray;
  &__inner {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  &__branding {
    display: flex;
    flex: 1;
    @include mq(md) {
      flex: 2;
    }
  }

  &__search {
    flex: 1;
  }

  &__logo {
    width: 40px;
    height: 40px;
    margin-right: 5px;
    @include mq(md) {
      width: 50px;
      height: 58px;
      margin-right: 10px;
    }
  }

  h1 {
    margin: 0;
    align-self: center;
    font-size: $font-size-small;
    font-weight: $font-weight-bold;
    display: none;
    @include mq(md) {
      font-size: $font-size-default;
      display: block;
    }
  }
  nav {
    margin-left: auto;
    ul {
      display: flex;
      list-style: none;
      font-size: $font-size-small;
      font-weight: $font-weight-bold;
      @include mq(md) {
        font-size: $font-size-default;
      }
      li {
        &:last-child {
          margin-left: 20px;
        }
        a {
          color: $dark-gray;
          text-decoration: none;
        }
      }
    }
  }
}
</style>
