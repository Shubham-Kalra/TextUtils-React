// import logo from './logo.svg';
import './App.css';
// import About from './components/About';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import { useState } from 'react';
import Alert from './components/Alert';
import About from './components/About';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [mode, setMode] = useState('light');
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })

    setTimeout(()=>{
      setAlert(null);
    }, 1500);
  }

  const toggleMode = ()=>{
    if (mode === 'light'){
      setMode('dark');
      document.body.style.backgroundColor = 'black';
      showAlert("DarkMode has been enabled.", "success");
      document.title = 'TextUtils - DarkMode';

      // setInterval(() => {
      //   document.title = 'TextUtils is Amazing';
      // }, 2000);
      // setInterval(() => {
      //   document.title = 'Install TextUtils Now';
      // }, 1500);
    }
    else{
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert("DarkMode has been disbled.", "success");
      document.title = 'TextUtils - LightMode';
    }
  }

  return (
    <>
    <Router>

    {/* users --> Component 1               if path is used instead of exact path in Route then Component 1 will be fetched in both the cases as it will then do partial matching.
    users/home --> Component 2 */}

      <Navbar title="TextUtils" aboutText="About TextUtils" mode={mode} toggleMode={toggleMode} />
      {/* <Navbar/> */}
      <Alert alert={alert}/>
      <Routes>
          <Route exact path="/about" element={<About/>}/>
          <Route exact path="/" element={<TextForm heading="Enter the Text to Analyse" mode={mode} showAlert={showAlert}/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
