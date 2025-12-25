import { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

function App() {
  const [apiStatus, setApiStatus] = useState("Checking...");
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    axios.get("/api")
      .then(res => setApiStatus("Online"))
      .catch(() => setApiStatus("Offline"));

    axios.get("/users")
      .then(res => setUsers(res.data))
      .catch(() => setUsers([]))
      .finally(() => setLoadingUsers(false));
  }, []);

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <header style={styles.header}>
        <h1 style={styles.title}>☁️ Zeeshan Ali — Cloud Engineer Portfolio</h1>
        <p style={styles.subtitle}>Building scalable cloud systems. Ready for remote cloud roles.</p>
      </header>

      {/* 3-TIER APP STATUS */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>🚀 Live 3-Tier Cloud Portfolio App</h2>

        <div style={styles.tierBox}>
          <div style={styles.tierItem}>
            <h3 style={styles.tierTitle}>Frontend (React)</h3>
            <p style={styles.ok}>Running Locally ✔</p>
          </div>

          <div style={styles.tierItem}>
            <h3 style={styles.tierTitle}>Backend (Node.js API)</h3>
            <p style={apiStatus === "Online" ? styles.ok : styles.error}>
              {apiStatus === "Online" ? "Online ✔" : "Offline ✖"}
            </p>
          </div>

          <div style={styles.tierItem}>
            <h3 style={styles.tierTitle}>Database (MySQL)</h3>
            <p style={users.length > 0 ? styles.ok : styles.error}>
              {users.length > 0 ? "Connected ✔" : "No Data ✖"}
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>👨‍💻 About Me</h2>
        <p style={styles.text}>
          I am <strong>Zeeshan Ali</strong>, a cloud-focused engineer with hands-on networking,
          Linux, AWS, Terraform, and multi-tier system deployment.  
          I am building this 3-Tier Cloud App to showcase my cloud engineering skills with
          real backend and database connectivity.
        </p>
      </section>

      {/* SKILLS */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>⚡ Cloud & Dev Skills</h2>

        <ul style={styles.skillList}>
          <li>✓ AWS VPC, Subnets, NAT, Route Tables</li>
          <li>✓ EC2, Load Balancers, S3, CloudFront</li>
          <li>✓ Terraform (IaC)</li>
          <li>✓ Docker + Cloud deployments</li>
          <li>✓ Node.js API development</li>
          <li>✓ React Frontend</li>
          <li>✓ MySQL RDS Database</li>
          <li>✓ Linux, Networking, Firewalls</li>
        </ul>
      </section>

      {/* DATABASE USERS */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>📦 Live Data from MySQL</h2>

        {loadingUsers ? (
          <p>Loading users...</p>
        ) : users.length === 0 ? (
          <p style={{ color: "red" }}>No users found in database.</p>
        ) : (
          <ul style={styles.userList}>
            {users.map((u) => (
              <li key={u.id} style={styles.userItem}>
                <strong>{u.name}</strong> — {u.role}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <p>© 2025 Zeeshan Ali — Cloud Engineer Portfolio</p>
      </footer>
    </div>
  );
}

export default App;

// -----------------------
// STYLING
// -----------------------
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    maxWidth: 900,
    margin: "auto",
    padding: 20,
    color: "#333",
  },
  header: {
    textAlign: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
  },
  subtitle: {
    color: "#666",
  },
  section: {
    marginBottom: 40,
    padding: 20,
    borderRadius: 10,
    background: "#f8f8ff",
    border: "1px solid #e0e0e0",
  },
  sectionTitle: {
    fontSize: 24,
    marginBottom: 15,
  },
  tierBox: {
    display: "flex",
    justifyContent: "space-between",
  },
  tierItem: {
    width: "30%",
    background: "white",
    padding: 15,
    borderRadius: 10,
    border: "1px solid #ddd",
    textAlign: "center",
  },
  tierTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  ok: {
    color: "green",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    lineHeight: "1.6",
  },
  skillList: {
    listStyle: "none",
    paddingLeft: 0,
    lineHeight: "1.8",
  },
  userList: {
    listStyle: "none",
    paddingLeft: 0,
  },
  userItem: {
    background: "white",
    padding: 10,
    borderRadius: 6,
    marginBottom: 8,
    border: "1px solid #ddd",
  },
  footer: {
    marginTop: 50,
    textAlign: "center",
    color: "#777",
    fontSize: 14,
  },
};

