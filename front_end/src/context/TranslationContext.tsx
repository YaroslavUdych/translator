import { createContext, useContext, useState, ReactNode } from 'react'

interface TranslationText {
	text: string
}

interface TranslationResult {
	detectedLanguage: string
	targetLanguage: string
	originalText: string
	translations: TranslationText[]
}

interface TranslationContextProps {
	textToTranslate: string
	setTextToTranslate: (text: string) => void
	translatedText: string
	setTranslatedText: (text: string) => void
	loading: boolean
	setLoading: (loading: boolean) => void
	error: string
	setError: (error: string) => void
	language: string
	setLanguage: (language: string) => void
	translationResults: TranslationResult[]
	setTranslationResults: React.Dispatch<React.SetStateAction<TranslationResult[]>>
}

const TranslationContext = createContext<TranslationContextProps | undefined>(undefined)

export const TranslationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [textToTranslate, setTextToTranslate] = useState('')
	const [translatedText, setTranslatedText] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [language, setLanguage] = useState('')
	const [translationResults, setTranslationResults] = useState<TranslationResult[]>([])

	return (
		<TranslationContext.Provider
			value={{
				textToTranslate,
				setTextToTranslate,
				translatedText,
				setTranslatedText,
				loading,
				setLoading,
				error,
				setError,
				language,
				setLanguage,
				translationResults,
				setTranslationResults,
			}}
		>
			{children}
		</TranslationContext.Provider>
	)
}

export const useTranslation = () => {
	const context = useContext(TranslationContext)
	if (!context) {
		throw new Error('useTranslation must be used within a TranslationProvider')
	}
	return context
}
