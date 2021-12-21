import axios from "axios";
import Config from "./../../Utils/Config";

export default {
  actions: {
    bookGetAllAction(ctx, { arrange, shift, count }) {
      axios
        .get(
          `${Config.ServerIP}/book/get?arrange=${
            typeof arrange !== undefined ? arrange : "newest"
          }&shift=${typeof shift !== undefined ? shift : 0}&count=${
            typeof count !== undefined ? count : 12
          }`
        )
        .then((res) => {
          ctx.commit("bookGetAllMutation", res.data.result.data);
        });
    },
    bookGetByIDAction(ctx, id) {
      axios.get(`${Config.ServerIP}/book/getOne?bookID=${id}`).then((res) => {
        ctx.commit("bookGetByIDMutation", res.data.result.data);
      });
    },
  },
  mutations: {
    bookGetAllMutation(state, books) {
      state.books = books;
      state.books_count = books.length;
    },
    bookGetByIDMutation(state, book) {
      state.bookOne = book;
    },
  },
  state: {
    books: [],
    bookOne: [],
    books_count: 0,
  },
  getters: {
    bookGetAllGetter(state) {
      return state.books;
    },
    bookGetByIDGetter(state) {
      return state.bookOne;
    },
  },
};
