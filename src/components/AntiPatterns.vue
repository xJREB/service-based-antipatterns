<template>
    <div style="text-align: left">
        <vue-json-pretty
                :data=antiPatterns
                @click="handleClick"/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import axios from "axios";
    import VueJsonPretty from "vue-json-pretty";
    import {AntiPattern} from "../common/anti-pattern";

    @Component({
        components: {
            VueJsonPretty,
        },
    })
    export default class AntiPatterns extends Vue {
        private antiPatterns: AntiPattern[] = [];

        created() {
            axios.get(`/service-based-antipatterns/assets/result.json`).then(response => {
                this.antiPatterns = response.data;
            }).catch();
        }

        handleClick() {
        }
    }
</script>