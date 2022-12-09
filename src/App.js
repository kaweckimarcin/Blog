import { Switch, Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Layout from './components/layout/Layout'
import NewPost from './pages/NewPost'
import Post from './pages/Post'
import AllPosts from './pages/AllPosts'
import NotFound from './pages/NotFound'
import Login from './pages/Login'

function App() {
	const state = useSelector(state => state)
	return (
		<Layout>
			<Switch>
				<Route path='/' exact>
					<Redirect to='/posts' />
				</Route>
				<Route path='/posts' exact>
					<AllPosts />
				</Route>
				<Route path='/posts/:postId'>
					<Post />
				</Route>
				<Route path='/add-new-post'>
					{!state && <Redirect to='/' />}
					{state && <NewPost />}
				</Route>
				<Route path='/login'>
					<Login />
				</Route>
				<Route path='*'>
					<NotFound />
				</Route>
			</Switch>
		</Layout>
	)
}

export default App
