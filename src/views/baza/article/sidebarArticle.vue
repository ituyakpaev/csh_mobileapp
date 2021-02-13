<template>
  <div class="">
    <div class="article__sidebar article-sidebar">
      <p
        class="article-sidebar__favorite"
        @click="clicked = !clicked"
        :class="{ 'article-sidebar__like--clicked': clicked }"
        :style="{ backgroundImage: `url(${basePath}/svg/sprite.svg)` }"
      >
        {{ article.is_favorite ? "Убрать из избранных" : "Добавить в избранное" }}
      </p>
      <div class="article-sidebar__author">
        <div class="article-sidebar__item">Автор</div>
        <div class="article-sidebar__item article-sidebar__item--name">
          {{ article.author }}
        </div>
      </div>
      <div class="article-tags">
        <div class="article-tags__title"></div>
      </div>
      <p class="article-sidebar__tags">Теги</p>
      <div class="article-tag">
        <div class="article-tag__item" v-for="tag in article.tags" :key="tag">
          <span>#</span> {{ tag }}
        </div>
      </div>
    </div>
    <div
      class="article-sidebar__like"
      @click="clicked = !clicked"
      :class="{ 'article-sidebar__like--clicked': clicked }"
    ></div>
  </div>
</template>

<script>
export default {
	name: "sidebarArticle",
    props: {
	    article: {
	        required: true,
            type: Object
        }
    },
	data() {
    return {
      clicked: false,
    };
  },
};
</script>


<style lang="scss">
.article-sidebar {
  position: absolute;
  right: 100px;
  top: 196px;
  font-weight: 400;
  @include media(wd) {
    right: 55px;
  }
  @include media(wd) {
    display: none;
  }
  &__like {
    display: none;
    @include media(wd) {
      display: flex;
      align-items: center;
      justify-content: center;
      position: fixed;
      right: 30px;
      bottom: 30px;
      width: 68px;
      height: 68px;
      z-index: 2;
      border-radius: 50%;
      background-color: #ffffff;
      box-shadow: 0px 4px 8px 2px rgba(0, 0, 0, 0.25);
      &::before {
        content: "";
        display: inline-block;
        transform: scale(2);
        vertical-align: middle;
        background-image: url(../../../../public/svg/sprite.svg);
        background-repeat: no-repeat;
        background-position: -460px -112px;
        width: 16px;
        height: 15px;
        @include media(xs) {
          transform: scale(1.5);
        }
      }

      &--clicked {
        &::before {
          background-position: -460px -82px;
          width: 16px;
          height: 15px;
        }
      }
    }
    @include media(md) {
      width: 60px;
      height: 60px;
    }
    @include media(xs) {
      width: 50px;
      height: 50px;
      right: 20px;
      bottom: 20px;
    }
  }
  p.article-sidebar__favorite {
    font-family: $font-main;
    font-size: 16px;
    line-height: 19px;
    color: $color-grey;
    margin: 0px 0px 22px 0px;
    cursor: pointer;
    &::before {
      content: "";
      display: inline-block;
      vertical-align: middle;
      background-image: url(../../../../public/svg/sprite.svg);
      background-repeat: no-repeat;
      margin-right: 5px;
      margin-top: -3px;
      background-position: -460px -112px;
      width: 16px;
      height: 15px;
    }
    &.article-sidebar__like--clicked {
      color: $color-yellow;
      &::before {
        background-position: -460px -82px;
        width: 16px;
        height: 15px;
      }
    }
  }

  &__author {
    margin: 0px 0px 22px 0px;
  }

  &__item {
    font-size: 16px;
    line-height: 19px;
    color: $color-black;
    margin: 0px 0px 7px 0px;
  }

  &__item--name {
    font-size: 16px;
    line-height: 16px;
    color: $color-grey-text;
  }
  .article-sidebar__tags {
    font-family: $font-main;
    font-size: 18px;
    line-height: 21px;
    color: $color-black;
    margin: 30px 0px 10px 0px;
  }
}

</style>
