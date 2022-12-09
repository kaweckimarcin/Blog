import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import useHttp from '../hooks/use-http'
import { addPost } from '../lib/api'

import AddNewPost from '../components/posts/AddNewPost'

const NewPost = () => {
	const history = useHistory()
	const { sendRequest, status } = useHttp(addPost)
	const addPostHandler = postData => {
		sendRequest(postData)
	}
	useEffect(() => {
		if (status === 'completed') {
			history.push('/posts')
		}
	}, [status, history])

	return <AddNewPost isLoading={status === 'pending'} onAddPost={addPostHandler} />
}

export default NewPost
