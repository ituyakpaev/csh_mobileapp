<template>
    <div class="profile" >
        <profile />
        <email />
        <password />
        <social />
    </div>
</template>

<script>
    import profile from "@/views/settings/profile/profile";
    import email from "@/views/settings/profile/email";
    import password from "@/views/settings/profile/password";
    import social from "@/views/settings/profile/social";
    import { mapState } from 'vuex'
    export default {
        name: "main.vue",
        components: {profile, email, password, social},
    }
</script>

<style lang="scss">
    .profile {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
    }
</style>
