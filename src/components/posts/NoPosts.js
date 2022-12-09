import { Link } from 'react-router-dom'
import classes from './NoPosts.module.css'


const NoPosts = () => {
	return (
		<div className={classes.noposts}>
			<p>Brak postów!</p>
			<Link to='/add-new-post' className='btn'>
				Dodaj nowy post
			</Link>
		</div>
	)
}

export default NoPosts
