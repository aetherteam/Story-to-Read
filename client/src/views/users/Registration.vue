<template>
  <div class="flex flex_col">
    <span
      class="text text_white text_biggest text_bold text_center flex_j_c flex_al_c mg_b_2"
      >Регистрация</span
    >
    <form class="flex flex_j_s flex_al_c flex_col" @submit.prevent="auth">
      <input
        required
        v-model="userName"
        type="text"
        placeholder="Username"
        class="input mg_1"
      />
      <input
        required
        v-model="userNickname"
        type="text"
        placeholder="Nickname"
        class="input mg_1"
      />
      <input
        required
        v-model="userEmail"
        type="email"
        placeholder="Email"
        class="input mg_1"
      />
      <input
        required
        v-model="userPass"
        type="password"
        placeholder="Password"
        class="input mg_1"
      />
      <input
        required
        v-model="userPassConf"
        type="password"
        placeholder="Conform password"
        class="input mg_1 mg_b_2"
      />
      <button type="submit" class="btn">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "RegistrationView",
  data() {
    return {
      userName: "",
      userNickname: "",
      userEmail: "",
      userPass: "",
      userPassConf: "",
    };
  },
  methods: {
    auth: function () {
      let userInfo = {
        username: this.userName,
        nickname: this.userNickname,
        email: this.userEmail,
        password: this.userPass,
        passwordConfirmation: this.userPassConf,
      };
      this.$store
        .dispatch("userRegistrationAction", userInfo)
        .then(() => this.$router.push("/auth"))
        .catch((err) => console.log(err));
    },
  },
};
</script>
