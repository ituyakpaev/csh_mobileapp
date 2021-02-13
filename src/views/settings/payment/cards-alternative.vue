<template>
  <panel_box :title="title" :subtitle="subtitle">
    <div class="card">
      <div class="card__img">
        <img :src="`${basePath}img/cards/mastercard.png`" alt="" />
      </div>
      <p class="card__text">MasterCard <span>**3136</span></p>
      <div class="card__remove"></div>
    </div>
		<div class="card card-add">
			<div class="card__img">
        <img :src="`${basePath}/svg/credit-card.svg`" alt="" />
      </div>
			<p class="card__text">Добавить карту</p>
		</div>
  </panel_box>
</template>

<script>
import panel_box from "@/components/regular/panel_box";

export default {
  name: "cards_alt",
  components: { panel_box },
  data() {
    return {
      title: "Способы оплаты",
      subtitle:
        "Мы бережно храним ваши данные карты и не передаем их третьим лицам.",
    };
  },
};
</script>

<style lang="scss">
.card {
	margin-top: 20px;
  padding: 10px;
  display: flex;
  border: $form-item-border;
  background-color: $inputBg;
  border-radius: 4px;
	align-items: center;
	max-width: 350px;
	position: relative;
	height: 50px;

  &__img {
		width: 40px;
		margin-right: 20px;

    img {
      display: inline-block;
      width: 100%;
      height: 100%;
    }
  }

  &__text {
    color: $color-black;
    font-size: 16px;
    font-weight: 500;
    line-height: 21px;
    text-align: center;
  }

  &__remove {
		cursor: pointer;
		width: 25px;
		height: 25px;
		position: absolute;
		right: 10px;
		top: 50%;
		transform: translateY(-50%);
		background-repeat: no-repeat;
		background-size: cover;
		background-image: url(../../../../public/svg/delete.svg);
		background-position: center right;
	}
	&-add{
		cursor: pointer;
	}
}
</style>
