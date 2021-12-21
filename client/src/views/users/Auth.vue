<template>
  <div class="flex flex_col">
    <span
      class="
        text text_white text_biggest text_bold text_center
        flex_j_c flex_al_c
        mg_b_2
      "
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
  name: "auth-view",
  data() {
    return {
      userLogin: "",
      userPass: "",
    };
  },
  methods: {
    auth: function () {
      let userLogin = this.userLogin;
      let userPass = this.userPass;
      this.$store
        .dispatch("userAuthAction", { userLogin, userPass })
        .then(() => this.$router.push("/"))
        .catch((err) => console.log(err));
    },
  },
};
</script>