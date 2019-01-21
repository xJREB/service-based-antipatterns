<template>
    <div class="home">
        <anti-pattern-tags-component v-model="tagsModel" :tags="tags"/>
        <v-toolbar class="primary" app dark clipped-left :extended="$vuetify.breakpoint.xs">
            <v-toolbar-side-icon @click.native="tagsModel.drawer = !tagsModel.drawer"></v-toolbar-side-icon>
            <span class="title ml-1 mr-1 hidden-md-and-down">Service-Based Antipatterns</span>
            <v-text-field
                    class="ml-1 mr-1"
                    solo-inverted
                    flat
                    clearable
                    hide-details
                    label="Search"
                    prepend-inner-icon="search"
                    v-model="searchTerm"
                    @keydown.esc="clearSearch()"
            ></v-text-field>
            <v-flex class="mr-2" xs12 sm4 md2 lg2 lx2 :slot="slot">
                <v-select
                        v-model="sorting"
                        style="padding: 0;"
                        label="Sorting"
                        :items="sortingItems"
                        item-text="name"
                        item-value="value"
                        prepend-icon="sort"
                        single-line
                        attach
                        hide-details
                ></v-select>
            </v-flex>
            <v-chip class="title ml-1 mr-1" :slot="slot" outline text-color="white">
                {{antiPatterns.length}}/{{antiPatternsAll.length}}
            </v-chip>
            <v-spacer class="hidden-md-and-down"></v-spacer>
            <v-btn icon href='https://github.com/xJREB/service-based-antipatterns/'>
                <font-awesome-icon size="2x" :icon="['fab', 'github']"></font-awesome-icon>
            </v-btn>
            <v-dialog content-class="help-dialog" help-dialog lazy scrollable v-model="dialog"
                      @keydown.esc="dialog = false" width="1000px">
                <v-btn icon slot="activator">
                    <font-awesome-icon size="2x" :icon="['far', 'question-circle']"></font-awesome-icon>
                </v-btn>
                <anti-pattern-help-component v-model="dialog" :files="files"/>
            </v-dialog>
        </v-toolbar>
        <v-content>
            <anti-patterns-container-component :sorting="sorting" :anti-patterns="antiPatterns"/>
        </v-content>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import axios from 'axios';
    import AntiPatternsContainerComponent from '../components/AntiPatternsContainerComponent';
    import AntiPatternTagsComponent from "../components/AntiPatternTagsComponent";
    import {AntiPattern} from "../common/anti-pattern";
    import {MarkdownFile} from "@/common/markdown-file";
    import Utils from "../utils/Utils";
    import {DefaultSidebar, Sidebar} from "../common/sidebar";
    import Cite from 'citation-js';
    import {BibliographyTemplate, Source} from "@/common/bibliography";
    import AntiPatternHelpComponent from "@/components/AntiPatternHelpComponent.vue";
    import EvidenceUtils from "../utils/EvidenceUtils";

    @Component({
        components: {AntiPatternHelpComponent, AntiPatternTagsComponent, AntiPatternsContainerComponent},
    })
    export default class Home extends Vue {
        private sources: Source[] = [];
        private antiPatterns: AntiPattern[] = [];
        private antiPatternsAll: AntiPattern[] = [];
        private antiPatternsSelected: AntiPattern[] = [];
        private antiPatternsFiltered: AntiPattern[] = [];
        private antiPatternsEvidence: AntiPattern[] = [];
        private searchTerm: string = "";
        private tagsModel: Sidebar = new DefaultSidebar();
        private files: MarkdownFile[] = [];
        private dialog: boolean = false;
        private sorting: string = "";
        private sortingItems = [
            {name: "name: A-Z", value: "name"},
            {name: "name: Z-A", value: "nameReverse"},
            {name: "evidence: high-low", value: "evidence"},
            {name: "evidence: low-high", value: "evidenceReverse"},
        ];

        public get slot() {
            return this.$vuetify.breakpoint.xs ? "extension" : "default";
        }

        public created() {
            this.loadMarkdownFiles();
            this.loadAntipatterns();
            this.loadCitationStyles();
        }

        public loadMarkdownFiles() {
            const fileNames = ['README', 'SLR', 'CONTRIBUTING'];
            for (const name of fileNames) {
                axios.get('/service-based-antipatterns/assets/' + name + '.md').then((response) => {
                    const position = fileNames.indexOf(name);
                    this.files.push({name, content: response.data, position} as MarkdownFile);
                }).catch(() => {
                    this.$toasted.error('Failed to load ' + name + '.md');
                });
            }
        }

        public loadAntipatterns() {
            axios.get(`/service-based-antipatterns/assets/sources.json`).then((response) => {
                response.data.sources.forEach((item: Source) => this.sources.push(item));
            }).catch(() => {
                this.$toasted.error('Failed to read sources file used for evidence');
            }).finally(() =>
                axios.get(`/service-based-antipatterns/assets/result.json`).then((response) => {
                    response.data.antiPatterns.filter((item: AntiPattern) => item.name)
                        .forEach((filledAntiPattern: AntiPattern) => {
                                this.antiPatternsAll.push(filledAntiPattern);
                                this.antiPatterns.push(filledAntiPattern);
                                this.antiPatternsFiltered.push(filledAntiPattern);
                                this.antiPatternsSelected.push(filledAntiPattern);
                                this.antiPatternsEvidence.push(filledAntiPattern);
                                Utils.setRelatedAntiPatterns(this.antiPatternsAll);
                                Utils.setEvidence(filledAntiPattern, this.sources);
                            },
                        );
                }).catch(() => {
                    this.$toasted.error('Failed to load antipatterns');
                }),
            );

        }

        public loadCitationStyles() {
            for (const template of Object.keys(BibliographyTemplate)) {
                const templateName = template.toLowerCase().replace(/_/g, '-');
                const styleUrl = 'https://raw.githubusercontent.com/citation-style-language/styles/master/' +
                    templateName + '.csl';
                // citation.js already provides templates for the following styles, so we do not need to load them again
                if (!['apa', 'harvard1', 'vancouver', 'bibtex'].includes(templateName)) {
                    axios.get(styleUrl).then((response) => {
                        const config = Cite.plugins.config.get('csl');
                        config.templates.add(templateName, response.data);
                    }).catch(() => {
                        this.$toasted.error('Failed to load citation style ' + templateName);
                    });
                }
            }
        }

        public get tags() {
            const tags = this.antiPatternsAll.filter((item) => item.tags)
                .map((item) => item.tags).reduce((previousValue, currentValue) => {
                    previousValue = previousValue ? previousValue : [];
                    currentValue = currentValue ? currentValue : [];
                    return previousValue.concat(currentValue);
                }, []);
            this.tagsModel.selection = [...new Set(tags)];
            return [...new Set(tags)];
        }

        @Watch('tagsModel.selection')
        public filterForTags(selectedModel: string[]) {
            if (selectedModel) {
                this.antiPatternsSelected = this.antiPatternsAll.filter((antiPattern) => {
                    return antiPattern.tags && antiPattern.tags.map((tag) => selectedModel.includes(tag)).includes(true);
                });
            } else {
                this.antiPatternsSelected = this.antiPatternsAll;
            }
            this.afterFilter();
        }

        @Watch('searchTerm')
        public onSearch(searchTerm: string) {
            if (searchTerm) {
                this.antiPatternsFiltered = this.antiPatternsAll.filter((item) => {
                    const name = item.name ? Utils.cleanString(item.name) : '';
                    const description = item.description ? Utils.cleanString(item.description) : '';
                    const filter = Utils.cleanString(searchTerm);
                    return name.includes(filter) || description.includes(filter);
                });
            } else {
                this.antiPatternsFiltered = this.antiPatternsAll;
            }
            this.afterFilter();
        }

        @Watch("tagsModel.evidence")
        public onSetEvidence(evidenceFilter: number, old: number) {
            if (evidenceFilter) {
                evidenceFilter = EvidenceUtils.evidenceModel[evidenceFilter][0];
                this.antiPatternsEvidence = this.antiPatternsAll
                    .filter((item) => evidenceFilter < 0 || (item.evidence && item.evidence >= evidenceFilter));
            } else {
                this.antiPatternsEvidence = this.antiPatternsAll;
            }
            this.afterFilter();
        }

        public clearSearch() {
            this.searchTerm = '';
        }

        private afterFilter() {
            this.antiPatterns = this.antiPatternsSelected
                .filter((item) => this.antiPatternsFiltered.includes(item)
                    && this.antiPatternsEvidence.includes(item));
        }
    }
</script>
