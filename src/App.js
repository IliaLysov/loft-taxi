import './App.css';
import React, {useState} from 'react';
import Start from './Components/Start/Start'
import Map from './Components/Map/Map'

function App() {
  const [login, setLogin] = useState(false)

  return (
    <div className="App">
      {login ? <Map /> : <Start setLogin={setLogin} />}
    </div>
  )
}

export default App;
