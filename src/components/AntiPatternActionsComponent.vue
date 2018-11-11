<template>
    <span>
        <v-tooltip top>
            <v-btn slot="activator" icon v-clipboard="antiPatternAsJson"
                   @success="onCopySuccess('JSON file')"
                   @error="onCopyError('JSON file')">
                <v-icon>content_copy</v-icon>
            </v-btn>
            <span>Copy the json file</span>
        </v-tooltip>
        <v-tooltip top>
            <v-btn slot="activator" icon v-clipboard="antiPattern.sources[0]"
                   @success="onCopySuccess('BibTex')"
                   @error="onCopyError('BibTex')">
                <v-icon>format_quote</v-icon>
            </v-btn>
            <span>Copy the BibTex source</span>
        </v-tooltip>
        <v-tooltip top>
            <v-btn slot="activator" icon v-clipboard="shareLink"
                   @success="onCopySuccess('Link')"
                   @error="onCopyError('link')">
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

        public get shareLink(): string {
            let antiPatternName: string = '';
            if (this.antiPattern.name) {
                antiPatternName = this.antiPattern.name;
            }
            return window.location.origin + this.$router.resolve({
                name: 'homeWithTerm',
                params: {antipattern: antiPatternName},
            }).href;
        }

        public get antiPatternAsJson(): string {
            return JSON.stringify(this.antiPattern, null, 2);
        }

        public onCopySuccess(type?: string): void {
            this.$toasted.info(type + ' was copied successfully');
        }

        public onCopyError(type?: string): void {
            this.$toasted.error('Error copying ' + type);
        }
    }
</script>
