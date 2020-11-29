const { getPdf } = require('../service/convert')

module.exports = async (req, res) => {
	try {
		// Only allow GET requests
		if (req.method !== 'GET') return res.status(405).end()

		// Strip leading slash from request path
		const url = req.url.replace(/^\/+/, '')

		if (url === 'favicon.ico') return res.status(404).end()

		console.log(`Converting: ${ url }`)
		const pdfBuffer = await getPdf(url)

		if (!pdfBuffer) return res.status(400).send('Error: could not generate PDF')

		// Set Caching header
		if (process.env.NODE_ENV !== 'development') res.setHeader('Cache-control', 'public, max-age=300')

		// Set Content type to PDF and send the PDF to the client
		res.setHeader('Content-type', 'application/pdf')
		res.send(pdfBuffer)

	} catch (err) {
		if (err.message === 'Protocol error (Page.navigate): Cannot navigate to invalid URL')
			return res.status(404).end()

		console.error(err)
		res.status(500).send('Error: Please try again.')
	}
}