const OpenAI = require('openai');

// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getAIReply(message) {
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant for a fashion e-commerce store." },
        { role: "user", content: message }
      ],
      max_tokens: 250,
      temperature: 0.7,
    });
    return chatCompletion.choices[0].message.content;
  } catch (err) {
    return "Sorry, I couldn't process your request at the moment.";
  }
}

module.exports = { getAIReply };