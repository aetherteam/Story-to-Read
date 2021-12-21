<template>
  <div class="body__sidebar mg_t_2">
    <div
      class="sidebar__profile block block_bg flex flex_col"
      v-if="!checkAuthGetter"
    >
      <div class="sidebar__profile-info flex flex_col flex_j_c flex_al_c">
        <span class="text_white text_big text_bold text_left mg_b_2"
          >Добро пожаловать!</span
        >
        <span
          class="btn text_grey text_medium mg_b_1 text_center"
          style="width: 150px"
          >Регистрация</span
        >
        <router-link
          to="/auth"
          class="btn btn_black text_grey text_medium text_center"
          style="width: 150px"
          >Вход</router-link
        >
      </div>
    </div>
    <div class="sidebar__profile block block_bg flex flex_col" v-else>
      <img
        :src="apiURI + userInfoGetter.avatar"
        alt="Profile"
        class="sidebar__profile-img"
      />
      <div class="sidebar__profile-info flex flex_col flex_j_c flex_al_c">
        <span class="text_white text_big text_bold text_left mg_b_1">{{
          userInfoGetter.nickname
        }}</span>
        <!-- <span class="text_grey text_medium text_left">Читаемые: { count }</span>
        <span class="text_grey text_medium text_left">Читатели: { count }</span> -->
      </div>
    </div>
    <nav class="block block_nopadding mg_t_2 mg_b_2">
      <ul class="nav flex flex_col flex_al_s flex_j_s">
        <li class="nav__items mg_b_1">
          <a
            href="#"
            class="
              flex flex_row flex_al_c flex_j_s
              p_t_1 p_b_1 p_l_2 p_r_2
              text text_medium
            "
          >
            <i class="icon_circle mg_r_1"></i>
            Профиль</a
          >
        </li>

        <li class="nav__items mg_b_1">
          <a
            href="#"
            class="
              flex flex_row flex_al_c flex_j_s
              p_t_1 p_b_1 p_l_2 p_r_2
              text text_medium
            "
          >
            <i class="icon_circle mg_r_1"></i>
            Мои книги</a
          >
        </li>
        <li class="nav__items mg_b_1">
          <a
            href="#"
            class="
              flex flex_row flex_al_c flex_j_s
              p_t_1 p_b_1 p_l_2 p_r_2
              text text_medium
            "
          >
            <i class="icon_circle mg_r_1"></i>
            Уведомления</a
          >
        </li>
        <li class="nav__items mg_b_1">
          <a
            href="#"
            class="
              flex flex_row flex_al_c flex_j_s
              p_t_1 p_b_1 p_l_2 p_r_2
              text text_medium
            "
          >
            <i class="icon_circle mg_r_1"></i>
            Статистика</a
          >
        </li>
        <li class="nav__items mg_b_1">
          <a
            href="#"
            class="
              flex flex_row flex_al_c flex_j_s
              p_t_1 p_b_1 p_l_2 p_r_2
              text text_medium
            "
          >
            <i class="icon_circle mg_r_1"></i>
            Выйти</a
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      apiURI: `http://${process.env.VUE_APP_ROOT_API}/`,
    };
  },
  name: "SidebarRightComponent",
  computed: mapGetters(["checkAuthGetter", "userInfoGetter"]),
};
</script>