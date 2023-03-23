
import './App.css';
import { AddNewNote } from './components/AddNewNote';
import { Search } from './components/Search';
import { Context } from './components/context/Context';
import { useEffect, useLayoutEffect, useState } from 'react';
import { ListNotes } from './components/ListNotes';
import { Routes, Route } from 'react-router-dom';
import { Sort } from './components/Sort';


function App() {
  const [arrayOfNotes, setArrayOfNotes] = useState([])
  const [currentHashtag, setCurrentHashtag]=useState('')
  const [isSort, setIsSort]=useState(false)

  useLayoutEffect(()=>{
    setArrayOfNotes(JSON.parse(localStorage.getItem("array")) || [])
  },[])

useEffect(()=>{
  localStorage.setItem("array", JSON.stringify(arrayOfNotes));
},[arrayOfNotes])
  return (
    <div className='container'>
    <Context.Provider value={{ arrayOfNotes, setArrayOfNotes,currentHashtag, setCurrentHashtag, isSort, setIsSort }}>
     <div className='containerUpper'>
      <Search />
      <AddNewNote />
      </div>
      <Routes>
        <Route path="" element={<ListNotes />} />
        <Route path="/sort" element={<Sort/>} />
      </Routes>
    </Context.Provider>
    </div>
  );
}

export default App;
