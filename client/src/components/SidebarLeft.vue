<template>
  <div class="body__sidebar mg_t_2">
    <header
      class="sidebar__header block block_component block_bg link flex flex_row"
    >
      <img
        src="../assets/img/logo.png"
        class="header__logo logo mg_r_1"
        alt="Logo"
      />
      <div class="flex flex_col flex_j_c">
        <router-link to="/" class="text_white-alw text_big text_bold text_left"
          >Story To Read</router-link
        >
        <!-- <span class="text_grey text_small text_left">Поделись своей историей!</span> -->
      </div>
    </header>

    <nav class="block block_nopadding mg_t_2 mg_b_2">
      <ul class="nav flex flex_col flex_al_s flex_j_s">
        <li class="nav__items mg_b_1">
          <a
            href="#"
            class="
              link flex flex_row flex_al_c flex_j_s
              p_t_1 p_b_1 p_l_2 p_r_2
              text text_medium
            "
          >
            <i class="icon_circle link mg_r_1"></i>
            Главная</a
          >
        </li>

        <li class="nav__items mg_b_1">
          <a
            href="#"
            class="
              link flex flex_row flex_al_c flex_j_s
              p_t_1 p_b_1 p_l_2 p_r_2
              text text_medium
            "
          >
            <i class="icon_circle link mg_r_1"></i>
            Рекомендации</a
          >
        </li>
        <li class="nav__items mg_b_1">
          <a
            href="#"
            class="
              link flex flex_row flex_al_c flex_j_s
              p_t_1 p_b_1 p_l_2 p_r_2
              text text_medium
            "
          >
            <i class="icon_circle link mg_r_1"></i>
            Лента обновлений</a
          >
        </li>
        <li class="nav__items mg_b_1">
          <a
            href="#"
            class="
              link flex flex_row flex_al_c flex_j_s
              p_t_1 p_b_1 p_l_2 p_r_2
              text text_medium
            "
          >
            <i class="icon_circle link mg_r_1"></i>
            Разработчикам</a
          >
        </li>
        <li class="nav__items mg_b_1">
          <a
            href="#"
            class="
              link flex flex_row flex_al_c flex_j_s
              p_t_1 p_b_1 p_l_2 p_r_2
              text text_medium
            "
          >
            <i class="icon_circle link mg_r_1"></i>
            Поддержать проект</a
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "SidebarLeftComponent",
};
</script>

<style>
</style>