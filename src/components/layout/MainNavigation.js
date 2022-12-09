import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import classes from './MainNavigation.module.css'

const MainNavigation = () => {
	const state = useSelector(state => state)
	const dispatch = useDispatch()
	const logoutHandler = () => {
		dispatch({ type: 'loggedOut' })
	}
	return (
		<header className={classes.header}>
			<div className={classes.logo}>Blog</div>
			<nav className={classes.nav}>
				<ul>
					<li>
						<NavLink to='/posts'>Lista postów</NavLink>
					</li>
					<li>{state && <NavLink to='/add-new-post'>Nowy post</NavLink>}</li>
					<li>
						{!state && <NavLink to='/login'>Zaloguj się</NavLink>}
						{state && (
							<NavLink onClick={logoutHandler} to='/'>
								Wyloguj
							</NavLink>
						)}
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default MainNavigation
