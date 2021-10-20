import { useState } from 'react';

export default function useToggleState(initialState = true) {
	const [ state, setState ] = useState(initialState);
	const toggleState = () => {
		setState(state => !state);
	};
	return [ state, toggleState ];
}
