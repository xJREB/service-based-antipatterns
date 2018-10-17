<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <!--<HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>-->
        <AntiPatterns></AntiPatterns>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import AntiPatterns from "@/components/AntiPatterns.vue";
    import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

    @Component({
        components: {
            HelloWorld,
            AntiPatterns,
        },
    })
    export default class Home extends Vue {

    }
</script>
