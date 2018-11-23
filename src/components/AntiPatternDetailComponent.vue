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
            <v-card-text>
                <v-tabs>
                    <v-tab v-for="template in bibliographyTemplates" :key="template">
                        {{template}}
                    </v-tab>
                    <v-tab-item v-for="key in Object.keys(bibliographyTemplates)" :key="key">
                        <v-card flat>
                            <v-card-text
                                    v-for="bibtexSource in antiPattern.sources" :key="bibtexSource">
                                <v-tooltip top>
                                    <div slot="activator" :style="{ cursor: 'pointer'}"
                                         v-html="getFormatted(bibtexSource, bibliographyFormat.HTML, key)"
                                         @click="copy(getFormatted(bibtexSource, bibliographyFormat.TEXT, key), key)">
                                    </div>
                                    <span>Click to copy single source</span>
                                </v-tooltip>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                </v-tabs>
            </v-card-text>

            <v-divider class="my-2"></v-divider>

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
    import {BibliographyFormat, BibliographyTemplate} from "../common/bibliography";
    import Cite from 'citation-js';

    @Component({
        components: {
            AntiPatternActionsComponent,
        },
    })
    export default class AntiPatternDetailComponent extends Vue {
        @Prop(Object) public antiPattern!: AntiPattern;
        public bibliographyTemplates = BibliographyTemplate;
        public bibliographyFormat = BibliographyFormat;

        public getFormatted(bibtex: string, format: string, template: keyof typeof BibliographyTemplate) {
            if (BibliographyTemplate[template] === BibliographyTemplate.BIBTEX) {
                return new Cite(bibtex).format('bibtex', {
                    format,
                });
            } else {
                return new Cite(bibtex).format('bibliography', {
                    format,
                    template: template.toString().toLowerCase(),
                    lang: 'en-US',
                });
            }
        }

        public onCopySuccess(key: keyof typeof BibliographyTemplate): void {
            this.$toasted.info(BibliographyTemplate[key] + ' was copied successfully');
        }

        public onCopyError(key: keyof typeof BibliographyTemplate): void {
            this.$toasted.error('Error copying ' + BibliographyTemplate[key]);
        }

        public copy(message: string, key: keyof typeof BibliographyTemplate) {
            (this as any).$copyText(message).then(() => this.onCopySuccess(key), () => this.onCopyError(key));
        }
    }
</script>

<style>
    .csl-left-margin {
        float: left;
        margin-right: 5px;

    }
</style>
