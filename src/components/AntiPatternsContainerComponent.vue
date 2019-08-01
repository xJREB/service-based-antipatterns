<template>
    <v-container fluid grid-list-lg>
        <v-layout wrap>
            <v-flex xs12 sm6 md4 lg3 lx2 v-for="antiPattern in antiPatterns" :key="antiPattern.name">
                <anti-pattern-card-component :anti-pattern="antiPattern"/>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
import AntiPatternCardComponent from "@/components/AntiPatternCardComponent.vue";
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import {AntiPattern} from "../common/anti-pattern";

@Component({
    components: {
        AntiPatternCardComponent
    }
})
export default class AntiPatternsContainerComponent extends Vue {
    @Prop(Array) public antiPatterns!: AntiPattern[];
    @Prop(String) public sorting!: string;

    @Watch("sorting")
    public onChangedSorting(sorting: string) {
        if (sorting.match("name.*")) {
            this.antiPatterns.sort((a1, a2) => a1!.name!.localeCompare(a2!.name!));
        }
        if (sorting.match("evidence.*")) {
            this.antiPatterns.sort((a1, a2) => a2!.evidence! - a1!.evidence!);
        }
        if (sorting.match(".*Reverse")) {
            this.antiPatterns.reverse();
        }
    }
}
</script>