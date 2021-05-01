<template>
  <div class="autocomplete-container">
    <input
      ref="autocompleteRef"
      type="text"
      :placeholder="placeholder"
      @input="handleInput"
      v-model="searchText"
      class="autocomplete-input"
      @focus="displayResults"
      @blur="hideResults"
    />
    <div
      :style="{ width: inputWidth + 'px' }"
      class="results-container"
      v-if="shouldShowResults"
    >
      <div
        v-for="item in filteredResults"
        :key="item"
        class="results-item"
        @click="clickItem(item)"
        @mousedown.prevent
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, SetupContext, onMounted } from "vue";
import autocompleteProps from "./autoCompleteProps";
export default {
  name: "Autocomplete",
  props: {
    debounce: {
      type: Number,
      default: 0,
    },
    placeholder: {
      type: String,
    },
    inputClass: {
      type: Array,
    },
    max: {
      type: Number,
      default: 10,
    },
    results: {
      type: Array,
    },
    resultsContainerClass: {
      type: Array,
    },
    resultsItemClass: {
      type: Array,
    },
    displayItem: {
      type: Function,
    },
  },
  emits: ["input", "onSelect"],
  setup(props: autocompleteProps, context: SetupContext) {
    const autocompleteRef = ref();
    let inputWidth = ref(0);
    let searchText = ref("");
    // eslint-disable-next-line no-undef
    let timeout: NodeJS.Timeout;
    let showResults = ref(true);
    onMounted(() => {
      inputWidth.value = autocompleteRef.value.offsetWidth - 2;
    });
    /**
     * Triggered on input changes with a dynamic debounce
     * @param { InputEvent } e
     */
    function handleInput(e: any) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        context.emit("input", e.target.value);
        showResults.value = true;
      }, props.debounce);
    }
    /**
     * Triggered on click on a result item
     */
    function clickItem(data: string) {
      context.emit("onSelect", data);
      searchText.value = data;
      showResults.value = false;
    }
    /**
     * Called on focus
     */
    function displayResults() {
      showResults.value = true;
    }
    /**
     * Called on blur
     */
    function hideResults() {
      showResults.value = false;
    }
    /**
     * Return class(es) for results container element
     */
    const getResultsContainerClass = computed(() => {
      return props.resultsContainerClass.length > 0
        ? props.resultsContainerClass
        : ["results-container"];
    });
    /**
     * Show results depending on results length and showResults boolean
     */
    let shouldShowResults = computed(() => {
      return showResults.value && props.results.length > 0;
    });
    /**
     * Return results filtered with the 'max' props
     */
    const filteredResults = computed(() => {
      return props.results.slice(0, props.max);
    });
    return {
      searchText,
      showResults,
      autocompleteRef,
      inputWidth,
      displayResults,
      hideResults,
      handleInput,
      clickItem,
      filteredResults,
      getResultsContainerClass,
      shouldShowResults,
    };
  },
};
</script>

<style lang="scss" scoped>
.autocomplete-container {
  display: flex;
  flex-direction: column;
  .autocomplete-input {
    border-radius: 5px;
    width: 100%;
    border: medium none;
    width: 100%;
    border: medium none;
    border: 1px solid $navy-blue;
    border-radius: 0;
    height: 33px;
    padding: 0;
    padding-left: 5px;
    font-size: $font-size-small;
    color: $dark-gray;
    &:focus {
      outline: none;
    }
  }
  .results-container {
    position: absolute;
    top: 60px;
    border: 1px solid black;
    z-index: 99;
    background: white;
    font-size: $font-size-small;
  }
  .results-item {
    list-style-type: none;
    padding: 0 5px;
    border-bottom: 1px solid black;
    height: 33px;
    display: flex;
    align-items: center;
    &:hover {
      cursor: pointer;
      background: $light-brown;
    }
    &:nth-last-child(1) {
      border-bottom: none;
    }
  }
}
</style>
