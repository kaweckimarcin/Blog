import { createStore } from 'redux'

const counterReducer = (state = null, action) => {
	if (action.type === 'loggedIn') {
		return (state = true)
	}

	if (action.type === 'loggedOut') {
		return (state = null)
	}

	return state
}

const store = createStore(counterReducer)

export default store
