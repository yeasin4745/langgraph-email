import { Annotation, StateGraph, START, END } from "@langchain/langgraph";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import "dotenv/config"; // Load environment variables from .env file

/**
 * LangGraph Email Generator
 * 
 * This application uses LangGraph to create a workflow for generating
 * and validating professional emails using Google's Gemini AI.
 */

// 1. Define the state schema for the workflow
const StateSchema = Annotation.Root({
  topic: Annotation(),
  emailDraft: Annotation(),
  isProfessional: Annotation(),
});

// 2. Initialize the Gemini AI model
const gemini = new ChatGoogleGenerativeAI({ 
    model: "gemini-2.5-flash",
    apiKey: process.env.GEMINI_API_KEY
});

// 3. Node 1: Write Email
async function writeEmail(state) {
  console.log("--- ✍️ Writing Email Draft ---");
  const prompt = `Write a professional and polite email about: ${state.topic}`;
  const res = await gemini.invoke(prompt);
  return { emailDraft: res.content };
}

// 4. Node 2: Check Email Quality
async function checkEmail(state) {
  console.log("--- 🔍 Checking Email Quality ---");
  const prompt = `Is this email professional and polite? "${state.emailDraft}". Reply only YES or NO.`;
  const res = await gemini.invoke(prompt);
  
  // Check if the response contains "YES"
  const approved = res.content.includes("YES");
  return { isProfessional: approved };
}

// 5. Conditional Routing Function
function route(state) {
  if (state.isProfessional) {
     console.log("✅ Email is professional! Task completed.");
     return END;
  } else {
     console.log("❌ Email is not professional. Returning to writer...");
     return "writer"; // Create a loop for regeneration
  }
}

// 6. Create the workflow graph
const workflow = new StateGraph(StateSchema)
  .addNode("writer", writeEmail)
  .addNode("checker", checkEmail)
  .addEdge(START, "writer")
  .addEdge("writer", "checker")
  .addConditionalEdges("checker", route);

// Compile the workflow
const app = workflow.compile();

// 7. Main execution function
async function run() {
    console.log("Starting process...\n");
    
    // Define the email topic
    const topic = "Asking my boss for a leave tomorrow due to sickness";
    
    // Run the workflow
    const result = await app.invoke({ 
        topic: topic 
    });
    
    // Display the final result
    console.log("\n===============================");
    console.log("Final Email Draft:");
    console.log("===============================");
    console.log(result.emailDraft);
    console.log("===============================");
}

// Execute the main function
run().catch(console.error);
