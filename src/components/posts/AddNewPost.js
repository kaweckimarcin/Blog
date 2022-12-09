import { useRef, useState } from 'react'
import { Prompt } from 'react-router-dom'

import Card from '../UI/Card'
import LoadingSpinner from '../UI/LoadingSpinner'
import classes from './AddNewPost.module.css'

const AddNewPost = props => {
	const [isEntering, setIsEntering] = useState(false)
	const authorInputRef = useRef()
	const textInputRef = useRef()
	const titleInputRef = useRef()

	function submitFormHandler(event) {
		event.preventDefault()

		const enteredAuthor = authorInputRef.current.value
		const enteredText = textInputRef.current.value
		const enteredTitle = titleInputRef.current.value
		const date = `${new Date().toISOString().slice(0, 10)}, godzina ${new Date().getHours()}:${new Date().getMinutes()}`

		if (enteredAuthor === '' || enteredText === '' || enteredTitle === '') {
			alert('Uzupełnij wszystkie pola!')
			return
		}

		props.onAddPost({ author: enteredAuthor, text: enteredText, title: enteredTitle, date: date })
	}

	const formFocusedHandler = () => {
		setIsEntering(true)
	}

	const finishedEnteringHandler = () => {
		setIsEntering(false)
	}

	return (
		<>
			<Prompt
				when={isEntering}
				message={location => 'Czy jesteś pewien? Wszystkie niezapisane dane zostaną utracone!'}
			/>
			<Card>
				<form onFocus={formFocusedHandler} className={classes.form} onSubmit={submitFormHandler}>
					{props.isLoading && (
						<div className={classes.loading}>
							<LoadingSpinner />
						</div>
					)}

					<div className={classes.control}>
						<label htmlFor='title'>Title</label>
						<input type='text' id='title' ref={titleInputRef} />
					</div>

					<div className={classes.control}>
						<label htmlFor='text'>Text</label>
						<textarea id='text' rows='5' ref={textInputRef}></textarea>
					</div>

					<div className={classes.control}>
						<label htmlFor='author'>Author</label>
						<input type='text' id='author' ref={authorInputRef} />
					</div>

					<div className={classes.actions}>
						<button onClick={finishedEnteringHandler} className='btn'>
							Dodaj post
						</button>
					</div>
				</form>
			</Card>
		</>
	)
}

export default AddNewPost
