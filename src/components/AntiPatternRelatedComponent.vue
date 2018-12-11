<template>
    <v-layout wrap>
        <v-flex md2 xs3>
            <v-subheader>Related Antipatterns</v-subheader>
        </v-flex>
        <v-flex md10 xs9>
            <v-window v-model="relatedItemCardIndex">
                <v-window-item v-for="relatedAntiPattern in relatedAntiPatterns"
                               :key="relatedAntiPattern.name">
                    <v-card>
                        <v-card-title class="primary white--text">
                            <div class="headline">{{relatedAntiPattern.name}}</div>
                            <v-spacer></v-spacer>
                            <v-tooltip top slot="activator">
                                <v-btn icon dark slot="activator" @click="openAntiPattern(relatedAntiPattern.name)">
                                    <v-icon>open_in_new</v-icon>
                                </v-btn>
                                <span>Open the detail view</span>
                            </v-tooltip>
                        </v-card-title>
                        <v-card-text class="grow">
                            <div>{{relatedAntiPattern.description}}</div>
                        </v-card-text>
                        <v-card-text>
                            Relation: {{relatedAntiPattern.relation}}
                        </v-card-text>
                    </v-card>
                </v-window-item>
            </v-window>
            <v-card-actions class="justify-space-between">
                <v-btn flat @click="prev">
                    <v-icon>navigate_before</v-icon>
                </v-btn>
                <v-item-group v-model="relatedItemCardIndex" class="text-xs-center" mandatory>
                    <v-item v-for="relatedAntiPattern in relatedAntiPatterns" :key="relatedAntiPattern.name">
                        <v-btn slot-scope="{ active, toggle }"
                               :input-value="active"
                               icon
                               @click="toggle">
                            <v-icon>fiber_manual_record</v-icon>
                        </v-btn>
                    </v-item>
                </v-item-group>
                <v-btn flat @click="next">
                    <v-icon>navigate_next</v-icon>
                </v-btn>
            </v-card-actions>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {AntiPattern} from '@/common/anti-pattern';
    import AntiPatternActionsComponent from "./AntiPatternActionsComponent";
    import AntiPatternCitationsComponent from "./AntiPatternCitationsComponent.vue";
    import {RawLocation} from "vue-router";

    @Component({
        components: {
            AntiPatternCitationsComponent,
            AntiPatternActionsComponent,
        },
    })
    export default class AntiPatternRelatedComponent extends Vue {
        @Prop(Array) public relatedAntiPatterns!: AntiPattern[];
        public relatedItemCardIndex: number = 0;

        public next() {
            this.relatedItemCardIndex =
                this.relatedItemCardIndex + 1 === this.relatedAntiPatterns.length ? 0 : this.relatedItemCardIndex + 1;
        }

        public prev() {
            this.relatedItemCardIndex =
                this.relatedItemCardIndex - 1 < 0 ? this.relatedAntiPatterns.length - 1 : this.relatedItemCardIndex - 1;
        }

        public openAntiPattern(antiPatternName: string) {
            this.$router.push({name: 'home', query: {antipattern: antiPatternName}} as RawLocation);
            location.reload();
        }
    }
</script>
