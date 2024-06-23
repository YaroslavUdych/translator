import { useState } from 'react'

import TextField from '@mui/material/TextField'
import { IconButton, Snackbar, Alert } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

import { useTranslation } from '../context/TranslationContext'

const TranslatedText: React.FC = () => {
	const { translatedText } = useTranslation()

	const [openSnackbar, setOpenSnackbar] = useState(false)

	const handleCopy: () => void = () => {
		if (navigator.clipboard) {
			if (!translatedText) {
				return
			}
			navigator.clipboard.writeText(translatedText).then(
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

	const inputStyles = {
		'& .MuiInputBase-input': {
			padding: ' 5px 50px 5px 5px',
			fontSize: '1.2rem',
			color: '#191919',
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
			borderBottomColor: '#76ABAE',
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: '#191919',
		},
	}

	return (
		<div className="translated-text-wrap">
			<TextField
				id="translated-text"
				label="Translation"
				variant="standard"
				multiline
				fullWidth
				minRows={5}
				value={translatedText || ''}
				InputProps={{
					readOnly: true,
				}}
				sx={inputStyles}
			/>
			<IconButton
				aria-label="copy"
				title="Copy to clipboard"
				onClick={handleCopy}
				className="copy-button-translated-text"
				sx={{
					'&:active': {
						transform: 'scale(0.9)',
					},
					position: 'absolute',
					bottom: '0',
					right: '0',
					color: '#76ABAE',
				}}
			>
				<ContentCopyIcon />
			</IconButton>
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

export default TranslatedText
