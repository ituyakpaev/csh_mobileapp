<template lang="pug">
	div(v-if="disabled").c-grey: slot
	router-link(v-else-if="internalLink", :to="href", :tag="tag"): slot
	a(v-else, :href="href"): slot

</template>

<script>

	export default {
		props: {
			disabled: {
				type: [String, Boolean],
				default: false
			},
			href: {
				type: String,
				default: '#'
			},
			tag: {
				type: String,
				default: 'a'
			}
		},

		computed:{
			internalLink(){
				let url = this.href.replace(/(https?\:\/\/)/g, '');
				return url.indexOf('/') === 0;
			}
		}

	}

</script>


