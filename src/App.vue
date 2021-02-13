<template >
    <main-layout />
</template>

<script>

    import MainLayout from './components/layout';
    import ViewPort from './plugins/library/module.viewport'

    export default {

        components: {
            MainLayout
        },

        methods: {
            dragdrop(){
                let body = document.body;

                ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                    body.addEventListener(eventName, (e)=>{
                        e.preventDefault();
                    }, false)
                });
                ['dragenter', 'dragover'].forEach(eventName => {
                    body.addEventListener(eventName, ()=>{
                        if (!body.classList.contains('on-drag')) body.classList.add('on-drag')
                    }, false)
                });
                ['dragleave', 'drop'].forEach(eventName => {
                    body.addEventListener(eventName, ()=>{
                        if (body.classList.contains('on-drag')) body.classList.remove('on-drag')
                    }, false)
                });
            },
        },

        mounted (){

            this.$store.dispatch('base/initSocials')

            this.dragdrop();

            new ViewPort({
                '0': ()=>{
                    this.$store.commit('base/SET_VIEWPORT', 'mobile');
                },
                '576': ()=>{
                    this.$store.commit('base/SET_VIEWPORT', 'small');
                },
                '768': ()=>{
                    this.$store.commit('base/SET_VIEWPORT', 'tablet');
                },
                '960': ()=>{
                    this.$store.commit('base/SET_VIEWPORT', 'compact');
                },
                '1200': ()=>{
                    this.$store.commit('base/SET_VIEWPORT', 'desktop');
                },
                '1660': ()=>{
                    this.$store.commit('base/SET_VIEWPORT', 'hd');
                }
            });

        },

    }
</script>
