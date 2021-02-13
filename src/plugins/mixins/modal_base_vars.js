export default {
    data: function () {
        return {
            isNew: false,
            id: ''
        }
    },
    watch: {
        value: function(value) {
            this.isNew = value.id < 0
            this.id = value.id

            console.log(this.isNew)
            console.log(value)

            if (this.isNew) {
                let empty = {}
                Object.keys(this.entity).map(key => {
                    empty[key] = ''
                })
                this.entity = empty
            } else {
                this.entity = value
            }
        }
    }
}
