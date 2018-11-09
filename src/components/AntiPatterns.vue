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
                        <v-dialog v-model="dialog" width="600px">
                            <v-btn slot="activator" flat color="orange">Explore</v-btn>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">{{antiPattern.name}}</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-list>
                                        <v-list-tile>
                                            <v-list-tile-content>
                                                <v-list-tile-title>Name</v-list-tile-title>
                                                <v-list-tile-sub-title>{{ antiPattern.name }}
                                                </v-list-tile-sub-title>
                                            </v-list-tile-content>
                                        </v-list-tile>

                                        <v-list-tile>
                                            <v-list-tile-content>
                                                <v-list-tile-title>Aliases</v-list-tile-title>
                                                <v-list-tile-sub-title>{{ antiPattern.aliases }}
                                                </v-list-tile-sub-title>
                                            </v-list-tile-content>
                                        </v-list-tile>

                                        <v-list-tile>
                                            <v-list-tile-content>
                                                <v-list-tile-title>Description</v-list-tile-title>
                                                <v-list-tile-sub-title>{{ antiPattern.description }}
                                                </v-list-tile-sub-title>
                                            </v-list-tile-content>
                                        </v-list-tile>

                                        <v-list-tile>
                                            <v-list-tile-content>
                                                <v-list-tile-title>Cause</v-list-tile-title>
                                                <v-list-tile-sub-title>{{ antiPattern.cause }}
                                                </v-list-tile-sub-title>
                                            </v-list-tile-content>
                                        </v-list-tile>

                                        <v-list-tile>
                                            <v-list-tile-content>
                                                <v-list-tile-title>Detection</v-list-tile-title>
                                                <v-list-tile-sub-title>{{ antiPattern.detection }}
                                                </v-list-tile-sub-title>
                                            </v-list-tile-content>
                                        </v-list-tile>

                                        <v-list-tile>
                                            <v-list-tile-content>
                                                <v-list-tile-title>Example</v-list-tile-title>
                                                <v-list-tile-sub-title>{{ antiPattern.example }}
                                                </v-list-tile-sub-title>
                                            </v-list-tile-content>
                                        </v-list-tile>

                                        <v-list-tile>
                                            <v-list-tile-content>
                                                <v-list-tile-title>Solution</v-list-tile-title>
                                                <v-list-tile-sub-title>{{ antiPattern.solution }}
                                                </v-list-tile-sub-title>
                                            </v-list-tile-content>
                                        </v-list-tile>

                                        <v-list-tile>
                                            <v-list-tile-content>
                                                <v-list-tile-title>Sources</v-list-tile-title>
                                                <v-list-tile-sub-title>{{ antiPattern.sources }}
                                                </v-list-tile-sub-title>
                                            </v-list-tile-content>
                                        </v-list-tile>

                                        <v-list-tile>
                                            <v-list-tile-content>
                                                <v-list-tile-title>Tags</v-list-tile-title>
                                                <v-list-tile-sub-title>{{ antiPattern.tags }}
                                                </v-list-tile-sub-title>
                                            </v-list-tile-content>
                                        </v-list-tile>
                                    </v-list>
                                </v-card-text>
                            </v-card>
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
    import {AntiPattern} from '@/common/anti-pattern';

    @Component
    export default class AntiPatterns extends Vue {
        private antiPatterns: AntiPattern[] = [];

        public created() {
            axios.get(`/service-based-antipatterns/assets/result.json`).then((response) => {
                this.antiPatterns = response.data.antiPatterns;
            }).catch();
        }
    }
</script>