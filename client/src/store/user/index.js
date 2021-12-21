import axios from "axios";
import Cookies from "js-cookie";
import Config from "./../../Utils/Config";

export default {
  actions: {
    userAuthAction(ctx, user) {
      axios
        .get(
          `${Config.ServerIP}/auth/login?login=${user.login}&password=${user.password}`
        )
        .then((res) => {
          ctx.commit("userAuthMutation", res.data.result.data);
          Cookies.set("key", res.data.result.data.key);
          Cookies.set("id", res.data.result.data.id);
        });
    },
    userRegistrationAction(user) {
      axios.post(`${Config.ServerIP}/auth/registration`, user);
    },
    userInfoGetAction(ctx, id) {
      axios.get(`${Config.ServerIP}/user/get?userID=${id}`).then((res) => {
        ctx.commit("userInfoGetMutatuion", res.data.user.data);
      });
    },
    userConfirmAuthAction(ctx, { userID, authKey }) {
      ctx.commit("userConfirmAuthMutatuion", { userID, authKey });
    },
  },
  mutations: {
    userAuthMutation(state, user) {
      state.userInfo = { ...user };
      state.isAuth = true;
    },
    userConfirmAuthMutatuion(state, { userID, authKey }) {
      state.userInfo.key = authKey;
      state.userInfo.id = userID;
      state.isAuth = true;
    },
    userInfoGetMutatuion(state, user) {
      state.userInfo = { ...user };
    },
  },
  state: {
    userInfo: {
      _id: String,
      id: Number,
      avatar: String,
      nickname: String,
      username: String,
      key: String,
    },
    isAuth: false,
  },
  getters: {
    userInfoGetter(state) {
      return state.userInfo;
    },
    checkAuthGetter(state) {
      return state.isAuth;
    },
    authKeyGetter(state) {
      return state.userInfo.key;
    },
  },
};
