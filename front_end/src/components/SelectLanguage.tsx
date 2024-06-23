import { useTranslation } from '../context/TranslationContext'
import fetchTranslation from '../api/fetchTranslation'

import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'

const SelectLanguage: React.FC = function () {
	const { language, setLanguage, textToTranslate, setLoading, setTranslatedText, setTranslationResults } = useTranslation()

	const handleChange = async (event: SelectChangeEvent) => {
		const newLanguage: string = event.target.value as string
		setLanguage(newLanguage)
		if (textToTranslate.trim().length > 1) {
			setLoading(true)
			try {
				const translation = await fetchTranslation(textToTranslate, newLanguage)
				const translationResText: string = translation.translations[0].text
				setTranslatedText(translationResText)
				if (translationResText.length > 10) {
					setTranslationResults((prev) => [...prev, translation])
				}
			} catch (error) {
				console.log('Error fetching translation:', error)
			} finally {
				setLoading(false)
			}
		}
	}

	const selectStyles = {
		'& .MuiInputLabel-root': {
			color: '#76ABAE',
			fontSize: '1rem',
		},
		'& .MuiInputLabel-root.Mui-focused': {
			color: '#76ABAE',
		},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: '#76ABAE',
			},
			'&:hover fieldset': {
				borderColor: '#191919',
			},
			'&.Mui-focused fieldset': {
				borderColor: '#191919',
			},
		},
		'& .MuiSvgIcon-root': {
			color: '#191919',
		},
	}

	return (
		<div className="select-wrap">
			<Box>
				<FormControl fullWidth variant="outlined" size="small" sx={selectStyles}>
					<InputLabel id="language-select-label">Translate to</InputLabel>
					<Select labelId="language-select-label" value={language} label="Translate to" onChange={handleChange}>
						<MenuItem value="CS">Czech</MenuItem>
						<MenuItem value="EN">English</MenuItem>
						<MenuItem value="FR">French</MenuItem>
						<MenuItem value="DE">German</MenuItem>
						<MenuItem value="IT">Italian</MenuItem>
						<MenuItem value="PL">Polish</MenuItem>
						<MenuItem value="PT">Portuguese</MenuItem>
						<MenuItem value="ES">Spanish</MenuItem>
						<MenuItem value="UK">Ukrainian</MenuItem>
					</Select>
				</FormControl>
			</Box>
		</div>
	)
}

export default SelectLanguage
