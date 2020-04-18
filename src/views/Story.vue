<template>
    <div id="story-component">
        <v-card v-if="story" max-width="450" class="mx-auto">
            <v-toolbar color="indigo" dark>
                <v-toolbar-title>
                    {{ story.name }} (Page: {{ currentPageNumber }})
                </v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>

            <v-img
                :src="currentPage.image"
                aspect-ratio="1.7"
                height="600"
            ></v-img>

            <v-card-text class="content">
                {{ currentPage.content }}
            </v-card-text>

            <v-footer height="auto" color="indigo" dark>
                <template>
                    <v-layout justify-center row wrap>
                        <v-btn :disabled="!previousPageAvailable" color="blue-grey" class="ma-2 white--text" @click="gotoPreviousPage()"
                            >Previous Page
                            <v-icon right dark>mdi-left-arrow</v-icon>
                        </v-btn>
                        <v-btn :disabled="!nextPageAvailable" color="blue-grey" class="ma-2 white--text" @click="gotoNextPage()"
                            >Next Page
                            <v-icon right dark>mdi-right-arrow</v-icon>
                        </v-btn>
                    </v-layout>
                </template>
            </v-footer>
        </v-card>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    name: "Story",

    components: {},

    props: {
        storyId: {
            type: String,
            required: true
        }
    },

    created() {
        this.fetchStory({ storyId: this.storyId });
    },

    data() {
        return {
            currentPageNumber: 1,
        };
    },

    methods: {
        ...mapActions({
            fetchStory: "stories/fetchStory"
        }),

        gotoNextPage: function() {
            this.currentPageNumber++
        },

        gotoPreviousPage: function() {
            this.currentPageNumber--
        },
    },

    computed: {
        ...mapGetters({
            story: "stories/getStory"
        }),

        currentPage: function() {
            if (this.story && this.story.pages && this.story.pages.length > 0) {
                return this.story.pages[this.currentPageNumber - 1]
            } else {
                return {}
            }
        },

        nextPageAvailable: function() {
            return this.currentPageNumber < this.story.pages.length ? true : false
        },

        previousPageAvailable: function() {
            return this.currentPageNumber > 1 ? true : false
        },
    }
};
</script>

<style>
</style>
