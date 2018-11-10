<template>
    <v-navigation-drawer permanent clipped app>
        <v-toolbar flat>
            <v-list>
                <v-list-tile>
                    <v-list-tile-title class="title">Tags</v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-toolbar>

        <v-divider></v-divider>

        <v-list dense>
            <v-list-tile v-for="tag in tags" :key="tag">
                <v-list-tile-action>
                    <v-checkbox v-model="selectedTags" @change="selectionChanged" :value="tag"></v-checkbox>
                </v-list-tile-action>

                <v-list-tile-content>
                    <v-chip label>
                        <v-icon left>label</v-icon>
                        <v-list-tile-title>{{ tag }}</v-list-tile-title>
                    </v-chip>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
    import {Component, Emit, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class AntiPatternTagsComponent extends Vue {
        @Prop(Array) public value!: string[];
        @Prop(Array) public tags!: string[];
        private selection!: string[];

        public get selectedTags() {
            return this.value;
        }

        public set selectedTags(value: string[]) {
            this.selection = value;
        }

        @Emit('input')
        public selectionChanged() {
            return this.selection;
        }

    }
</script>
