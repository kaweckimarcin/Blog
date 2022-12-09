import { useState } from 'react'

import PostDetail from './PostDetail'
import classes from './PostsList.module.css'

const sortPosts = (posts, ascending) => {
	return posts.sort((postA, postB) => {
		if (ascending) {
			return postA.date > postB.date ? 1 : -1
		} else {
			return postA.date < postB.date ? 1 : -1
		}
	})
}

const PostsList = props => {
	const [sort, setSort] = useState(true)
	const changeSortingHandler = () => {
		setSort(prevState => !prevState)
	}

	const sortedPosts = sortPosts(props.posts, sort)

	return (
		<>
			<button className='btn' onClick={changeSortingHandler}>
				{sort ? 'Sortuj od najnowszych' : 'Sortuj od najstarszych'}
			</button>

			<ul className={classes.list}>
				{sortedPosts.map(post => (
					<PostDetail
						key={post.id}
						id={post.id}
						title={post.title}
						date={post.date}
						text={post.text}
						author={post.author}
					/>
				))}
			</ul>
		</>
	)
}

export default PostsList
