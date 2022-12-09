import { useRef, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
// import useHttp from '../../hooks/use-http'
// import { login } from '../../lib/api'

import classes from './AuthForm.module.css'

const AuthForm = () => {
	const emailInputRef = useRef()
	const passwordInputRef = useRef()
	const state = useSelector(state => state)
	const [isLogin, setIsLogin] = useState(state)
	const dispatch = useDispatch()
	const history = useHistory()
	let enteredEmail
	let enteredPassword
	async function login(loginData) {
		const response = await fetch(
			`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAPWRmMb0r-UeYJwBJ9oVkMLJrKKpT8PWA`,
			{
				method: 'POST',
				body: JSON.stringify({
					email: loginData.email,
					password: loginData.password,
					returnSecureToken: true,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
		const data = await response.json()

		if (!response.ok) {
			setIsLogin(false)
			throw new Error(data.message || 'Błąd logowania.')
		}
		if (data.registered === true) {
			return setIsLogin(true)
		}
	}

	useEffect(() => {
		if (isLogin === true) {
			dispatch({ type: 'loggedIn' })
			history.push('/posts')
		} else if (isLogin === false) {
			alert('Błędne dane logowania')
		}
	}, [dispatch, isLogin, history])

	const submitHandler = event => {
		event.preventDefault()
		enteredEmail = emailInputRef.current.value
		enteredPassword = passwordInputRef.current.value

		if (enteredEmail === '') {
			alert('Wpisz e-mail!')
			return
		}
		if (!enteredEmail.includes('@')) {
			alert('Niepoprawny format e-mail!')
			return
		}
		if (enteredPassword === '') {
			alert('Wpisz hasło!')
			return
		}
		const loginData = {
			email: enteredEmail,
			password: enteredPassword,
		}
		login(loginData)
	}

	return (
		<section className={classes.auth}>
			<h1>Zaloguj się</h1>
			<form onSubmit={submitHandler} novalidate='true'>
				<div className={classes.control}>
					<label htmlFor='email'>Twój e-mail (mail@mail.pl)</label>
					<input type='email' id='email' ref={emailInputRef} required />
				</div>
				<div className={classes.control}>
					<label htmlFor='password'>Twoje hasło (password)</label>
					<input type='password' id='password' ref={passwordInputRef} required />
				</div>
				<div className={classes.actions}>
					<button>Zaloguj</button>
				</div>
			</form>
		</section>
	)
}

export default AuthForm
