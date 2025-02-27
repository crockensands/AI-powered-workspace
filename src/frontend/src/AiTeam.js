import React, { useState } from "react";

const AiTeam = () => {
  const [canvasIcons, setCanvasIcons] = useState([]);
  const [draggingIcon, setDraggingIcon] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [customAI, setCustomAI] = useState({ name: "", aiSelector: "", prompt: "", input: "", output: "" });
  const [selectedIcon, setSelectedIcon] = useState(null);

  const menuIcons = [
    { id: "ml", type: "🤖", name: "Machine Learning", aiSelector: "GPT-4", prompt: "Train on dataset", input: "Data", output: "Predictions" },
    { id: "nlp", type: "🧠", name: "Natural Language Processing", aiSelector: "BERT", prompt: "Analyze text", input: "Text", output: "Sentiment" },
    { id: "cv", type: "🎨", name: "Computer Vision", aiSelector: "YOLO", prompt: "Detect objects", input: "Image", output: "Bounding boxes" },
    { id: "speech", type: "🔊", name: "Speech Recognition", aiSelector: "Whisper", prompt: "Transcribe audio", input: "Audio", output: "Text" },
    { id: "data", type: "📊", name: "Data Analysis", aiSelector: "Pandas", prompt: "Process data", input: "Dataset", output: "Insights" },
    { id: "ai", type: "⚡", name: "General AI", aiSelector: "Claude", prompt: "Answer questions", input: "Question", output: "Answer" },
    { id: "custom", type: "➕", custom: true },
  ];

  const handleDragStart = (icon) => {
    setDraggingIcon(icon);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggingIcon) {
      const newIcon = {
        ...draggingIcon,
        x: e.clientX - 200,
        y: e.clientY - 50,
        id: `${draggingIcon.id}-${Date.now()}` // Create unique ID for each dropped icon
      };
      setCanvasIcons([...canvasIcons, newIcon]);
      setDraggingIcon(null);
    }
  };

  const handleCustomAI = () => {
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomAI({ ...customAI, [name]: value });
  };

  const handleCanvasIconClick = (icon) => {
    setSelectedIcon(icon);
  };

  const handleAddCustomAI = () => {
    if (customAI.name) {
      const newCustomIcon = {
        id: `custom-${Date.now()}`,
        type: "🔮",
        ...customAI
      };
      
      // Add to menu icons for future use
      menuIcons.splice(menuIcons.length - 1, 0, newCustomIcon);
      
      setShowModal(false);
      setCustomAI({ name: "", aiSelector: "", prompt: "", input: "", output: "" });
    }
  };

  const handleCloseProperties = () => {
    setSelectedIcon(null);
  };

  return (
    <div style={styles.container}>
      {/* Side Menu */}
      <div style={styles.sideMenu}>
        <h2 style={styles.menuHeading}>AI Categories</h2>
        <div style={styles.iconGrid}>
          {menuIcons.map((icon) => (
            <div
              key={icon.id}
              style={styles.iconItem}
              draggable={!icon.custom}
              onDragStart={() => !icon.custom && handleDragStart(icon)}
              onClick={() => icon.custom && handleCustomAI()}
            >
              {icon.type}
            </div>
          ))}
        </div>
      </div>

      {/* Canvas */}
      <div style={styles.canvas} onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
        {canvasIcons.map((icon, index) => (
          <div 
            key={icon.id || index} 
            style={{ 
              ...styles.draggableIcon, 
              left: icon.x, 
              top: icon.y,
              backgroundColor: selectedIcon && selectedIcon.id === icon.id ? "#6a5acd" : "#444"
            }}
            onClick={() => handleCanvasIconClick(icon)}
          >
            {icon.type}
          </div>
        ))}
      </div>

      {/* Properties Panel */}
      {selectedIcon && (
        <div style={styles.propertiesPanel}>
          <div style={styles.propertiesHeader}>
            <h2 style={styles.propertiesTitle}>AI Properties</h2>
            <button style={styles.closeButton} onClick={handleCloseProperties}>×</button>
          </div>
          
          <div style={styles.propertyItem}>
            <label style={styles.propertyLabel}>Icon Type:</label>
            <div style={styles.propertyValue}>{selectedIcon.type}</div>
          </div>
          
          <div style={styles.propertyItem}>
            <label style={styles.propertyLabel}>Name:</label>
            <div style={styles.propertyValue}>{selectedIcon.name || "Unnamed"}</div>
          </div>
          
          <div style={styles.propertyItem}>
            <label style={styles.propertyLabel}>AI Selector:</label>
            <div style={styles.propertyValue}>{selectedIcon.aiSelector || "None"}</div>
          </div>
          
          <div style={styles.propertyItem}>
            <label style={styles.propertyLabel}>Prompt:</label>
            <div style={styles.propertyValue}>{selectedIcon.prompt || "None"}</div>
          </div>
          
          <div style={styles.propertyItem}>
            <label style={styles.propertyLabel}>Input:</label>
            <div style={styles.propertyValue}>{selectedIcon.input || "None"}</div>
          </div>
          
          <div style={styles.propertyItem}>
            <label style={styles.propertyLabel}>Output:</label>
            <div style={styles.propertyValue}>{selectedIcon.output || "None"}</div>
          </div>
        </div>
      )}

      {/* Custom AI Popup */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2>Customize AI Icon</h2>

            {/* Text Boxes Under Headings */}
            <div style={styles.textBoxContainer}>
              <label style={styles.textLabel}>Name:</label>
              <input
                type="text"
                name="name"
                value={customAI.name}
                onChange={handleInputChange}
                style={styles.inputField}
              />

              <label style={styles.textLabel}>AI Selector:</label>
              <input
                type="text"
                name="aiSelector"
                value={customAI.aiSelector}
                onChange={handleInputChange}
                style={styles.inputField}
              />

              <label style={styles.textLabel}>Prompt:</label>
              <input
                type="text"
                name="prompt"
                value={customAI.prompt}
                onChange={handleInputChange}
                style={styles.inputField}
              />

              <label style={styles.textLabel}>Input:</label>
              <input
                type="text"
                name="input"
                value={customAI.input}
                onChange={handleInputChange}
                style={styles.inputField}
              />

              <label style={styles.textLabel}>Output:</label>
              <input
                type="text"
                name="output"
                value={customAI.output}
                onChange={handleInputChange}
                style={styles.inputField}
              />
            </div>

            <div style={styles.modalButtons}>
              <button style={styles.doneButton} onClick={handleAddCustomAI}>Add</button>
              <button style={styles.cancelButton} onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    backgroundColor: "#000",
    color: "#fff",
    fontFamily: "Arial, sans-serif",
  },
  sideMenu: {
    width: "180px",
    backgroundColor: "#1a1a1a",
    padding: "15px",
    borderRadius: "10px",
    marginRight: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  menuHeading: {
    fontSize: "16px",
    marginBottom: "10px",
    borderBottom: "1px solid #fff",
    paddingBottom: "5px",
    textAlign: "center",
  },
  iconGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
  },
  iconItem: {
    width: "50px",
    height: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
    border: "1px solid #fff",
    borderRadius: "5px",
    cursor: "grab",
    backgroundColor: "#222",
  },
  canvas: {
    flex: 1,
    position: "relative",
    backgroundColor: "#111",
    borderRadius: "10px",
    margin: "10px",
    border: "2px dashed #444",
  },
  draggableIcon: {
    position: "absolute",
    width: "50px",
    height: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
    border: "1px solid #fff",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#444",
    transition: "background-color 0.2s ease",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "#222",
    padding: "20px",
    borderRadius: "10px",
    width: "300px",
    textAlign: "center",
  },
  textBoxContainer: {
    marginBottom: "20px",
  },
  textLabel: {
    display: "block",
    marginBottom: "5px",
    fontSize: "14px",
    color: "#ccc",
    textAlign: "left",
  },
  inputField: {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #fff",
    backgroundColor: "#333",
    color: "#fff",
    fontSize: "14px",
  },
  modalButtons: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "10px",
  },
  doneButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  cancelButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  
  // Properties Panel Styles
  propertiesPanel: {
    width: "250px",
    backgroundColor: "#1a1a1a",
    padding: "15px",
    borderRadius: "10px",
    marginLeft: "20px",
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
  },
  propertiesHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
    borderBottom: "1px solid #444",
    paddingBottom: "10px",
  },
  propertiesTitle: {
    fontSize: "18px",
    margin: 0,
  },
  closeButton: {
    backgroundColor: "transparent",
    color: "#fff",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    padding: "0 5px",
  },
  propertyItem: {
    marginBottom: "12px",
    padding: "8px",
    backgroundColor: "#222",
    borderRadius: "5px",
  },
  propertyLabel: {
    fontSize: "14px",
    color: "#999",
    marginBottom: "5px",
    display: "block",
  },
  propertyValue: {
    fontSize: "16px",
    wordBreak: "break-word",
  }
};

export default AiTeam;