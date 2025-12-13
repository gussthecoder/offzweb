import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AllProjects from './components/AllProjects';

function App() {
  return (
    <Router>
      <div className="bg-background text-white min-h-screen selection:bg-white selection:text-black">
        <Navbar />
        
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Services />
                <Portfolio />
                <Contact />
              </>
            } />
            <Route path="/projects" element={<AllProjects />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;