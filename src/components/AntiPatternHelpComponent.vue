<template>
  <v-card min-width="0">
    <v-toolbar
      class="secondary"
      flat
      dark
      style="max-height: 112px;"
    >
      <font-awesome-icon
        size="2x"
        :icon="['far', 'question-circle']"
      ></font-awesome-icon>
      <v-toolbar-title style="margin-left: 15px;">About Service-Based Antipatterns</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            icon
            @click="closeDialog"
          >
            <v-icon>close</v-icon>
          </v-btn>
        </template>
        <span>Close the dialog</span>
      </v-tooltip>
      <template v-slot:extension>
        <v-tabs v-model="tab">
          <v-tab
            v-for="file in sortedFiles"
            :key="file.name"
          >
            {{file.name}}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-card-text>
      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="file in sortedFiles"
          :key="file.content"
        >
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
import { MarkdownFile } from "@/common/markdown-file";
import Utils from "@/utils/Utils";
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

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
