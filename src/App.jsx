import logo from './logo.svg';
import './App.css';
import Specialists from './HomePage/Specialists/Specialists';
import Features from './HomePage/Features/Features';

function App() {
  return (
    <div className="App">
      <section>
        <Specialists/>
        <Features/>
      </section>
    </div>
  );
}

export default App;
