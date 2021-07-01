import React from 'react'
import ReactDOM from 'react-dom'
import './App.css';
import Main from './Components/Main'

function App() {
  return (
    <>
    <div>
      <h2>Astro Quiz</h2>
    </div>
    <div className="App">
      <Main />
    </div>
    </>
  );
}
const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)
// export default App;
