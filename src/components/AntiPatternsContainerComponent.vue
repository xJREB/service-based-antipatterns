<template>
    <v-container fluid grid-list-lg>
        <v-layout wrap>
            <v-flex xs12 sm6 md4 lg3 lx2 v-for="antiPattern in antiPatterns" :key="antiPattern.name">
                <anti-pattern-simple-component :anti-pattern="antiPattern"/>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {AntiPattern} from '../common/anti-pattern';
    import AntiPatternSimpleComponent from "./AntiPatternSimpleComponent";

    @Component({
        components: {
            AntiPatternSimpleComponent,
        },
    })
    export default class AntiPatternsContainerComponent extends Vue {
        @Prop(Array) public antiPatterns!: AntiPattern[];
    }
</script>