<script>

	export default {
		props: {
			disabled: {
				type: Boolean,
				default: false
			},
			loading: {
				type: Boolean,
				default: false
			},
			rules: {
				type: Object,
				default: null
			},
			value: {
				type: [Array, String, Number, Boolean, Date]
			},
		},

		data() {
			return {
				isFocused: false,
				isError: false,
				errorMessage: false,
			}
		},

		computed: {
			model: {
				get() {
					return this.value;
				},
				set(value) {
					this.$emit('input', value);
				}
			},

			multiple(){
				return Array.isArray(this.model);
			},

			classList(){
				return {
					'm-form-status-filled'    : this.multiple ? this.model.length : !!this.model,
					'm-form-status-focus'     : this.isFocused,
					'm-form-status-disabled'  : this.disabled,
					'm-form-status-loading'   : this.loading,
					'm-form-status-error'     : this.isError,
				};
			}
		},

		watch:{
			model(){
				if (this.isError) this.isError = false;
			}
		},

		methods: {
			validate(){

				this.isError = false;
				const isEmpty = this.multiple ? this.model.length === 0 : !this.model;
				const rules = this.rules;
				this.errorMessage = '';

				if ( this.$options.name === 'form_old-date'){
					this.isError = isNaN(Date.parse(this.model));
				}

				if ( rules ){

					let errorList = [];

					if ( rules.empty ){
						if ( isEmpty ) {
							errorList.push(rules.empty);
							this.isError = true;
						}
					}

					if ( this.model ){
						if ( rules.pattern && rules.pattern.length ){
							rules.pattern.map(item => {
								if ( item.regex && item.regex instanceof RegExp && !item.regex.test(this.model) ) {
									errorList.push(item.message || '');
									this.isError = true;
								}
							});
						}

						if ( rules.antiPattern && rules.antiPattern.length ){
							rules.antiPattern.map(item => {
								if ( item.regex && item.regex instanceof RegExp && item.regex.test(this.model) ) {
									errorList.push(item.message || '');
									this.isError = true;
								} else if ( item.regex && typeof item.regex === 'string' && this.model === item.regex ){
									errorList.push(item.message || '');
									this.isError = true;
								}
							});
						}

						if ( rules.min ){
							if ( this.model.length < rules.min ) {
								if (rules.min.message) errorList.push(rules.min.message);
								this.isError = true;
							}
						}

						if ( rules.max ){
							if ( this.model.length > rules.max ) {
								if (rules.max.message) errorList.push(rules.max.message);
								this.isError = true;
							}
						}
					}

					if ( errorList.length ) this.errorMessage = errorList[0];
				}

				return !this.isError;
			},
		}
	}
</script>
