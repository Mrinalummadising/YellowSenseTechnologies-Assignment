import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BottomNavBar from "./components/BottomNavBar";
import Jobs from "./pages/Jobs";
import BookMarks from "./pages/BookMarks";
import JobDetails from "./pages/JobDetails";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Jobs />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/bookmarks" element={<BookMarks />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
        </Routes>
        <BottomNavBar />
      </div>
    </Router>
  );
};

export default App;
