<template>
    <v-container fluid grid-list-md>
        <v-layout row wrap>
            <v-flex xs3 v-for="antiPattern in antiPatterns" :key="antiPattern.name">

                <v-card>
                    <v-card-title class="primary white--text" primary-title>
                        <div class="headline">{{antiPattern.name}}</div>
                    </v-card-title>
                    <v-card-title primary-title>
                        <div>{{antiPattern.description}}</div>
                    </v-card-title>
                    <v-card-actions>
                        <v-dialog lazy scrollable v-model="dialog" width="1000px">
                            <v-btn icon slot="activator">
                                <v-icon>open_in_new</v-icon>
                            </v-btn>
                            <anti-pattern-detail-component :anti-pattern="antiPattern"/>
                        </v-dialog>
                        <v-spacer></v-spacer>
                        <anti-pattern-actions-component :anti-pattern="antiPattern"/>
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
    import AntiPatternActionsComponent from "./AntiPatternActionsComponent";

    @Component({
        components: {AntiPatternDetailComponent, AntiPatternActionsComponent}
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