import React from 'react';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import { CreatePost, Header, Home } from './pages';


function App() {

  return (
    <div className=' min-h-screen bg-[#121212]'>
      <BrowserRouter>

        <Header />

        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/create-post' element={<CreatePost />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>


  )
}

export default App
