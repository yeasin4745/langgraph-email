# LangGraph Email Generator

A Node.js application that uses LangGraph to generate and validate professional emails using Google's Gemini AI.

## Features

- Generates email drafts based on a given topic
- Validates email for professionalism and politeness
- Automatically regenerates if the email doesn't meet quality standards
- Uses LangGraph for workflow management
- Supports Gemini AI models for text generation

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Google Gemini API key

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/langgraph-email.git
   cd langgraph-email
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with your Gemini API key:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

## Usage

Run the application:
```bash
node index.js
```

The application will generate an email draft for requesting a leave due to sickness and validate its professionalism.

## Project Structure

```
langgraph-email/
├── index.js          # Main application file
├── .env             # Environment variables (not committed to git)
├── .gitignore       # Git ignore file
├── package.json     # Project dependencies
├── node_modules/    # Dependencies (not committed to git)
└── README.md        # This file
```

## Configuration

The application uses the following configuration:

- **Model**: Gemini AI model (currently set to gemini-2.5-flash)
- **API Key**: Retrieved from the `GEMINI_API_KEY` environment variable

## Workflow

1. **Write Email**: Generates an email draft based on the specified topic
2. **Check Email**: Validates if the email is professional and polite
3. **Conditional Routing**: 
   - If approved: Finalizes the email
   - If not approved: Returns to the writing step for regeneration

## Dependencies

- `@langchain/langgraph`: LangGraph for workflow management
- `@langchain/google-genai`: Google AI integration for LangChain
- `dotenv`: Environment variable management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Support

For issues or questions, please open an issue in the GitHub repository.
