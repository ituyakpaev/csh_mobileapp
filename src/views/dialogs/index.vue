<template lang="pug">
	.view
		view-curator(v-if="isCurator")
		view-student(v-else)

		popup(v-model="popup.open", @onClose="$store.commit('dialogs/CLOSE_INFO_POPUP')").popup_info
			.popup__title(v-html="popup.title")
			.popup__text(v-html="popup.message")
			.popup__footer
				btn-item(@click="$store.commit('dialogs/CLOSE_INFO_POPUP')") Закрыть

</template>

<script>

	import ViewCurator from './view-curator'
	import ViewStudent from './view-student'
	import {mapState} from 'vuex'

	export default {

		components:{
			ViewCurator, ViewStudent
		},

		computed: {
			...mapState({
				popup: state => state.dialogs.popup,
				menu: state => state.base.localNav.dialogs.rows,
				access: state => state.base.sections.dialogs !== false
			}),

			isCurator(){
				return this.$store.state.base.user.curator;
			},
		},

		created(){
			this.loadData();

			if ( !this.access ){
				this.$router.push({name: 'courses-all'})
			}
		},

		methods: {
			loadData(){

				if ( this.isCurator && !this.$route.params.case ){
					this.$router.push(`/dialogs/all`)
				}
				this.$store.dispatch('dialogs/getLocalNav')
					.then(res => {
						if ( !this.isCurator && !this.$route.params.case ){
							this.$router.push(`/dialogs/${this.menu[0].id}`)
						}
					});

			}
		}

	}
</script>

<style scoped lang="scss">

	.view{
		height: 100%;
	}

</style>
