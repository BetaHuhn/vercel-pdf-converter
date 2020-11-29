<div align="center">
  
# vercel-pdf-converter

[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/BetaHuhn/vercel-pdf-converter/blob/master/LICENSE) ![Version](https://img.shields.io/github/package-json/v/betahuhn/vercel-pdf-converter) ![Dependencies](https://img.shields.io/david/betahuhn/vercel-pdf-converter)

Vercel function which generates PDFs from Webpages.

</div>

## 👋 Introduction

This repo contains the code for a simple [Vercel](https://vercel.com) function which generates a PDF file from any webpage using a [headless Chrome instance](https://github.com/puppeteer/puppeteer).

## 🚀 Get started

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2FBetaHuhn%2Fvercel-pdf-converter)

### Or setup manually:

Clone this repository:

```sh
git clone https://github.com/BetaHuhn/vercel-pdf-converter
```

Install all dependencies:

```sh
npm install
```

Login to your Vercel account and setup a project:

```sh
vercel
```

Run the function locally:

```sh
npm run develop
```

Deploy to Vercel in production:

```sh
npm run deploy 
```

## 📚 Usage

After you've deployed the function, you can use it by placing your function's domain infront of any URL:

```
to-pdf.vercel.app/https://github.com/BetaHuhn/vercel-pdf-converter
```

The function will then generate a PDF of that URL and return it as a downloadable file.

## 💻 Development

Issues and PRs are very welcome!

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html). To see differences with previous versions refer to the [CHANGELOG](CHANGELOG.md).

## ❔ About

This project was developed by me ([@betahuhn](https://github.com/BetaHuhn)) in my free time. If you want to support me:

[![Donate via PayPal](https://img.shields.io/badge/paypal-donate-009cde.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=394RTSBEEEFEE)

## License

Copyright 2020 Maximilian Schiller

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
