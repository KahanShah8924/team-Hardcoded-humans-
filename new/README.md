# ReWear - A Sustainable Fashion Marketplace

This is a Next.js starter project for "ReWear", an e-commerce platform inspired by ThredUp, built in Firebase Studio.

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (version 20 or later) and npm installed on your system.

### Installation

1.  **Clone the repository:**
    If you haven't already, get the code onto your machine.

2.  **Install dependencies:**
    Navigate to the project directory in your terminal and run the following command to install all the necessary packages:
    ```bash
    npm install
    ```

### Environment Setup

The project uses Genkit with Google AI, which requires an API key.

1.  **Create an environment file:**
    Make a copy of the `.env` file and name it `.env.local`:
    ```bash
    cp .env .env.local
    ```

2.  **Get a Google AI API Key:**
    - Go to [Google AI Studio](https://aistudio.google.com/app/apikey).
    - Click on **"Create API key"** and copy the generated key.

3.  **Add the API key to your environment:**
    Open the `.env.local` file you just created and add your API key:
    ```
    GOOGLE_API_KEY="YOUR_API_KEY_HERE"
    ```

### Running the Development Servers

You'll need to run two separate processes in two different terminal windows to have the full application running: one for the Next.js frontend and one for the Genkit AI backend.

1.  **Start the Next.js App:**
    In your first terminal, run:
    ```bash
    npm run dev
    ```
    Your website will be available at [http://localhost:9002](http://localhost:9002).

2.  **Start the Genkit AI Service:**
    In a second terminal, run:
    ```bash
    npm run genkit:watch
    ```
    This will start the Genkit development server and automatically restart it when you make changes to the AI flow files.

Now you're all set! You can view the website in your browser and the AI features (like "Suggest with AI") should be fully functional.
