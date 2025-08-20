import React from "react";
import { Route, Routes } from "react-router-dom"
import Home from "./pages/student/Home"
import CoursesList from "./pages/student/CoursesList";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Course-List' element={<CoursesList/>} />
      
      </Routes>
    </div>
  );
}
export default App;