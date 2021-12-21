<template>
  <div>
    <div class="content__filter-container flex flex_j_sb flex_al_c">
      <button
        class="
        btn
          content__filter
          block block_component block_component_bg
          flex flex_al_c flex_j_c
        "
        @click="this.bookSortButton"
      >
        <i class="icon_circle mg_r_1"></i>
        <span class="text text grey text_medium">{{ this.bookArange }}</span>
      </button>
      <div
        class="
          content__filter-sort
          block block_component block_component_bg
          flex flex_j_sb flex_al_c
        "
      >
        <i class="icon_circle"></i>
        <i class="icon_circle"></i>
      </div>
    </div>
    <BookComponent
      v-for="(book, index) in bookGetAllGetter"
      is-read-link="true"
      :book-data="book"
      :key="index"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BookComponent from "./../components/Books/BookBlock.vue";
export default {
  name: "Home",
  data() {
    return {
      bookArangeArray: ["newest", "oldest", "popular", "recommended"],
      bookArange: "newest",
    };
  },
  mounted() {
    this.getBooks(0, 15);
  },
  components: {
    BookComponent,
  },
  computed: mapGetters(["bookGetAllGetter"]),
  methods: {
    bookSortButton: function () {
      this.bookArange =
        this.bookArangeArray[this.bookArangeArray.indexOf(this.bookArange) + 1];
      if (this.bookArange === undefined)
        this.bookArange = this.bookArangeArray[0];
      console.log(this.bookArange);
      this.getBooks(0, 15);
    },
    getBooks: function (shift, count) {
      this.$store.dispatch("bookGetAllAction", {
        arrange: this.bookArange,
        shift: shift,
        count: count,
      });
    },
  },
};
</script>
