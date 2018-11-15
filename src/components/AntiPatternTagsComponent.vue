<template>
    <v-navigation-drawer clipped app v-model="value.drawer">
        <v-toolbar dark clipped-left class="primary hidden-lg-and-up">
            <span class="title">Service-Based Antipatterns</span>
            <v-spacer></v-spacer>
            <v-toolbar-side-icon @click.native="value.drawer = !value.drawer"></v-toolbar-side-icon>
        </v-toolbar>
        <v-subheader>Tags</v-subheader>
        <v-list dense>
            <v-list-tile v-for="tag in tags" :key="tag">
                <v-list-tile-action>
                    <v-checkbox v-model="value.selection" :value="tag"></v-checkbox>
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
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {Sidebar} from "../common/sidebar";

    @Component
    export default class AntiPatternTagsComponent extends Vue {
        @Prop(Object) public value!: Sidebar;
        @Prop(Array) public tags!: string[];
    }
</script>
