'use server';

require('dotenv').config();
const { GoogleGenerativeAI, SchemaType } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function flashcard_generator(content: string) {
  // define the schema
  const schema = {
    description: "List of flashcards",
    type: SchemaType.ARRAY,
    items: {
      type: SchemaType.OBJECT,
      properties: {
        question: {
          type: SchemaType.STRING,
          description: "question",
          nullable: false,
        },
        answer: {
            type: SchemaType.STRING,
            description: "answer",
            nullable: false,
          },
      },
    required: ["question", "answer"],
    },
  };

  // call the model
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    generationConfig: {
    responseMimeType: "application/json",
    responseSchema: schema,
    },
  });

  const result = await model.generateContent(
    `Create learning flashcards based on the attached note.

    Attached note:
    ${content}
    `,
  );
  console.log(result.response)

  // Check if result.response is a string or an object with a text method
  let text;
  if (typeof result.response === 'string') {
    text = result.response;
  } else if (result.response && typeof result.response.text === 'function') {
    text = await result.response.text();
  } else {
    throw new TypeError('Unexpected response format');
  }

  // save output for examination
  const json = JSON.parse(text);
  
  return json
}