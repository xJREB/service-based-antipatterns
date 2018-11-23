<template>
    <v-card-actions>
        <v-layout justify-end>
            <v-tooltip top>
                <v-btn slot="activator" icon @click="copy(antiPatternAsJson, 'JSON file')">
                    <v-icon>content_copy</v-icon>
                </v-btn>
                <span>Copy the json file</span>
            </v-tooltip>
            <v-tooltip top>
                <v-btn slot="activator" icon @click="copy(bibTextCopy, 'BibTex')">
                    <v-icon>format_quote</v-icon>
                </v-btn>
                <span>Copy the BibTex source</span>
            </v-tooltip>
            <v-tooltip top>
                <v-btn slot="activator" icon @click="copy(shareLink, 'Link')">
                    <v-icon>share</v-icon>
                </v-btn>
                <span>Copy the link to this antipattern to the clipboard</span>
            </v-tooltip>
        </v-layout>
    </v-card-actions>
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
                name: 'home',
                query: {antipattern: antiPatternName},
            }).href;
        }

        public get antiPatternAsJson(): string {
            return JSON.stringify(this.antiPattern, null, 2);
        }

        public get bibTextCopy(): string {
            return this.antiPattern!.sources!.join("\n");
        }

        public onCopySuccess(type?: string): void {
            this.$toasted.info(type + ' was copied successfully');
        }

        public onCopyError(type?: string): void {
            this.$toasted.error('Error copying ' + type);
        }

        public copy(message: string, type?: string) {
            (this as any).$copyText(message).then(() => this.onCopySuccess(type), () => this.onCopyError(type));
        }
    }
</script>
