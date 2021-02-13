<template lang="pug">
	.m-form-wrap
		slot

</template>

<script>

	export default {

		methods:{

			validate(){
				return new Promise((resolve, reject)=>{
					let collect = [];
					function recurse(el) {
						el.map(e => {
							if (e.componentInstance) collect.push(e.componentInstance);
							if (e.children){
								recurse(e.children);
							}
						})
					}
					recurse(this.$slots.default);

					let isError = collect.filter((item)=>{
						return item && !!item.validate ? !item.validate() : false
					});

					if ( isError.length ){
						reject(isError.map( comp => comp.errorMessage));
					} else {
						resolve();
					}

				});
			}
		},

	}
</script>
