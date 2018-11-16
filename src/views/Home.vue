<template>
    <div class="home">
        <anti-pattern-tags-component v-model="tagsModel" :tags="tags"/>
        <v-toolbar class="primary" app dark clipped-left>
            <v-toolbar-side-icon @click.native="tagsModel.drawer = !tagsModel.drawer"></v-toolbar-side-icon>
            <span class="title ml-3 hidden-md-and-down">Service-Based Antipatterns</span>
            <v-text-field
                    class="ml-3"
                    solo-inverted
                    flat
                    clearable
                    hide-details
                    label="Search"
                    prepend-inner-icon="search"
                    v-model="searchTerm"
                    @keydown.esc="clearSearch()"
            ></v-text-field>
            <v-spacer class="hidden-md-and-down" ></v-spacer>
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
    import {DefaultSidebar, Sidebar} from "../common/sidebar";

    @Component({
        components: {AntiPatternTagsComponent, AntiPatternsContainerComponent},
    })
    export default class Home extends Vue {
        private antiPatterns: AntiPattern[] = [];
        private antiPatternsAll: AntiPattern[] = [];
        private antiPatternsSelected: AntiPattern[] = [];
        private antiPatternsFiltered: AntiPattern[] = [];
        private searchTerm: string = "";
        private tagsModel: Sidebar = new DefaultSidebar();

        public created() {
            axios.get(`/service-based-antipatterns/assets/result.json`).then((response) => {
                this.antiPatternsAll = response.data.antiPatterns.filter((item: AntiPattern) => item.name);
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
