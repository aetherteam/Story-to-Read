<template>
  <div class="flex flex_col">
    <span
      class="text text_white text_biggest text_bold text_center flex_j_c flex_al_c mg_b_2"
      >Авторизация</span
    >
    <form class="flex flex_j_s flex_al_c flex_col" @submit.prevent="auth">
      <input
        required
        v-model="userLogin"
        type="text"
        placeholder="Name"
        class="input"
      />
      <input
        required
        v-model="userPass"
        type="password"
        placeholder="Password"
        class="input mg_2"
      />
      <button type="submit" class="btn">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "AuthView",
  data() {
    return {
      userLogin: "",
      userPass: "",
    };
  },
  methods: {
    auth: function () {
      let userInfo = {
        login: this.userLogin,
        password: this.userPass,
      };
      try {
        this.$store.dispatch("userAuthAction", userInfo);
        this.$router.push("/");
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
