import { useEffect } from 'react'
import { useParams, Route, Link } from 'react-router-dom'
import Comments from '../components/comments/Comments'
import HighlightedPost from '../components/posts/HighlightedPost'
import NoPosts from '../components/posts/NoPosts'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import useHttp from '../hooks/use-http'
import { getSinglePost } from '../lib/api'

const Post = () => {
	const params = useParams()
	const { sendRequest, status, data: loadedPost, error } = useHttp(getSinglePost, true)
	const { postId } = params

	useEffect(() => {
		sendRequest(postId)
	}, [sendRequest, postId])

	if (status === 'pending') {
		return (
			<div className='centered'>
				<LoadingSpinner />
			</div>
		)
	}

	if (error) {
		return <p className='centered'>{error}</p>
	}

	if (!loadedPost) {
		return <NoPosts />
	}

	return (
		<>
			<HighlightedPost
				id={loadedPost.id}
				title={loadedPost.title}
				date={loadedPost.date}
				text={loadedPost.text}
				author={loadedPost.author}
			/>
			<Route path={`/posts/${params.postId}`} exact>
				<div className='centered'>
					<Link className='btn' to={`/posts/${params.postId}/comments`}>
						Komentarze
					</Link>
				</div>
			</Route>

			<Route path={`/posts/${params.postId}/comments`}>
				<Comments postId={loadedPost.id} />
			</Route>
		</>
	)
}

export default Post
