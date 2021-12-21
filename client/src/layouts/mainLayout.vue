<template>
  <div class="body-container">
    <SidebarLeft />
    <router-view class="body__content block block_bg mg_2" />
    <SidebarRight />
  </div>
</template>

<script>
import SidebarLeft from "../components/SidebarLeft.vue";
import SidebarRight from "../components/SidebarRight.vue";
export default {
  name: "main-layout",
  components: {
    SidebarRight,
    SidebarLeft,
  },
};
</script>