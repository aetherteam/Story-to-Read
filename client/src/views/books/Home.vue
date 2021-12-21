<template>
  <div>
    <BookComponent is-read-link="false" :book-data="bookGetByIDGetter" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BookComponent from "./../../components/Books/BookBlock.vue";
export default {
  name: "BookHome",
  props: {
    id: { required: true },
  },
  components: {
    BookComponent,
  },
  computed: mapGetters(["bookGetByIDGetter"]),
  mounted() {
    this.getBook();
  },
  methods: {
    getBook: function () {
      return this.$store.dispatch("bookGetByIDAction", this.id);
    },
  },
};
</script>

<style>
</style>