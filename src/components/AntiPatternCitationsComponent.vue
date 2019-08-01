<template>
    <v-tabs>
        <v-tab v-for="template in bibliographyTemplates" :key="template">
            {{template}}
        </v-tab>
        <v-tab-item v-for="key in Object.keys(bibliographyTemplates)" :key="key">
            <v-card flat>
                <v-card-text
                        v-for="bibtexSource in sources" :key="bibtexSource">
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
</template>

<script lang="ts">
import {BibliographyFormat, BibliographyTemplate} from "@/common/bibliography";
import Cite from "citation-js";
import {Component, Prop, Vue} from "vue-property-decorator";

@Component
export default class AntiPatternDetailComponent extends Vue {
    @Prop(Array) public sources!: string[];
    public bibliographyTemplates = BibliographyTemplate;
    public bibliographyFormat = BibliographyFormat;

    public getFormatted(bibtex: string, format: string, template: keyof typeof BibliographyTemplate) {
        if (BibliographyTemplate[template] === BibliographyTemplate.BIBTEX) {
            return new Cite(bibtex).format("bibtex", {
                format
            });
        } else {
            return new Cite(bibtex).format("bibliography", {
                format,
                template: template.toString().toLowerCase().replace(/_/g, "-"),
                lang: "en-US"
            });
        }
    }

    public onCopySuccess(key: keyof typeof BibliographyTemplate): void {
        this.$toasted.info(BibliographyTemplate[key] + " was copied successfully");
    }

    public onCopyError(key: keyof typeof BibliographyTemplate): void {
        this.$toasted.error("Error copying " + BibliographyTemplate[key]);
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
