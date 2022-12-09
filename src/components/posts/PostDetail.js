import { Link } from 'react-router-dom'

import classes from './PostDetail.module.css'

const PostDetail = props => {
	return (
		<li className={classes.item}>
			<div className={classes.post}>
				<h3 className={classes.title}>{props.title}</h3>
				<p className={classes.italic}>{props.date}</p>
				<p className={classes.postText}>
					{props.text.slice(0, 200)} {props.text.length > 200 ? '(...)' : ''}
				</p>

				<p className={classes.italic}>{props.author}</p>
			</div>
			<Link className='btn' to={`/posts/${props.id}`}>
				Czytaj całość
			</Link>
		</li>
	)
}

export default PostDetail
