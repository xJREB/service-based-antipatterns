<template>
  <v-layout wrap>
    <v-flex
      md2
      xs3
    >
      <v-subheader>Related Antipatterns</v-subheader>
    </v-flex>
    <v-flex
      md10
      xs9
    >
      <v-expansion-panels v-model="panel">
        <v-expansion-panel
          v-for="relatedAntiPattern in relatedAntiPatterns"
          :key="relatedAntiPattern.name"
        >
          <v-expansion-panel-header :class="getDynamicPrimaryHeaderClass(relatedAntiPattern.name)">
            <div>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    :class="getDynamicWhiteTextClass(relatedAntiPattern.name)"
                    icon
                    v-on="on"
                    @click="openAntiPattern(relatedAntiPattern.name)"
                  >
                    <v-icon>open_in_new</v-icon>
                  </v-btn>
                </template>
                <span>Open the detail view</span>
              </v-tooltip>

              {{relatedAntiPattern.name}}

              <span v-if="!isRelatedAntiPatternSelected(relatedAntiPattern.name)">
                &#8212; {{relatedAntiPattern.relation}}
              </span>

              <v-icon
                slot="actions"
                :class="getDynamicWhiteTextClass(relatedAntiPattern.name)"
              >
                {{$vuetify.icons.expand}}
              </v-icon>
            </div>
          </v-expansion-panel-header>
          <v-expansion-panel-content style="padding-top: 20px;">
            <p>{{relatedAntiPattern.description}}</p>
            <p>Relation: {{relatedAntiPattern.relation}}</p>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { AntiPattern } from "@/common/anti-pattern";
import { Component, Prop, Vue } from "vue-property-decorator";
import { RawLocation } from "vue-router";
import AntiPatternActionsComponent from "./AntiPatternActionsComponent";
import AntiPatternCitationsComponent from "./AntiPatternCitationsComponent.vue";

@Component({
  components: {
    AntiPatternCitationsComponent,
    AntiPatternActionsComponent
  }
})
export default class AntiPatternRelatedComponent extends Vue {
  @Prop(Array) public relatedAntiPatterns!: AntiPattern[];
  private panel: number | null = null;

  public getDynamicPrimaryHeaderClass(name: string) {
    return {
      "primary": this.isRelatedAntiPatternSelected(name),
      "white--text": this.isRelatedAntiPatternSelected(name)
    };
  }

  public getDynamicWhiteTextClass(name: string) {
    return { "white--text": this.isRelatedAntiPatternSelected(name) };
  }

  public isRelatedAntiPatternSelected(name: string) {
    return (
      this.panel ===
      this.relatedAntiPatterns
        .map(antiPattern => antiPattern.name)
        .indexOf(name)
    );
  }

  public openAntiPattern(antiPatternName: string) {
    this.$router.push({
      name: "home",
      query: { antipattern: antiPatternName }
    } as RawLocation);
    location.reload();
  }
}
</script>

<style>
.test {
  background-color: blue;
}
</style>
