import {createDialog} from "./customdialogs.js";

// local storage items:
// nextID: next id to use for new post
// posts: array of post objects

window.addEventListener("DOMContentLoaded", init);

function init () {
	if (!getAllPosts()) {
		localStorage.setItem("nextPostID", 3);
		saveAllPosts([
			{
				id: 0,
				title: "My First Blog Post",
				date: "2023/2/24",
				summary: "A sample first post"
			},
			{
				id: 1,
				title: "My Second Blog Post",
				date: "2023/2/25",
				summary: "A sample second post"
			},
			{
				id: 2,
				title: "My Third Blog Post",
				date: "2023/2/26",
				summary: "A sample third post"
			}
		]);
	}
	populatePosts();
	document.querySelector("#add-post").addEventListener("click", handleAddPost);
}

function populatePosts () {
	let container = document.querySelector("#posts");
	container.innerHTML = "";
	let posts = getAllPosts();
	posts.forEach((element) => {
		let post = document.createElement("li");
		post.id = element.id;
		post.innerHTML = `
			<h2>Post: ${element.title}</h2>
			<date>Date: ${element.date}</date>
			<p>Summary: ${element.summary}</p>
			<div class="btn-group">
				<img class="edit" src="images/edit.svg" width="32px">
				<img class="delete" src="images/delete.svg" width="32px">
			</div>	
		`;
		post.querySelector(".edit").addEventListener("click", handleEditPost.bind(post));
		post.querySelector(".delete").addEventListener("click", handleDeletePost.bind(post));
		container.append(post)
	});
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
	let index = null;
	let posts = getAllPosts();
	for (let i = 0; i < posts.length; i++) {
		if (posts[i].id === id) {
			index = i;
			break;
		}
	}
	if (index != null) {
		posts[index] = post;
		saveAllPosts(posts);
		return true;
	}
	return false;
}

function deletePost (id) {
	let index = null;
	let posts = getAllPosts();
	for (let i = 0; i < posts.length; i++) {
		if (posts[i].id === id) {
			index = i;
			break;
		}
	}
	if (index != null) {
		posts.splice(index, 1);
		saveAllPosts(posts);
		return true;
	}
	return false;
}

function getNextID () {
	let nextID = parseInt(localStorage.getItem("nextPostID"));
	localStorage.setItem("nextPostID", nextID+1);
	return nextID;
}

function handleAddPost () {
	createDialog("#blog-template", "Create A Post", (result, form) => {
		if (result) {
			addPost({
				title: form.get("title"),
				date: form.get("date"),
				summary: form.get("summary")
			});
			populatePosts();
		}
	});
}

function handleEditPost () { // this bound to element, this.id should be clicked post id
	createDialog("#blog-template", "Edit Post", (result, form) => {
		if (result) {
			updatePost(parseInt(this.id), {
				title: form.get("title"),
				date: form.get("date"),
				summary: form.get("summary")
			});
			populatePosts();
		}
	})
}

function handleDeletePost () {
	createDialog("#confirm-template", "Delete Post", (result, form) => {
		if (result) {
			deletePost(parseInt(this.id));
			populatePosts();
		}
	})
}