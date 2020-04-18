<template>
    <div>
        <v-card max-width="450" class="mx-auto">
            <v-toolbar color="indigo" dark>
                <v-toolbar-title>Stories</v-toolbar-title>
                <v-spacer />
            </v-toolbar>

            <v-list two-line subheader>
                <v-list-item
                    v-for="story in stories"
                    :key="story.id"
                    @click="selectStory(story.id)"
                >
                    <v-list-item-content>
                        <v-list-item-title
                            v-text="story.name"
                        ></v-list-item-title>
                        <v-list-item-subtitle>
                            {{ story.createdAt | formatDateTime }}
                        </v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                        <v-btn icon>
                            <v-icon color="grey lighten-1"
                                >mdi-information</v-icon
                            >
                        </v-btn>
                    </v-list-item-action>
                </v-list-item>
            </v-list>

            <v-footer height="auto" color="indigo" dark>
                <v-layout justify-center row wrap>
                </v-layout>
            </v-footer>
        </v-card>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    name: "Stories",

    components: {
    },

    created() {
        this.fetchStories({userEmail: this.userEmail});
    },

    data() {
        return {
        };
    },

    methods: {
        ...mapActions({
            fetchStories:
                "stories/fetchStories",
            addStory: "stories/addStory",
        }),

        selectStory: function(id) {
            this.$router.push({
                path: "story/" + id
            });
        },
    },

    computed: {
        ...mapGetters({
            stories: "stories/getStories",
            story: "stories/getStory",
        })
    }
};
</script>

<style scoped>

</style>