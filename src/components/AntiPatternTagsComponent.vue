<template>
    <v-navigation-drawer clipped app v-model="value.drawer">
        <v-app-bar dark clipped-left class="primary hidden-lg-and-up">
            <span class="title">Service-Based Antipatterns</span>
            <v-spacer></v-spacer>
            <v-app-bar-nav-icon @click.native="value.drawer = !value.drawer"></v-app-bar-nav-icon>
        </v-app-bar>
        <v-card-text>
            <v-icon>info</v-icon>
            This website serves as a knowledge base for Service-Based Antipatterns
            and has been created in a research project at the University of Stuttgart.
        </v-card-text>
        <v-list dense>
            <v-subheader>Architectural Style</v-subheader>
            <v-list-item v-for="tag in filterContext" :key="tag">
                <v-list-item-action>
                    <v-checkbox v-model="value.tags.selectionContext" :value="tag"></v-checkbox>
                </v-list-item-action>

                <v-list-item-content>
                    <v-chip label>
                        <v-icon left>label</v-icon>
                        <v-list-item-title>{{ tag }}</v-list-item-title>
                    </v-chip>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        <v-list dense>
            <v-subheader>Category</v-subheader>
            <v-list-item v-for="tag in filterCategories" :key="tag">
                <v-list-item-action>
                    <v-checkbox v-model="value.tags.selectionCategory" :value="tag"></v-checkbox>
                </v-list-item-action>

                <v-list-item-content>
                    <v-chip label>
                        <v-icon left>label</v-icon>
                        <v-list-item-title>{{ tag }}</v-list-item-title>
                    </v-chip>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        <v-list dense>
            <v-subheader>Tags</v-subheader>
            <v-list-item>
                <v-list-item-action>
                    <v-checkbox v-model="allTagsEnabled" @change="toggleTags"></v-checkbox>
                </v-list-item-action>
                <v-list-item-content>
                    <v-chip label>
                        <v-icon left>label</v-icon>
                        <v-list-item-title>All</v-list-item-title>
                    </v-chip>
                </v-list-item-content>
            </v-list-item>
            <v-list-item v-for="tag in otherTags" :key="tag">
                <v-list-item-action>
                    <v-checkbox v-model="value.tags.selection" :value="tag"></v-checkbox>
                </v-list-item-action>

                <v-list-item-content>
                    <v-chip label>
                        <v-icon left>label</v-icon>
                        <v-list-item-title>{{ tag }}</v-list-item-title>
                    </v-chip>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        <v-subheader>Evidence</v-subheader>
        <v-slider
                v-model="value.evidence"
                :tick-labels="ticksLabels"
                :max="3"
                step="1"
                always-dirty
                tick-size="2"
        ></v-slider>
    </v-navigation-drawer>
</template>

<script lang="ts">
import EvidenceUtils from "@/utils/EvidenceUtils";
import Utils from "@/utils/Utils";
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import {Sidebar} from "../common/sidebar";

@Component
export default class AntiPatternTagsComponent extends Vue {
    @Prop(Object) public value!: Sidebar;
    @Prop(Array) public tags!: string[];
    private allTagsEnabled: boolean = false;
    private ticksLabels = EvidenceUtils.evidenceLabels;

    @Watch("value.tags.selection")
    private selectionChange() {
        this.allTagsEnabled = this.value.tags.selection.length === this.tags.length;
    }

    private toggleTags() {
        if (!this.allTagsEnabled) {
            this.value.tags.selection = [];
        } else {
            this.value.tags.selection = this.otherTags;
        }
    }

    private get filterContext() {
        return this.tags.filter((tag) => Utils.context.includes(tag)).sort().reverse();
    }

    private get filterCategories() {
        return this.tags.filter((tag) => Utils.category.includes(tag)).sort().reverse();
    }

    private get otherTags() {
        return this.tags.filter((tag) => !this.filterContext.includes(tag)
            && !this.filterCategories.includes(tag)).sort();
    }
}
</script>
<style lang="sass">
    @import "../colors"
    .v-slider
        margin-left: 10px
        margin-right: 10px
        height: 15px
        background-image: linear-gradient(to right, gray 2%, rgba($secondary, 0.15) 2%, rgba($secondary, 0.5) 33%, rgba($secondary, 0.8) 66%, rgba($secondary, 1) 99%)
        font-size: 13px
</style>
