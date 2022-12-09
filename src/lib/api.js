// import { useContext } from 'react'
// import AuthContext from '../store/auth-context'

const FIREBASE_DOMAIN = 'https://react-http-ec980-default-rtdb.europe-west1.firebasedatabase.app/'

export async function getAllPosts() {
	const response = await fetch(`${FIREBASE_DOMAIN}/posts.json`)
	const data = await response.json()

	if (!response.ok) {
		throw new Error(data.message || 'Błąd pobierania listy postów.')
	}

	const transformedPosts = []

	for (const key in data) {
		const postObj = {
			id: key,
			...data[key],
		}

		transformedPosts.push(postObj)
	}

	return transformedPosts
}

export async function getSinglePost(postId) {
	const response = await fetch(`${FIREBASE_DOMAIN}/posts/${postId}.json`)
	const data = await response.json()

	if (!response.ok) {
		throw new Error(data.message || 'Błąd pobierania posta.')
	}
	const loadedPost = {
		id: postId,
		...data,
	}

	return loadedPost
}

export async function addPost(postData) {
	const response = await fetch(`${FIREBASE_DOMAIN}/posts/.json`, {
		method: 'POST',
		body: JSON.stringify(postData),
		headers: {
			'Content-Type': 'application/json',
		},
	})
	const data = await response.json()

	if (!response.ok) {
		throw new Error(data.message || 'Błąd dodawania posta.')
	}

	return data
}

export async function addComment(requestData) {
	const response = await fetch(`${FIREBASE_DOMAIN}/comments/${requestData.postId}.json`, {
		method: 'POST',
		body: JSON.stringify(requestData.commentData),
		headers: {
			'Content-Type': 'application/json',
		},
	})
	const data = await response.json()

	if (!response.ok) {
		throw new Error(data.message || 'Błąd dodawania komentarza.')
	}

	return { commentId: data.name }
}

export async function getAllComments(postId) {
	const response = await fetch(`${FIREBASE_DOMAIN}/comments/${postId}.json`)

	const data = await response.json()

	if (!response.ok) {
		throw new Error(data.message || 'Błąd wczytywania komentarzy.')
	}

	const transformedComments = []

	for (const key in data) {
		const commentObj = {
			id: key,
			...data[key],
		}

		transformedComments.push(commentObj)
	}

	return transformedComments
}

export async function removePost(postId) {
	const response = await fetch(`${FIREBASE_DOMAIN}/posts/${postId}.json`, {
		method: 'DELETE',
		body: JSON.stringify(postId),
		headers: {
			'Content-Type': 'application/json',
		},
	})
	const data = await response.json()

	if (!response.ok) {
		throw new Error(data.message || 'Błąd przy usuwaniu posta.')
	}

	return null
}

export async function removeComments(postId) {
	const response = await fetch(`${FIREBASE_DOMAIN}/comments/${postId}.json`, {
		method: 'DELETE',
		body: JSON.stringify(postId),
		headers: {
			'Content-Type': 'application/json',
		},
	})
	const data = await response.json()

	if (!response.ok) {
		throw new Error(data.message || 'Błąd przy usuwaniu komentarzy.')
	}

	return null
}

// export async function login(loginData) {
// 	const response = await fetch(
// 		`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAPWRmMb0r-UeYJwBJ9oVkMLJrKKpT8PWA`,
// 		{
// 			method: 'POST',
// 			body: JSON.stringify({
// 				email: loginData.email,
// 				password: loginData.password,
// 				returnSecureToken: true,
// 			}),
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 		}
// 	)
// 	const data = await response.json()

// 	if (!response.ok) {
// 		throw new Error(data.message || 'Błąd logowania.')
// 	}

// 	return console.log(data)
// }
