import Layout from "./components/Layout/Layout";
import './App.css';
import logo from './logo.jpg';
import { Footer } from "antd/lib/layout/layout";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Layout />
      <footer className="App-footer">
        <p className="footer-text">&copy; 2022 Emre Taşdemir</p>
      </footer>
    </div>
  );
}

export default App;
