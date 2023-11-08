import React, {useState} from "react"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"

import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import About from "./pages/About/About"
import CardDetails from "./pages/CardDetails/CardDetails"
import Home from "./pages/Home/Home"
import Search from "./pages/Search/Search"

function App() {
  const [hide, setHide] = useState(false)

  const routeVisible = (visible) => {
    setHide(visible)
  }
  return (
    <>
      <div className='background-div'></div>
      <Router>
        {!hide && <Header />}
        <main className='main-content'>
          <div className='container'>
            <Routes>
              <Route
                path='/'
                element={<Home />}
              />
              <Route
                path='/search'
                element={<Search />}
              />
              <Route
                path='/about'
                element={<About />}
              />

              <Route
                path='/cocktails/:category/:id'
                element={<CardDetails routeVisible={routeVisible} />}
              />
            </Routes>
          </div>
        </main>
        {!hide && <Footer />}
      </Router>
    </>
  )
}

export default App
