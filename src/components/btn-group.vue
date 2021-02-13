<template functional lang="pug">
	.btn-group
		slot

</template>

<script>


</script>

<style scoped lang="scss">

	.btn-group{
		display: flex;

		&::v-deep{
			.btn{
				border-radius: 0;
				margin-right: 1px;
				white-space: nowrap;

				&:first-child{
					border-radius: 50px 0 0 50px;
				}

				&:last-child{
					border-radius: 0 50px 50px 0;
				}
			}
		}
	}

</style>


