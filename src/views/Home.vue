<template>
    <div class="home">
        <v-navigation-drawer
                fixed
                clipped
                app
                v-model="drawer"
        >
            <v-list
                    dense
            >
                <template v-for="(item, i) in items">
                    <v-layout
                            row
                            v-if="item.heading"
                            align-center
                            :key="i"
                    >
                        <v-flex xs6>
                            <v-subheader v-if="item.heading">
                                {{ item.heading }}
                            </v-subheader>
                        </v-flex>
                        <v-flex xs6 class="text-xs-right">
                            <v-btn small flat>edit</v-btn>
                        </v-flex>
                    </v-layout>
                    <v-divider
                            dark
                            v-else-if="item.divider"
                            class="my-3"
                            :key="i"
                    ></v-divider>
                    <v-list-tile
                            :key="i"
                            v-else
                            @click=""
                    >
                        <v-list-tile-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>
                                {{ item.text }}
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar class="primary" dark clipped-left>
            <v-toolbar-side-icon @click.native="drawer = !drawer"></v-toolbar-side-icon>
            <span class="title ml-3 mr-5">Service-Based Antipatterns</span>
            <v-text-field
                    solo-inverted
                    flat
                    label="Search"
                    prepend-icon="search"
            ></v-text-field>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-content>
            <v-container fluid fill-height class="grey lighten-4">
                <anti-patterns/>
            </v-container>
        </v-content>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import AntiPatterns from '@/components/AntiPatterns';

    @Component({
        components: {AntiPatterns},
    })
    export default class Home extends Vue {
        public data() {
            return {
                drawer: null,
                items: [
                     {icon: 'lightbulb_outline', text: 'Tags'},
                    {divider: true},
                    {icon: 'device_hub', text: 'Github'},
                    {icon: 'help', text: 'Help'},
                ],
            };
        }
    }
</script>
