<template>
    <div>
        <document :type="type" :title="title" :weight="volume"/>
        <document1 :type="type" :title="title" :weight="volume"/>
    </div>
</template>

<script>
    import document from "../../components/functional/document";
    import document1 from "../../components/functional/document1";

    export default {
        name: "docs",
        data() {
            return {
                type: 'PDF',
                title: 'Презентация 1',
                volume: '5 страниц'
            }
        },
        components: {
            document, document1
        }
    }
</script>

<style scoped>

</style>
