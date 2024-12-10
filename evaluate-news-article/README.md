# Evaluate News Article

Welcome to the **Evaluate News Article** project! This app lets you analyze the sentiment of news articles by simply
submitting a URL. It fetches details like the article’s polarity (positive or negative), subjectivity (factual or
subjective), and even a snippet of the text.

It uses the **MeaningCloud API** to perform sentiment analysis and includes offline support through service workers, so
you can still interact with it even without an internet connection. Plus, the app is fully tested with Jest to ensure
everything works as expected.

## Features

- Submit a URL to analyze the sentiment of the news article.
- View details like:
- Polarity (Positive/Negative)
- Subjectivity (Factual/Subjective)
- A text snippet from the article
- Offline functionality with service workers.
- Unit tests written with Jest to ensure reliability.

## How to Get Started

### Requirements

Before running the app, make sure you have these installed:

- [Node.js](https://nodejs.org/)
- [npm](https://npmjs.com)

### Setup Steps

1. **Clone the repository or copy the project files** to your local machine.

2. **Navigate to the project folder** in your terminal:

   cd evaluate-news-article

3. **Install dependencies** by running:

   npm install

4. **Set up the API key** by creating a `.env` file in the root of the project. Add the following line to the `.env`
   file, replacing `your_meaningcloud_api_key` with your actual API key:

   API_KEY=your_meaningcloud_api_key

5. **Build the project**:

   npm run build

6. **Start the development server**:

   npm run start

7. Open your browser and go to [http://localhost:8081](http://localhost:8081) to use the app.

## Dependencies

Here’s a quick look at the key libraries used:

- **express**: Serves as the web server for handling API requests and serving static assets.
- **cors**: Middleware to facilitate cross-origin resource sharing in API requests.
- **body-parser**: Middleware for parsing incoming request bodies in a middleware before your handlers.
- **node-fetch**: Provides the ability to make HTTP requests to external APIs like MeaningCloud.
- **dotenv**: Loads environment variables from a `.env` file into `process.env`.
- **webpack**: A module bundler for compiling JavaScript modules and managing assets.
- **workbox-webpack-plugin**: Enhances the app with offline capabilities using service workers.
- **jest**: A JavaScript testing framework to ensure code reliability and correctness.

## Running Tests

If you want to check that everything is working as expected, you can run the unit tests using: npm run test This will
run all the Jest tests and show you the results in the terminal.
