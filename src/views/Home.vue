<template>
    <div class="home">
        <anti-pattern-tags-component v-model="selectedTags" :tags="tags"/>
        <v-toolbar class="primary" app dark clipped-left>
            <span class="title ml-3 mr-5">Service-Based Antipatterns</span>
            <v-text-field
                    solo-inverted
                    flat
                    clearable
                    hide-details
                    label="Search"
                    prepend-inner-icon="search"
                    v-model="searchTerm"
                    @keydown.esc="clearSearch()"
            ></v-text-field>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-content>
            <anti-patterns-container-component :anti-patterns="antiPatterns"/>
        </v-content>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import axios from 'axios';
    import AntiPatternsContainerComponent from '../components/AntiPatternsContainerComponent';
    import AntiPatternTagsComponent from "../components/AntiPatternTagsComponent";
    import {AntiPattern} from "../common/anti-pattern";
    import Utils from "../utils/Utils";

    @Component({
        components: {AntiPatternTagsComponent, AntiPatternsContainerComponent},
    })
    export default class Home extends Vue {
        private antiPatterns: AntiPattern[] = [];
        private antiPatternsAll: AntiPattern[] = [];
        private antiPatternsSelected: AntiPattern[] = [];
        private antiPatternsFiltered: AntiPattern[] = [];
        private selectedTags: string[] = [];
        private searchTerm: string = "";

        public created() {
            axios.get(`/service-based-antipatterns/assets/result.json`).then((response) => {
                this.antiPatternsAll = response.data.antiPatterns.filter((item) => item.name);
                this.antiPatterns = this.antiPatternsAll;
                this.antiPatternsFiltered = this.antiPatternsAll;
                this.antiPatternsSelected = this.antiPatternsAll;
            }).catch();
        }

        public get tags() {
            const tags = this.antiPatternsAll.
                filter((item) => item.tags).
                map((item) => item.tags).
                reduce((previousValue, currentValue) => {
                    previousValue = previousValue ? previousValue : [];
                    currentValue = currentValue ? currentValue : [];
                    return previousValue.concat(currentValue);
                }, []);
            this.selectedTags = [...new Set(tags)];
            return [...new Set(tags)];
        }

        @Watch('selectedTags')
        public filterForTags(selectedModel: string[]) {
            if (selectedModel) {
                this.antiPatternsSelected = this.antiPatternsAll.filter((antiPattern) => {
                    return antiPattern.tags && antiPattern.tags.map((tag) => selectedModel.includes(tag)).includes(true);
                });
            } else {
                this.antiPatternsSelected = this.antiPatternsAll;
            }
            this.antiPatterns = this.antiPatternsSelected.filter((item) => this.antiPatternsFiltered.includes(item));
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
            this.antiPatterns = this.antiPatternsSelected.filter((item) => this.antiPatternsFiltered.includes(item));
        }

        public clearSearch() {
            this.searchTerm = '';
        }
    }
</script>
