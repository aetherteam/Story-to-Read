<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import defaultLayout from "./layouts/defaultLayout.vue";
import mainLayout from "./layouts/mainLayout.vue";

import Cookies from "js-cookie";

export default {
  name: "App",
  computed: {
    layout() {
      console.log();
      return this.$route.meta.layout + "-layout" || "default-layout";
    },
  },
  components: {
    defaultLayout,
    mainLayout,
  },
  mounted() {
    let authKey = Cookies.get("key"),
      userID = Cookies.get("id");
    console.log(authKey, userID);
    if (typeof authKey != "undefined" && authKey !== null) {
      this.$store.dispatch("userConfirmAuthAction", { authKey, userID });
      this.$store.dispatch("userInfoGetAction", userID);
    }
  },
};
</script>

<style>
@import url("./assets/css/main.css");
</style>
