import { useState } from 'react'
import { useTranslation } from '../context/TranslationContext'

import { Card, CardContent, Typography, CardActions, IconButton, Divider, Snackbar, Alert } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

const ListOfResults: React.FC = () => {
	const [openSnackbar, setOpenSnackbar] = useState(false)
	const { translationResults } = useTranslation()

	interface TranslationResult {
		originalText: string
		detectedLanguage: string
		targetLanguage: string
		translations: { text: string }[]
	}

	const uniqueTranslationResults: TranslationResult[] = translationResults.filter(
		(result, index, self) => index === self.findIndex((r) => r.translations[0].text === result.translations[0].text)
	)

	const handleCopy: (event: React.MouseEvent<HTMLButtonElement>) => void = (event) => {
		const index: number = parseInt(event.currentTarget.id)
		const text: string = uniqueTranslationResults[index].translations[0].text

		if (navigator.clipboard) {
			navigator.clipboard.writeText(text).then(
				() => {
					setOpenSnackbar(true)
				},
				(err) => {
					console.error('Could not copy text: ', err)
				}
			)
		} else {
			console.warn('Clipboard API not supported')
		}
	}

	return (
		<div className="list-of-results-wrap">
			{uniqueTranslationResults.map((result, index) => (
				<Card key={index} sx={{ marginBottom: '1rem' }}>
					<CardContent>
						<Typography gutterBottom sx={{ color: '#76ABAE' }}>
							{result.detectedLanguage} - {result.targetLanguage}
						</Typography>
						<Typography variant="body2" gutterBottom>
							{result.originalText}
						</Typography>
						<Divider
							sx={{
								marginTop: '0.5rem',
								marginBottom: '0.5rem',
							}}
						/>
						<Typography variant="body1" gutterBottom>
							{result.translations[0].text}
						</Typography>
					</CardContent>
					<CardActions>
						<IconButton title="Copy to clipboard" onClick={handleCopy} id={index.toString()}>
							<ContentCopyIcon />
						</IconButton>
					</CardActions>
				</Card>
			))}
			<Snackbar
				open={openSnackbar}
				autoHideDuration={2000}
				onClose={() => setOpenSnackbar(false)}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			>
				<Alert variant="filled" onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
					Translation copied to clipboard!
				</Alert>
			</Snackbar>
		</div>
	)
}

export default ListOfResults
