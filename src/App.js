import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ImageCaptionerPage from './pages/ImageCaptioner';
import Test from './pages/Test';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<ImageCaptionerPage />} />
          <Route path="/test" element={<Test />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;