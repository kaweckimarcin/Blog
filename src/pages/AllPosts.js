import { useEffect } from 'react'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import NoPosts from '../components/posts/NoPosts'
import PostsList from '../components/posts/PostsList'
import useHttp from '../hooks/use-http'
import { getAllPosts } from '../lib/api'

const AllPosts = () => {
	const { sendRequest, status, data: loadedPosts, error } = useHttp(getAllPosts, true)

	useEffect(() => {
		sendRequest()
	}, [sendRequest])

	if (status === 'pending') {
		return (
			<div className='centered'>
				<LoadingSpinner />
			</div>
		)
	}
	if (error) {
		return <p className='centered focused'>{error}</p>
	}
	if (status === 'completed' && (!loadedPosts || loadedPosts.length === 0)) {
		return <NoPosts />
	}

	return <PostsList posts={loadedPosts} />
}

export default AllPosts
