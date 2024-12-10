const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const fetch = require('node-fetch')
require('dotenv').config()
const mockAPIResponse = require('./mockAPI.js')

const PORT = 8081

const BASE_API_URL = 'https://api.meaningcloud.com/sentiment-2.1'
const MEANINGCLOUD_API_KEY = process.env.MEANINGCLOUD_API_KEY

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('dist'))

app.get('/', function (req, res) {
    res.sendFile(path.resolve('src/client/views/index.html'))
})

app.post('/api', async (req, res) => {
    try {
        const url = req.body.url
        console.log('URL received:', url)

        if (!url) {
            return res.status(400).send({ error: 'Invalid URL provided' })
        }

        const apiUrl = `${BASE_API_URL}?key=${MEANINGCLOUD_API_KEY}&url=${url}&lang=en`
        console.log('API URL:', apiUrl)

        const response = await fetch(apiUrl)
        console.log('Response Status:', response.status)

        const apiData = await response.json()
        console.log('Raw API Response:', apiData)

        if (!apiData || apiData.status?.code !== '0') {
            console.error('MeaningCloud API Error:', apiData?.status?.msg || 'No response')
            return res
                .status(500)
                .send({ error: 'Error from MeaningCloud API: ' + (apiData?.status?.msg || 'Unknown error') })
        }

        const sample = {
            text: apiData?.sentence_list?.[0]?.text || 'No text available',
            score_tag: apiData?.score_tag || 'N/A',
            agreement: apiData?.agreement || 'N/A',
            subjectivity: apiData?.subjectivity || 'N/A',
            confidence: apiData?.confidence || 'N/A',
            irony: apiData?.irony || 'N/A'
        }

        res.send(sample)
    } catch (error) {
        console.error('Error fetching data from the API:', error)
        res.status(500).send({ error: 'Unable to fetch data from the API' })
    }
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.listen(PORT, (error) => {
    if (error) throw new Error(error)
    console.log(`Server listening on port ${PORT}!`)
})

module.exports = app
