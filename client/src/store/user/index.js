import axios from "axios";
import Cookies from "js-cookie";
import Config from "./../../Utils/Config";

export default {
  actions: {
    userAuthAction(ctx, user) {
      axios
        .get(
          `${Config.ServerIP}/auth/login?login=${user.userLogin}&password=${user.userPass}`
        )
        .then((res) => {
          ctx.commit("userAuthMutation", res.data.result.data);
          Cookies.set("key", res.data.result.data.key);
          Cookies.set("id", res.data.result.data.id);
        });
    },
    userInfoGetAction(ctx, id) {
      axios.get(`${Config.ServerIP}/user/get?userID=${id}`).then((res) => {
        ctx.commit("userInfoGetMutatuion", res.data.user.data);
      });
    },
    userConfirmAuthAction(ctx, {userID, authKey}) {
      ctx.commit("userConfirmAuthMutatuion", {userID, authKey});
    },
  },
  mutations: {
    userAuthMutation(state, user) {
      state.id = user.id;
      state.key = user.key;
      state.isAuth = true;
    },
    userConfirmAuthMutatuion(state, {userID, authKey}) {
      state.key = authKey;
      state.id = userID;
      state.isAuth = true;
    },
    userInfoGetMutatuion(state, user) {
      state.nickname = user.nickname;
      state.username = user.username;
      state.avatar = user.avatar;
    },
  },
  state: {
    key: null,
    id: null,
    avatar: null,
    nickname: null,
    username: null,
    isAuth: false,
  },
  getters: {
    userInfoGetter(state) {
      return {
        id: state.id,
        avatar: state.avatar,
        nickname: state.nickname,
        username: state.username,
      };
    },
    checkAuthGetter(state) {
      return state.isAuth;
    },
  },
};
