<template>
  <div class="content__books-container mg_t_2 flex flex_col flex_al_c flex_j_s">
    <div class="books-container__item flex flex_row flex_j_sb flex_al_s mg_b_2">
      <div class="books-container__poster-container">
        <img
          :src="`${ServerIP}${bookData.cover}`"
          alt="Book"
          class="poster-container__img"
        />
        <div class="poster-container__rating flex flex_al_c flex_j_c">
          <i class="icon_circle mg_r_1"></i>
          <span class="text text_small">1</span>
        </div>
        <div class="poster-container__favorite flex flex_al_c flex_j_c">
          <i class="icon_circle"></i>
        </div>
        <div
          class="poster-container__status poster-container__status_main flex flex_al_c flex_j_c"
        >
          <span class="text text_small text_bold text_black">Завершено</span>
        </div>
      </div>
      <div
        class="books-container__info block block_component_bg mg_l_2 flex flex_col flex_al_s flex_j_sb"
      >
        <div class="flex flex_col flex_al_s">
          <span class="text text_white text_big text_bold mg_b_1">{{
            bookData.name
          }}</span>
          <router-link
            :to="`/user/${bookData.author.id}`"
            class="text text_grey text_small-medium mg_b_1"
            >{{ bookData.author.nickname }}</router-link
          >
          <div class="books-container__genres flex flex_j_s flex_wrap mg_b_1">
            <router-link
              to=""
              class="link mg_r_1 text text_small-medium"
              v-for="(genre, index) in bookData.genres"
              :key="index"
            >
              {{ genre.title }}
            </router-link>
          </div>
          <p class="text text_small text_grey text_justify mg_b_1">
            {{ bookData.description }}
          </p>
        </div>
        <router-link
          :to="`/book/${bookData.id}`"
          class="btn btn_active text text_medium text_white-alw"
          v-if="isReadLink"
          >Читать!</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import Config from "./../../Utils/Config";
export default {
  name: "BookComponent",
  data() {
    return {
      ServerIP: Config.ServerIP,
    };
  },
  props: ["isReadLink", "bookData"],
};
</script>

<style></style>
