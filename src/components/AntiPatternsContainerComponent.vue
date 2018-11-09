<template>
    <v-container fill-height fluid grid-list-md>
        <v-layout wrap>
            <v-flex xs3 v-for="antiPattern in antiPatterns" :key="antiPattern.name">
                <anti-pattern-simple-component :anti-pattern="antiPattern"/>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import axios from 'axios';
    import {AntiPattern} from '../common/anti-pattern';
    import AntiPatternSimpleComponent from "./AntiPatternSimpleComponent";

    @Component({
        components: {
            AntiPatternSimpleComponent,
        },
    })
    export default class AntiPatterns extends Vue {
        private antiPatterns: AntiPattern[] = [];

        public created() {
            axios.get(`/service-based-antipatterns/assets/result.json`).then((response) => {
                this.antiPatterns = response.data.antiPatterns;
                this.antiPatterns = this.antiPatterns.filter((item) => item.name);
            }).catch();
        }
    }
</script>