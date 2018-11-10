<template>
    <v-card>
        <v-toolbar class="secondary" card dark>
            <v-toolbar-title>{{antiPattern.name}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <anti-pattern-actions-component :anti-pattern="antiPattern"/>
        </v-toolbar>

        <v-card-text>
            <v-subheader>Also known as</v-subheader>
            <v-card-text>{{antiPattern.aliases.join(", ")}}</v-card-text>

            <v-subheader>Description</v-subheader>
            <v-card-text>{{antiPattern.description}}</v-card-text>

            <v-subheader>Cause</v-subheader>
            <v-card-text>{{antiPattern.cause}}</v-card-text>

            <v-subheader>Detection</v-subheader>
            <v-card-text>{{antiPattern.detection}}</v-card-text>

            <v-subheader>Solution</v-subheader>
            <v-card-text>{{antiPattern.solution}}</v-card-text>

            <v-subheader>Example</v-subheader>
            <v-card-text>{{antiPattern.example}}</v-card-text>

            <v-subheader>Source</v-subheader>
            <v-card-text v-for="source in antiPattern.sources" :key="source">
                <code>{{source}}</code>
            </v-card-text>

            <v-divider class="my-2"></v-divider>

            <v-subheader>Tags</v-subheader>
            <v-chip label v-for="tag in antiPattern.tags" :key="tag">
                <v-icon left>label</v-icon>
                <v-list-tile-title>{{ tag }}</v-list-tile-title>
            </v-chip>
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {AntiPattern} from '../common/anti-pattern';
    import AntiPatternActionsComponent from "./AntiPatternActionsComponent";
    @Component({
        components: {
            AntiPatternActionsComponent,
        },
    })
    export default class AntiPatternDetailComponent extends Vue {
        @Prop(Object) public antiPattern!: AntiPattern;
    }
</script>
