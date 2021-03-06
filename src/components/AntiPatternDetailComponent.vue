<template>
  <v-card min-width="0">
    <v-toolbar class="primary darken1" flat dark>
      <v-toolbar-title>{{ antiPattern.name }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <anti-pattern-actions-component :anti-pattern="antiPattern" />
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon @click="closeDialog">
            <v-icon>close</v-icon>
          </v-btn>
        </template>
        <span>Close the dialog</span>
      </v-tooltip>
    </v-toolbar>
    <v-card-text style="padding: 0;">
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex md2 xs3>
            <v-subheader>Also known as</v-subheader>
          </v-flex>
          <v-flex md10 xs9>
            <v-card-text>{{ antiPattern.aliases.join(", ") }}</v-card-text>
          </v-flex>
          <v-flex md2 xs3>
            <v-subheader>Description</v-subheader>
          </v-flex>
          <v-flex md10 xs9>
            <v-card-text>{{ antiPattern.description }}</v-card-text>
          </v-flex>
          <v-flex md2 xs3>
            <v-subheader>Context</v-subheader>
          </v-flex>
          <v-flex md10 xs9>
            <v-card-text>{{ antiPattern.context }}</v-card-text>
          </v-flex>
          <v-flex md2 xs3>
            <v-subheader>Cause</v-subheader>
          </v-flex>
          <v-flex md10 xs9>
            <v-card-text>{{ antiPattern.cause }}</v-card-text>
          </v-flex>
          <v-flex md2 xs3>
            <v-subheader>Detection</v-subheader>
          </v-flex>
          <v-flex md10 xs9>
            <v-card-text>{{ antiPattern.detection }}</v-card-text>
          </v-flex>
          <v-flex md2 xs3>
            <v-subheader>Solution</v-subheader>
          </v-flex>
          <v-flex md10 xs9>
            <v-card-text>{{ antiPattern.solution }}</v-card-text>
          </v-flex>
          <v-flex md2 xs3>
            <v-subheader>Example</v-subheader>
          </v-flex>
          <v-flex md10 xs9>
            <v-card-text>{{ antiPattern.example }}</v-card-text>
          </v-flex>
          <v-flex md2 xs3>
            <v-subheader>Evidence</v-subheader>
          </v-flex>
          <v-flex md10 xs9>
            <v-card-text
              v-bind:style="{
                background:
                  'linear-gradient(90deg, ' +
                  referenceEvidenceColor +
                  ' 0%, white 10%) !important',
              }"
            >
              {{ referenceEvidenceLabel }}
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-card-text>
          <anti-pattern-citations-component :sources="antiPattern.sources" />
        </v-card-text>

        <v-divider
          class="my-2"
          v-if="antiPattern.relatedAntiPatterns"
        ></v-divider>
        <anti-pattern-related-component
          v-if="antiPattern.relatedAntiPatterns"
          :relatedAntiPatterns="antiPattern.relatedAntiPatterns"
        />

        <v-divider class="my-2"></v-divider>
        <v-chip
          label
          v-for="tag in antiPattern.tags"
          :key="tag"
          style="margin-right: 5px;"
        >
          <v-icon left>label</v-icon>
          <v-list-item-title>{{ tag }}</v-list-item-title>
        </v-chip>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { AntiPattern } from "@/common/anti-pattern";
import AntiPatternRelatedComponent from "@/components/AntiPatternRelatedComponent.vue";
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import EvidenceUtils from "../utils/EvidenceUtils";
import AntiPatternActionsComponent from "./AntiPatternActionsComponent";
import AntiPatternCitationsComponent from "./AntiPatternCitationsComponent.vue";

@Component({
  components: {
    AntiPatternRelatedComponent,
    AntiPatternCitationsComponent,
    AntiPatternActionsComponent
  }
})
export default class AntiPatternDetailComponent extends Vue {
  @Prop(Object) public antiPattern!: AntiPattern;

  @Emit("input")
  public closeDialog() {
    return false;
  }

  public get referenceEvidenceColor(): string {
    return EvidenceUtils.getReferenceEvidenceColor(
      this.antiPattern,
      this.$vuetify.theme.themes.light.secondary!.toString()
    );
  }

  public get referenceEvidenceLabel(): string {
    return EvidenceUtils.getReferenceEvidenceLabel(this.antiPattern);
  }
}
</script>
