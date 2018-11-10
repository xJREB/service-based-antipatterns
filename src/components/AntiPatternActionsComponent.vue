<template>
    <span>
        <v-tooltip top>
            <v-btn slot="activator" icon v-clipboard:copy="antiPatternAsJson">
                <v-icon>content_copy</v-icon>
            </v-btn>
            <span>Copy the json file</span>
        </v-tooltip>
        <v-tooltip top>
            <v-btn slot="activator" icon v-clipboard:copy="antiPattern.sources[0]">
                <v-icon>format_quote</v-icon>
            </v-btn>
            <span>Copy the BibTex source</span>
        </v-tooltip>
        <v-tooltip top>
            <v-btn slot="activator" icon v-clipboard:copy="shareLink">
                <v-icon>share</v-icon>
            </v-btn>
            <span>Copy the link to this antipattern to the clipboard</span>
        </v-tooltip>
    </span>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {AntiPattern} from '../common/anti-pattern';

    @Component
    export default class AntiPatternActionsComponent extends Vue {
        @Prop(Object) public antiPattern!: AntiPattern;
        public shareLink: string = '';
        public antiPatternAsJson = '';

        public created() {
            let antiPatternName: string = "default";
            if (this.antiPattern.name) {
                antiPatternName = this.antiPattern.name;
            }
            this.antiPatternAsJson = JSON.stringify(this.antiPattern);
            this.shareLink = window.location.origin + this.$router.resolve({
                name: 'homeWithTerm',
                params: {antipattern: antiPatternName},
            }).href;
        }
    }
</script>
