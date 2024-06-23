import { useEffect, useCallback, useState } from 'react'

import debounce from '../helpers/debounce'
import fetchTranslation from '../api/fetchTranslation'
import { useTranslation } from '../context/TranslationContext'

import { TextField, Snackbar, Alert } from '@mui/material'

const TextToTranslate: React.FC = () => {
	const { textToTranslate, setTextToTranslate, setLoading, setTranslatedText, language, setTranslationResults } = useTranslation()
	const [openSnackbar, setOpenSnackbar] = useState(false)

	const debouncedFetchTranslation = useCallback(
		debounce(async (text: string) => {
			if (language === '') {
				setOpenSnackbar(true)
				return
			}
			if (text.trim().length > 1) {
				setLoading(true)
				try {
					const translation = await fetchTranslation(text, language)
					const translationRes = translation.translations[0].text
					setTranslatedText(translationRes)
					if (translationRes.length > 15) {
						setTranslationResults((prev) => [...prev, translation])
					}
				} catch (error) {
					console.log(error)
				} finally {
					setLoading(false)
				}
			}
		}, 700),

		[language]
	)

	useEffect(() => {
		if (textToTranslate.trim().length > 0 && textToTranslate.trim().length === textToTranslate.length) {
			debouncedFetchTranslation(textToTranslate)
		}
	}, [textToTranslate])

	const handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void = (event) => {
		const newText: string = event.target.value
		setTextToTranslate(newText)
		if (newText.trim().length === 0) {
			setTranslatedText('')
		}
	}

	const inputStyles = {
		'& .MuiInputBase-input': {
			fontSize: '1.2rem',
			color: '#191919',
			padding: ' 5px 50px 5px 5px',
		},
		'& .MuiInputLabel-root': {
			color: '#76ABAE',
			fontSize: '1.3rem',
		},
		'& .MuiInputLabel-root.Mui-focused': {
			color: '#76ABAE',
		},
		'& .MuiInput-underline:before': {
			borderBottomColor: '#76ABAE',
		},
		'& .MuiInput-underline:hover:before': {
			borderBottomColor: '#191919',
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: '#191919',
		},
	}

	return (
		<div className="text-to-traslate-wrap">
			<TextField
				id="text-to-translate"
				label="Text to translate"
				variant="standard"
				multiline
				minRows={5}
				fullWidth
				value={textToTranslate}
				onChange={handleChange}
				sx={inputStyles}
			/>
			<Snackbar
				open={openSnackbar}
				autoHideDuration={2000}
				onClose={() => setOpenSnackbar(false)}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			>
				<Alert severity="info" variant="filled" onClose={() => setOpenSnackbar(false)}>
					Please select a language
				</Alert>
			</Snackbar>
		</div>
	)
}

export default TextToTranslate
