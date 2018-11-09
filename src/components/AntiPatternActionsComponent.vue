<template>
    <span>
        <v-tooltip top>
            <v-btn slot="activator" icon>
                <v-icon>content_copy</v-icon>
            </v-btn>
            <span>Copy the json file</span>
        </v-tooltip>
        <v-tooltip top>
            <v-btn slot="activator" icon>
                <v-icon>format_quote</v-icon>
            </v-btn>
            <span>Copy the BibTex source</span>
        </v-tooltip>
        <v-tooltip top>
            <v-btn slot="activator" icon>
                <v-icon>share</v-icon>
            </v-btn>
            <span>Copy the link to this antipattern to the clipboard</span>
        </v-tooltip>
    </span>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {AntiPattern} from '../common/anti-pattern';

    @Component
    export default class AntiPatterns extends Vue {
        @Prop(Object) antiPattern: AntiPattern;
    }
</script>
