import React, { useState } from "react";
import AiTeam from "./AiTeam"; // Import AI Team component
import List from "./List"; // Import List component

const HomePage = () => {
  const [selectedOption, setSelectedOption] = useState("Welcome");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State for sidebar visibility

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={{ ...styles.sidebar, width: isSidebarOpen ? "250px" : "60px" }}>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} style={styles.toggleButton}>
          {isSidebarOpen ? "❮" : "❯"}
        </button>

        {isSidebarOpen && (
          <>
            <div style={styles.logo}>
              <div style={styles.avatar}>A</div>
              <span style={styles.appName}>AppName</span>
            </div>
            <div style={styles.nav}>
              <button onClick={() => setSelectedOption("List")} style={styles.navButton}>
                • List
              </button>
              <button onClick={() => setSelectedOption("AI Team")} style={styles.navButton}>
                • AI Team
              </button>
            </div>
          </>
        )}
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {selectedOption === "AI Team" ? (
          <AiTeam />
        ) : selectedOption === "List" ? (
          <List />
        ) : (
          <>
            <h1 style={styles.heading}>{selectedOption}</h1>
            <p style={styles.subtext}>
              {selectedOption === "Welcome"
                ? "Select an option from the sidebar to begin."
                : `You are viewing the ${selectedOption}.`}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    backgroundColor: "#000",
    fontFamily: "Arial, sans-serif",
    color: "#fff",
  },
  sidebar: {
    backgroundColor: "#0d0d0d",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    transition: "width 0.3s ease",
    overflow: "hidden",
  },
  toggleButton: {
    position: "absolute",
    top: "10px",
    left: "10px",
    backgroundColor: "#333",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    fontSize: "18px",
    borderRadius: "5px",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#fff",
    color: "#000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "20px",
    fontWeight: "bold",
    marginRight: "10px",
  },
  appName: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  navButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "transparent",
    border: "1px solid #fff",
    color: "#fff",
    borderRadius: "5px",
    textAlign: "left",
    cursor: "pointer",
    marginBottom: "10px",
    fontSize: "16px",
    transition: "background 0.3s",
  },
  mainContent: {
    flex: 1,
    padding: "40px",
  },
  heading: {
    fontSize: "28px",
  },
  subtext: {
    fontSize: "16px",
    marginTop: "10px",
  },
};

export default HomePage;
