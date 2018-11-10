<template>
    <v-card>
        <v-card-title class="primary white--text" primary-title>
            <div class="headline">{{antiPattern.name}}</div>
        </v-card-title>
        <v-card-title primary-title>
            <div>{{antiPattern.description}}</div>
        </v-card-title>
        <v-card-actions>
            <v-dialog lazy scrollable v-model='dialog' @keydown.esc="dialog = false" width="1000px">
                <v-btn icon slot="activator">
                    <v-icon>open_in_new</v-icon>
                </v-btn>
                <anti-pattern-detail-component :anti-pattern="antiPattern"/>
            </v-dialog>
            <v-spacer></v-spacer>
            <anti-pattern-actions-component :anti-pattern="antiPattern"/>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {AntiPattern} from '../common/anti-pattern';
    import AntiPatternDetailComponent from "./AntiPatternDetailComponent";
    import AntiPatternActionsComponent from "./AntiPatternActionsComponent";

    @Component({
        components: {
            AntiPatternActionsComponent,
            AntiPatternDetailComponent,
        },
    })
    export default class AntiPatternSimpleComponent extends Vue {
        @Prop(Object) public antiPattern!: AntiPattern;
        public dialog: boolean = false;
    }
</script>
