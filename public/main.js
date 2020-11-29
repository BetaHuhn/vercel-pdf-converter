/* eslint-disable no-unused-vars */
const go = document.getElementById('go')
const host = document.getElementById('host')
const input = document.getElementById('url')
const error = document.getElementById('error')
const errorMsg = document.getElementById('error-msg')

if (host) host.innerText = `${ window.location.host }/`

const errors = {
	400: 'Error: Could not generate PDF.',
	404: 'Error: Invalid URL.',
	500: 'Error: Please try again.'
}

const status = (location.search.split('status=')[1] || '').split('&')[0]
if (status.length > 0) {
	displayError(errors[status])
}

function generate() {
	if (go.href === undefined || go.href.length < 1) return displayError('Please fill out the form.')
	go.innerText = 'Generating...'
	window.location.href = go.href
}

input.addEventListener('keyup', function(event) {
	if (event.key === 'Enter' || event.keyCode === 13) {
		event.preventDefault()
		generate()
	}
})

function onInput(input) {
	go.href = `http://${ window.location.host }/${ input.value }`
}

function copy() {
	const value = `${ window.location.host }/`
	const tempInput = document.createElement('INPUT')
	document.body.appendChild(tempInput)
	tempInput.setAttribute('value', value)
	tempInput.select()
	document.execCommand('copy')
	document.body.removeChild(tempInput)
	host.title = 'Copied!'
	setTimeout(function() {
		host.title = 'Click to copy'
	}, 1000)
}

function displayError(msg) {
	errorMsg.innerText = msg || 'An unkown error ocurred.'
	error.style.display = 'block'
}