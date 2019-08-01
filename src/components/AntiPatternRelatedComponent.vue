<template>
    <v-layout wrap>
        <v-flex md2 xs3>
            <v-subheader>Related Antipatterns</v-subheader>
        </v-flex>
        <v-flex md10 xs9>
            <v-expansion-panel inset v-model="panel">
                <v-expansion-panel-content v-for="relatedAntiPattern in relatedAntiPatterns"
                                           :key="relatedAntiPattern.name"
                                           :class="getDynamicPrimaryHeaderClass(relatedAntiPattern.name)">
                    <v-icon slot="actions" :class="getDynamicWhiteTextClass(relatedAntiPattern.name)">
                        {{$vuetify.icons.expand}}
                    </v-icon>
                    <div slot="header">
                        <v-tooltip top>
                            <v-btn :class="getDynamicWhiteTextClass(relatedAntiPattern.name)"
                                   icon class="ma-0" slot="activator"
                                   @click="openAntiPattern(relatedAntiPattern.name)">
                                <v-icon>open_in_new</v-icon>
                            </v-btn>
                            <span>Open the detail view</span>
                        </v-tooltip>
                        {{relatedAntiPattern.name}}
                        <span v-if="!isRelatedAntiPatternSelected(relatedAntiPattern.name)">
                            &#8212; {{relatedAntiPattern.relation}}
                        </span>
                    </div>
                    <v-card>
                        <v-card-text class="grow">
                            <div>{{relatedAntiPattern.description}}</div>
                        </v-card-text>
                        <v-card-text>
                            Relation: {{relatedAntiPattern.relation}}
                        </v-card-text>
                    </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
import {AntiPattern} from "@/common/anti-pattern";
import {Component, Prop, Vue} from "vue-property-decorator";
import {RawLocation} from "vue-router";
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
        return {"white--text": this.isRelatedAntiPatternSelected(name)};
    }

    public isRelatedAntiPatternSelected(name: string) {
        return this.panel === this.relatedAntiPatterns.map((antiPattern) => antiPattern.name).indexOf(name);
    }

    public openAntiPattern(antiPatternName: string) {
        this.$router.push({name: "home", query: {antipattern: antiPatternName}} as RawLocation);
        location.reload();
    }
}
</script>
