<template>
    <v-container fluid grid-list-md>
        <v-layout row wrap>
            <v-flex xs3 v-for="antiPattern in antiPatterns" :key="antiPattern.name">
                <v-card>
                    <v-container fill-height fluid>
                        <v-layout fill-height>
                            <v-flex xs12 align-end flexbox>
                                <span v-if="antiPattern.name" class="headline">{{antiPattern.name}}</span>
                                <span v-else class="headline">Default Name</span>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <v-card-title>
                        <div>
                            <span>{{antiPattern.description}}</span>
                        </div>
                    </v-card-title>
                    <v-card-actions>
                        <v-btn flat color="orange">Share</v-btn>
                        <v-dialog lazy scrollable v-model="dialog" width="1000px">
                            <v-btn slot="activator" dark flat color="orange">Explore</v-btn>
                            <anti-pattern-detail-component :anti-pattern="antiPattern" />
                        </v-dialog>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import axios from 'axios';
    import {AntiPattern} from '../common/anti-pattern';
    import AntiPatternDetailComponent from "./AntiPatternDetailComponent";
    @Component({
        components: {AntiPatternDetailComponent}
    })
    export default class AntiPatterns extends Vue {
        private antiPatterns: AntiPattern[] = [];

        public created() {
            axios.get(`/service-based-antipatterns/assets/result.json`).then((response) => {
                this.antiPatterns = response.data.antiPatterns;
            }).catch();
        }
    }
</script>