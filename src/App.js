import Layout from "./components/Layout/Layout";
import './App.css';
import logo from './logo.jpg';

function App() {
  return (
    <div className="App">
      <div className="App-content">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Layout />
      </div>

      <footer className="App-footer" style={{ margin: "0px" }}>
        <p className="footer-text">&copy; 2022 Emre Taşdemir</p>
      </footer>
    </div>
  );
}

export default App;
