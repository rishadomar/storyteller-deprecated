import firebase from "firebase";

const state = {
	stories: [],
	currentStoryId: null
}

const mutations = {
	ADD_STORY(state, payload) {
		state.stories.push(payload);
		state.currentStoryId = payload.id
	},
}

const actions = {
	async fetchStory(context, params) {
		if (state.stories.find(story => story.id === params.storyId)) {
			return new Promise((success) => { success([]) })
		}
		let storage = firebase.storage()
		let db = firebase.firestore()
		var documentReference = db.collection("stories").doc(params.storyId);
		let story = {};
		return documentReference.get()
			.then(document => {
				story = document.data()
				story.id = document.id
			})
			.then(async () => {
				const querySnapshot = await db.collection("stories").doc(params.storyId).collection("pages")
					.get();
				let pages = [];
				querySnapshot.forEach(function (doc) {
					let data = doc.data()
					var gsReference = storage.refFromURL(data.audio)
					gsReference.getDownloadURL()
						.then(function (url) {
							pages.push({
								id: doc.id,
								content: data.content,
								number: parseInt(data.number),
								audio: data.audio,
								image: url
							})
						})
						.catch(function (error) {
							alert('Error encountered finding image: ' + data.audio + ' Error:' + error.code)
						})
				})
				story.pages = pages
				context.commit('ADD_STORY', story);
			})
			.catch(function (error) {
				if (error.response) {
					alert(error.response.data.message);
				}
			});
	},
}

const getters = {
	getStories(state) {
		return state.stories;
	},
	getStory(state) {
		var story = state.stories.find(story => story.id === state.currentStoryId)
		return story
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}
