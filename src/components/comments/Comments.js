import { useState, useEffect, useCallback } from 'react'
import useHttp from '../../hooks/use-http'
import { getAllComments } from '../../lib/api'
import LoadingSpinner from '../UI/LoadingSpinner'

import classes from './Comments.module.css'
import NewCommentForm from './NewCommentForm'
import CommentsList from './CommentsList'

const Comments = props => {
	const [isAddingComment, setIsAddingComment] = useState(false)
	// const params = useParams()

	const { sendRequest, status, data: loadedComments } = useHttp(getAllComments)
	// const { postId } = params
	const postId = props.postId

	useEffect(() => {
		sendRequest(postId)
	}, [sendRequest, postId])

	const startAddCommentHandler = () => {
		setIsAddingComment(true)
	}

	const addedCommentHandler = useCallback(() => {
		sendRequest(postId)
		setIsAddingComment(false)
	}, [sendRequest, postId])
	let comments

	if (status === 'pending') {
		comments = (
			<div className='centered'>
				<LoadingSpinner />
			</div>
		)
	}
	if (status === 'completed' && loadedComments && loadedComments.length > 0) {
		comments = <CommentsList comments={loadedComments} />
	}
	if (status === 'completed' && (!loadedComments || loadedComments.length === 0)) {
		comments = <p className='centered'>Brak komentarzy</p>
	}

	return (
		<section className={classes.comments}>
			<h2>Komentarze</h2>
			{!isAddingComment && (
				<button className='btn' onClick={startAddCommentHandler}>
					Dodaj komentarz
				</button>
			)}
			{isAddingComment && <NewCommentForm postId={postId} onAddedComment={addedCommentHandler} />}
			{comments}
		</section>
	)
}

export default Comments
