<template>
    <v-card style="display: flex; flex-direction: column;" height="100%">
        <v-card-title class="primary white--text"
                      v-bind:style="{ background: 'linear-gradient(90deg, #3f51b5 98%, ' + referenceMedianColor + ' 2%) !important'}">
            <div class="headline">{{antiPattern.name}}</div>
        </v-card-title>
        <v-card-text class="grow">
            <div>{{antiPattern.description}}</div>
        </v-card-text>
        <v-card-actions>
            <v-dialog lazy scrollable v-model='dialog' @keydown.esc="dialog = false" width="1000px">
                <v-tooltip top slot="activator">
                    <v-btn icon slot="activator">
                        <v-icon>open_in_new</v-icon>
                    </v-btn>
                    <span>Open the detail view</span>
                </v-tooltip>
                <anti-pattern-detail-component v-model="dialog" :anti-pattern="antiPattern"/>
            </v-dialog>
            <v-spacer></v-spacer>
            <anti-pattern-actions-component :anti-pattern="antiPattern"/>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import {AntiPattern} from '../common/anti-pattern';
    import AntiPatternDetailComponent from "./AntiPatternDetailComponent";
    import AntiPatternActionsComponent from "./AntiPatternActionsComponent";
    import CrossRef from 'crossref';
    import Cite from 'citation-js';
    import Math from 'mathjs';

    @Component({
        components: {
            AntiPatternActionsComponent,
            AntiPatternDetailComponent,
        },
    })
    export default class AntiPatternSimpleComponent extends Vue {
        @Prop(Object) public antiPattern!: AntiPattern;
        public dialog: boolean = false;
        private referenceCount: number[] = [];

        public created() {
            if (this.antiPattern.sources) {
                this.antiPattern.sources.forEach((source: any) => {
                        const doi = new Cite(source).get()[0].DOI;
                        if (doi) {
                            CrossRef.work(doi, (err: any, objs: never) => {
                                this.referenceCount.push(objs['is-referenced-by-count']);
                            });
                        }
                    },
                );
            }
        }

        public get referenceMedianColor(): string {
            if (this.referenceCount.length > 0) {
                this.referenceCount.sort();
                const lowMiddle = Math.floor((this.referenceCount.length - 1) / 2);
                const highMiddle = Math.ceil((this.referenceCount.length - 1) / 2);
                const median = (this.referenceCount[lowMiddle] + this.referenceCount[highMiddle]) / 2;
                const alphaValue = median / 100 + 0.1;
                return "rgba(255, 0 , 0, " + alphaValue + ")";
            }
            return "lightgrey";
        }

        @Watch('router', {immediate: true, deep: true})
        public beforeRouteUpdate(to: any, from: any) {
            if (this.$route.query.antipattern === this.antiPattern.name) {
                this.dialog = true;
            }
        }

        @Watch('dialog')
        public onDialogUpdate(newValue: boolean, oldValue: boolean) {
            if (newValue) {
                this.$router.push({
                    name: 'home',
                    query: {antipattern: this.antiPattern!.name!},
                });
            } else {
                this.$router.push({name: 'home'});
            }
        }
    }
</script>
