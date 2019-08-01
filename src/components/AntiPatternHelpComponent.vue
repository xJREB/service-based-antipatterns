<template>
    <v-card min-width="0">
        <v-toolbar class="secondary" card dark extended>
            <font-awesome-icon size="2x" :icon="['far', 'question-circle']"></font-awesome-icon>
            <v-toolbar-title>About Service-Based Antipatterns</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-tooltip top>
                <v-btn slot="activator" icon
                       @click="closeDialog">
                    <v-icon>close</v-icon>
                </v-btn>
                <span>Close the dialog</span>
            </v-tooltip>
            <v-tabs color="transparent" slot="extension" fixed-tabs v-model="tab">
                <v-tab v-for="file in sortedFiles" :key="file.name">
                    {{file.name}}
                </v-tab>
            </v-tabs>
        </v-toolbar>

        <v-card-text>
            <v-tabs-items v-model="tab">
                <v-tab-item v-for="file in sortedFiles" :key="file.content">
                    <v-card flat>
                        <v-card-text>
                            <vue-markdown>{{file.content}}</vue-markdown>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import {MarkdownFile} from "@/common/markdown-file";
import Utils from "@/utils/Utils";
import {Component, Emit, Prop, Vue} from "vue-property-decorator";

@Component
export default class AntiPatternDetailComponent extends Vue {
    @Prop(Array) public files!: MarkdownFile[];
    private tab: number = 0;

    public get sortedFiles() {
        return this.files.sort(Utils.sortMarkdownFiles);
    }

    @Emit("input")
    public closeDialog() {
        return false;
    }
}
</script>
<style>
    .help-dialog {
        height: 100%;
    }
</style>
