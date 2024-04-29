const { OpenAIEmbeddings } = require("@langchain/openai");
const { createClient } = require("@supabase/supabase-js");

const supabaseClient = createClient('http://127.0.0.1:54321', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0');

async function obtenerVectores() {
    const documents = await getDocuments() // Your custom function to load docs

    const embeddingResponse = new OpenAIEmbeddings({
        apiKey: "empty", // In Node.js defaults to process.env.OPENAI_API_KEY
        batchSize: 512, // Default value if omitted is 512. Max is 2048
        // dimensions: 1024,
        configuration: {
            baseURL: "http://localhost:8080/v1",
        }
    });

    // OpenAI recommends replacing newlines with spaces for best results
    const vectors = await embeddingResponse.embedDocuments(documents.map(document => document.replace(/\n/g, ' ')));
    // const vectors = await embeddingResponse.embedDocuments(documents);

    for (let i = 0; i < documents.length; i++) {
        const inserts = {
            content: documents[i],
            embedding: vectors[i],
        };

        const { error } = await supabaseClient.from('documents').insert(inserts);

        if (error) {
            console.error('Error inserting data:', error);
        } else {
            console.log('Data inserted successfully');
        }
    }
}

obtenerVectores();

async function getDocuments() {
    return [
        "Peter enjoys pizza",
        "Emily enjoys sushi",
        "Peter dislikes sushi",
        "Emily dislikes pizza",
        "Michael loves chocolate cake",
        "Laura loves vanilla ice cream",
        "Michael dislikes vanilla ice cream",
        "Laura dislikes chocolate cake",
        "David prefers burgers",
        "Sophia prefers salads"
    ];
}