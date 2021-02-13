<template lang="pug">
	.m-form-item(v-if="value === undefined") Не определено значение v-model
	.m-form-item(v-else)
		slot


</template>

<script>
	export default {
		name: 'm-form-item',
		props: ['value']
	}
</script>
