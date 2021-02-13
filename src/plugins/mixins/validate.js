export default {
    methods: {
        validate() {
            let error = false

            if (this.model) {
                Object.keys(this.model).map(key => {
                    if (this.model[key].required && this.model[key].value.length === 0) {
                        this.model[key].error = this.model[key].empty_error || 'Поле обязательно'
                        error = true
                    } else if (this.model[key].validate && Array.isArray(this.model[key].validate) ) {
                        this.model[key].error = ""
                        for (let test of this.model[key].validate) {
                            if ( ( test.regexp && !test.regexp.test(this.model[key].value) ) || ( test.function && !test.function(this.model[key].value) ) ) {
                                this.model[key].error = test.title
                                error = true
                                break
                            }
                        }
                    } else {
                        this.model[key].error = ""
                    }
                })
            }

            return !error
        }
    }
}
