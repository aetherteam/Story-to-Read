import { createStore } from "vuex";
import user from "./user";
import book from "./book";

export default createStore({
  modules: { user: user, book: book },
});
