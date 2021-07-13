import * as styles from './search-bar.module.scss';
import { useGlobalState } from '../../hooks/GlobalState';

const SearchBar = () => {
	const [{ search }, dispatch] = useGlobalState();

	// TODO: add hotkey to focus on input (using useRef)
	// TODO: add hotkey to clear input

	const updateSearchText = (text) => {
		dispatch({
			type: 'app-search',
			value: {
				...search,
				text,
			},
		});
	};

	const handleTextClear = () => updateSearchText('');

	const handleTextInput = (event) => updateSearchText(event.target.value);

	return (
		<div className={styles.root}>
			<input
				type="text"
				className={styles.search}
				placeholder="Search for an entity..."
				onChange={handleTextInput}
				value={search.text}
			/>
			{search.text?.length !== 0 && (
				<button
					type="button"
					aria-label="Clear Search"
					className={styles.clear}
					onClick={handleTextClear}
				>
					x
				</button>
			)}
		</div>
	);
};

export default SearchBar;
