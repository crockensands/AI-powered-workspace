import React from "react";

const List = () => {
  const aiModels = [
    { name: "ChatGPT", description: "A conversational AI model developed by OpenAI." },
    { name: "DALL·E", description: "An AI that generates images from text descriptions." },
    { name: "BERT", description: "A transformer-based NLP model by Google." },
    { name: "Stable Diffusion", description: "An AI model for generating high-quality images." },
    { name: "Whisper", description: "A speech recognition model by OpenAI." },
    { name: "Claude", description: "An AI chatbot developed by Anthropic." },
    { name: "Gemini", description: "Google’s next-gen AI assistant." },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>AI Models List</h1>
      <p style={styles.subtext}>Here are some well-known AI models:</p>
      <ul style={styles.list}>
        {aiModels.map((ai, index) => (
          <li key={index} style={styles.listItem}>
            <strong>{ai.name}</strong> - {ai.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    color: "#fff",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "10px",
  },
  subtext: {
    fontSize: "16px",
    marginBottom: "20px",
  },
  list: {
    listStyleType: "none",
    padding: 0,
  },
  listItem: {
    fontSize: "18px",
    marginBottom: "10px",
    padding: "10px",
    border: "1px solid #fff",
    borderRadius: "5px",
    backgroundColor: "#1a1a1a",
  },
};

export default List;
