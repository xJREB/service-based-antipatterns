<template>
    <v-card style="display: flex; flex-direction: column;" height="100%">
        <v-card-title class="primary white--text"
                      v-bind:style="{ background: 'linear-gradient(90deg, #3f51b5 98%, ' + referenceEvidenceColor + ' 2%) !important'}">
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
            <anti-pattern-actions-component :antiPattern="antiPattern"/>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import {AntiPattern} from '../common/anti-pattern';
    import AntiPatternActionsComponent from "./AntiPatternActionsComponent";
    import AntiPatternDetailComponent from "./AntiPatternDetailComponent";
    import EvidenceUtils from "../utils/EvidenceUtils";

    @Component({
        components: {
            AntiPatternActionsComponent,
            AntiPatternDetailComponent,
        },
    })
    export default class AntiPatternCardComponent extends Vue {
        @Prop(Object) public antiPattern!: AntiPattern;
        public dialog: boolean = false;

        public get referenceEvidenceColor(): string {
            return EvidenceUtils.getReferenceEvidenceColor(this.antiPattern);
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
