interface Translation {
	detected_source_language: string
	text: string
}

interface TranslationResult {
	detectedLanguage: string
	targetLanguage: string
	translations: Translation[]
	originalText: string
}

const fetchTranslation = async (text: string, language: string): Promise<TranslationResult> => {
	if (language === '') {
		throw new Error('No language selected')
	}
	try {
		const response = await fetch(process.env.REACT_APP_API_URL as string, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				text: text,
				targetLang: language,
			}),
		})
		if (!response.ok) {
			console.log('Failed to fetch translation:', response)
		}
		const data: TranslationResult = await response.json()
		const translations = data.translations.map((t: any) => ({
			detected_source_language: t.detected_source_language,
			text: t.text,
		}))
		return {
			detectedLanguage: translations[0].detected_source_language,
			targetLanguage: language,
			originalText: text,
			translations,
		}
	} catch (error) {
		console.log('Error fetching translation:', error)
		throw error
	}
}

export default fetchTranslation
