import './styles/style.scss'
import { checkURL } from './js/checkURL'

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form')
    const errorDiv = document.getElementById('error')

    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        const inputField = document.getElementById('article-url')
        const url = inputField.value

        // Validate URL
        if (!checkURL(url)) {
            errorDiv.textContent = 'Invalid URL! Please enter a valid URL.'
            return
        }

        try {
            // Send URL to server
            const response = await fetch('http://localhost:8081/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url })
            })

            if (!response.ok) {
                throw new Error('Failed to fetch data from the server.')
            }

            const data = await response.json()

            // Debugging: Log response data
            console.log('API Data:', data)

            // Update UI with API response
            updateUI(data)
        } catch (error) {
            errorDiv.textContent = 'Error: Unable to fetch data from the server.'
            console.error(error)
        }
    })

    // Function to update the UI
    const updateUI = (data) => {
        const textElement = document.getElementById('text')
        const agreementElement = document.getElementById('agreement')
        const subjectivityElement = document.getElementById('subjectivity')
        const confidenceElement = document.getElementById('confidence')
        const ironyElement = document.getElementById('irony')
        const scoreTagElement = document.getElementById('score_tag')

        // Update fields with API data
        if (textElement) textElement.textContent = `Text: ${data.text}`
        if (agreementElement) agreementElement.textContent = `Agreement: ${data.agreement}`
        if (subjectivityElement) subjectivityElement.textContent = `Subjectivity: ${data.subjectivity}`
        if (confidenceElement) confidenceElement.textContent = `Confidence: ${data.confidence}`
        if (ironyElement) ironyElement.textContent = `Irony: ${data.irony}`
        if (scoreTagElement) scoreTagElement.textContent = `Score Tag: ${data.score_tag}`
    }
})
