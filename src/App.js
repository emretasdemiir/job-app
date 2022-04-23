import Layout from "./components/Layout/Layout";
import './App.css';
import logo from './logo.jpg';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Layout />
    </div>
  );
}

export default App;
