import validate from "./validate";

export default {
    mixins: [validate],
    methods: {
        saveData: async function () {
            if (this.validate()) {
                console.log(this.entity)
                console.log(this.isNew)
                let promise = this.isNew ? this.api.create(this.entity) : this.api.update(this.id, this.entity)

                this.isPerforming = true

                await promise
                    .then(res => {
                        this.entity = res.data
                        this.isNew = false
                        this.id = res.data.id
                        this.$emit('update')
                    })
                    .catch(err => {
                        alert(`${ err.code }: ${ err.text }`)
                        console.log(err)
                    })

                this.isPerforming = false
            }
        }
    }
}
