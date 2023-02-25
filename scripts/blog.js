import {createDialog} from "./customdialogs.js";

// local storage items:
// nextID: next id to use for new post
// posts: array of post objects

window.addEventListener("DOMContentLoaded", init);

function init () {
	populatePosts();
}

function populatePosts () {
	let container = document.querySelector("#posts");
}

function addPost (post) {
	post.id = getNextID();
	let posts = getAllPosts();
	posts.push(post);
	saveAllPosts(posts);
}

function getPost (id) {
	let posts = getAllPosts();
	posts.forEach((element) => {
		if (element.id === id) {
			return element;
		}
	});
	return null;
}

function getAllPosts () {
	return JSON.parse(localStorage.getItem("posts"));
}

function saveAllPosts (posts) {
	localStorage.setItem("posts", JSON.stringify(posts));
}

function updatePost (id, post) {
	post.id = id;
	let found = false;
	let posts = getAllPosts();
	posts.forEach((element) => {
		if (element.id === id) {
			element = post;
			found = true;
		}
	});
	if (found) {
		saveAllPosts(posts);
	}
	return found;
}

function deletePost (id) {
	let index = null;
	let posts = getAllPosts();
	for (let i = 0; i < posts.length; i++) {
		if (element.id === id) {
			index = i;
			break;
		}
	}
	if (index) {
		posts.splice(index, 1);
		saveAllPosts(posts);
	}
	return false;
}

function getNextID () {
	let nextID = parseInt(localStorage.getItem("nextPostID"));
	localStorage.setItem("nextPostID", nextID++);
	return nextID;
}

export function handleAddPost () {

}