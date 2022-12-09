import classes from './HighlightedPost.module.css'
import useHttp from '../../hooks/use-http'
import { removeComments, removePost } from '../../lib/api'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const HighlightedPost = props => {
	const state = useSelector(state => state)
	const { sendRequest: removeCommentsRequest, status: removeCommentsStatus } = useHttp(removeComments)
	const { sendRequest: removePostRequest, status: removePostStatus } = useHttp(removePost)

	const history = useHistory()

	const deletePostHandler = () => {
		removePostRequest(props.id)
		removeCommentsRequest(props.id)
	}

	useEffect(() => {
		if (removePostStatus === 'completed' && removeCommentsStatus === 'completed') {
			history.push('/posts')
		}
	}, [removePostStatus, removeCommentsStatus, history])

	return (
		<figure className={classes.post}>
			<h3>{props.title}</h3>
			<p className={classes.italic}>{props.date}</p>
			<p>{props.text}</p>
			<p className={classes.italic}>{props.author}</p>
			{state && (
				<button className='btn centered' onClick={deletePostHandler}>
					Usuń post
				</button>
			)}
		</figure>
	)
}

export default HighlightedPost
