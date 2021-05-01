<template>
  <Header />
  <Suspense>
    <template #default>
      <section class="main">
        <Home />
      </section>
    </template>
    <template #fallback> <span class="loader"></span> </template>
  </Suspense>
  <Footer />
  <div id="portal-target"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { provideStore } from "@/store/store";
import Header from "@/components/Header.vue";
import Home from "@/views/Home.vue";
import Footer from "@/components/Footer.vue";
export default defineComponent({
  name: "App",
  components: {
    Header,
    Home,
    Footer,
  },
  setup() {
    //make our store globally available
    provideStore();
  },
});
</script>

<style lang="scss">
@import "@/assets/styles/main";

section.main {
  display: flex;
  flex: 1 0 auto;
}
</style>
