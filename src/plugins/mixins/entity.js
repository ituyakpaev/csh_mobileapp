export default {
    computed: {
        entity: {
            get() {
                let result = {}

                Object.keys(this.model).map(key => {
                    if (this.model[key].ignore !== true) {
                        if (this.model[key].type === 'date') {
                            result[key] = this.model[key].value || null
                        } else {
                            result[key] = this.model[key].value
                        }
                    }
                })

                return result
            },
            set(data) {
                Object.keys(this.model).map(key => {
                    this.model[key].value = data[key]
                })
            }
        }
    }
}
