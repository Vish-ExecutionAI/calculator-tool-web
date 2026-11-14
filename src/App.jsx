import { useState } from "react";
import Calculator from "./components/Calculator.jsx";
import UsersList from "./components/UsersList.jsx";
import "./styles.css";

export default function App() {
  const [section, setSection] = useState("Dashboard");

  return (
    <div className="shell">
      <aside>
        <h1>Calculator Tool</h1>
        <button onClick={() => setSection("Dashboard")} className={section === "Dashboard" ? "active" : ""}>Dashboard</button>
        <button onClick={() => setSection("Users")} className={section === "Users" ? "active" : ""}>Users</button>
      </aside>
      <main>
        <span>Generated application</span>
        <h2>{section}</h2>
        {section === "Dashboard" && <Calculator />}
        {section === "Users" && <UsersList />}
      </main>
    </div>
  );
}