import Main from './components/Main'
import { TranslationProvider } from './context/TranslationContext'

function App() {
	return (
		<TranslationProvider>
			<Main />
		</TranslationProvider>
	)
}

export default App
