const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(
	cors({
		origin: 'http://localhost:3000',
	})
)
const port = process.env.PORT || 5000

app.post('/translate', async (req, res) => {
	const { text, targetLang } = req.body

	if (!text || !targetLang) {
		return res.status(400).json({ message: 'Invalid request. Missing text or targetLang' })
	}

	try {
		const fetch = await import('node-fetch').then((mod) => mod.default)

		const response = await fetch(process.env.API_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `DeepL-Auth-Key ${process.env.API_KEY}`,
			},
			body: JSON.stringify({
				text: [text],
				target_lang: targetLang,
				formality: 'prefer_more',
			}),
		})
		if (!response.ok) {
			return res.status(500).json({ message: 'API error. Please try again later.', response: response.json() })
		}

		const data = await response.json()
		res.json(data)
	} catch (error) {
		res.status(500).json({ message: 'Server error. Please try again later.', error: error })
	}
})

app.listen(port, () => {
	console.log(`Server is running on port ${port}...`)
})
