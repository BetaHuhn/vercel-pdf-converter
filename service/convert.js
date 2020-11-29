import chrome from 'chrome-aws-lambda'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker'
import { addExtra } from 'puppeteer-extra'

// Configure puppeteer-extra plugins
const puppeteer = addExtra(chrome.puppeteer)
puppeteer.use(StealthPlugin())
puppeteer.use(AdblockerPlugin({ blockTrackers: true }))

// Or just use puppeteer directly
// import puppeteer from 'puppeteer-core'

const isDev = process.env.NODE_ENV === 'development'

// Path to chrome executable on different platforms
const chromeExecutables = {
	linux: '/usr/bin/chromium-browser',
	win32: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
	darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
}

export const getOptions = async (isDev) => {

	// During development use local chrome executable
	if (isDev) {
		return {
			args: [],
			executablePath: chromeExecutables[process.platform] || chromeExecutables.linux,
			headless: true
		}
	}

	// Else, use the path of chrome-aws-lambda and its args
	return {
		args: chrome.args,
		executablePath: await chrome.executablePath,
		headless: chrome.headless
	}
}

export const getPdf = async (url) => {

	// Start headless chrome instance
	const options = await getOptions(isDev)
	const browser = await puppeteer.launch(options)
	const page = await browser.newPage()

	// Visit URL and wait until everything is loaded (available events: load, domcontentloaded, networkidle0, networkidle2)
	await page.goto(url, { waitUntil: 'domcontentloaded' })

	const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
	await delay(3500)

	// Tell Chrome to generate the PDF
	await page.emulateMediaType('screen')
	const buffer = await page.pdf({
		format: 'A4',
		displayHeaderFooter: true,
		headerTemplate: '',
		footerTemplate: '',
		printBackground: true
	})

	// Close chrome instance
	await browser.close()

	return buffer
}