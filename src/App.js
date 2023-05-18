import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import { useEffect,useState } from 'react';

const data = [{ id: 0, value: 12, sign: "plus", enable: true },
{ id: 1, value: 12, sign: "plus", enable: true },
{ id: 2, value: 1, sign: "plus", enable: true },
{ id: 3, value: 12, sign: "minus", enable: true }]


function App() {
  const [rows, setRows] = useState(data);
  const [result, setResult] = useState(0);
  const [dirty, setDirty] = useState(false);
  const [errorMsg, setErrorMsg] = useState();

  const calculateResult=()=> {
    let result = rows.map((e) => {
      if (e.enable) {
        if (e.sign == "minus") {
            return Number(-(e.value));
        }
        return Number(e.value);
      }else{
        return 0;
      }
    }).reduce((a, b) => a + b);
    setResult(result);
}

useEffect(() => {
    calculateResult()
}, [dirty]);

  function deleteRow(id) {
    setRows((rows) =>
      rows.filter((e) => (e.id != id))
    )
    setDirty((e)=>!e)
  }

  function setEnable(obj) {
    if (obj.sign=="plus/minus") {
      setErrorMsg("You should first select the sign")
    }else{
      setRows(
        rows.map((e) => {
          return e.id === obj.id
            ? {
              id: e.id,
              value: obj.value,
              sign: obj.sign,
              enable: !obj.enable
            }
            : e
        })
      )
      setDirty((e)=>!e);
    }
  }

  function setValue(obj, value) {
    let newRows=rows.map((e) => {
      return e.id === obj.id
        ? {
          id: e.id,
          value: +value,
          sign: e.sign,
          enable: e.enable
        }
        : e
    })
    setRows(
      newRows
    )
    setDirty((e)=>!e)
    
  }

  function setSign(obj, sign) {
    setRows(
      rows.map((e) => {
        return e.id === obj.id
          ? {
            id: e.id,
            value: e.value,
            sign: sign,
            enable: e.enable
          }
          : e
      })
    )
    setDirty((e)=>!e);
    setErrorMsg("");
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home rows={rows} setRows={setRows} deleteRow={deleteRow} setEnable={setEnable} setSign={setSign} setValue={setValue} result={result} calculateResult={calculateResult} errorMsg={errorMsg} setErrorMsg={setErrorMsg}/>} />
      </Routes>
    </Router>
  );
}

export default App;
