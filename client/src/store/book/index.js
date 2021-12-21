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
      state.books = { ...books };
      state.books_count = books.length;
    },
    bookGetByIDMutation(state, book) {
      state.bookOne = { ...book };
    },
  },
  state: {
    books: [
      {
        _id: String,
        id: Number,
        name: String,
        author: {
          _id: String,
          avatar: String,
          id: Number,
          mickname: String,
          username: String,
        },
        chapters: {},
        cover: String,
        description: String,
        genres: [
          {
            _id: Number,
            title: String,
          },
        ],
        lastUpdate: Number,
        likes: Number,
        timestamp: Number,
      },
    ],
    bookOne: {
      _id: String,
      id: Number,
      name: String,
      author: {
        _id: String,
        avatar: String,
        id: Number,
        mickname: String,
        username: String,
      },
      chapters: {},
      cover: String,
      description: String,
      genres: [
        {
          _id: Number,
          title: String,
        },
      ],
      lastUpdate: Number,
      likes: Number,
      timestamp: Number,
    },
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
