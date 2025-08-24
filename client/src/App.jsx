import React from "react";
import { Route, Routes } from "react-router-dom"
import Home from "./pages/student/Home"
import CoursesList from "./pages/student/CoursesList";
import CourseBrowser from "./pages/student/CourseBrowser";
import CourseDetails from "./pages/student/CourseDetails";
import MyEnrollments from "./pages/student/MyEnrollments";
import Player from "./pages/student/Player";
import Loading from "./components/student/Loading";

import Dashboard from "./pages/educator/Dashboard";
import AddCourse from "./pages/educator/AddCourse";
import MyCourses from "./pages/educator/MyCourses";
import StudentsEnrolled from "./pages/educator/StudentsEnrolled";
import Navbar from "./components/student/Navbar";
import Login from "./pages/student/Login";
import Signup from "./pages/student/Signup";
const App = () => {
  return (
    <div className='text-default min-h-screen bg-white'>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/Course-list' element={<CoursesList/>}/>
        <Route path='/Course-list/:input' element={<CoursesList/>}/>
        <Route path='/browse-courses' element={<CourseBrowser/>}/>
        <Route path='/course/:id' element={<CourseDetails/>}/>
        <Route path='/my-enrollments' element={<MyEnrollments/>}/>
        <Route path='/player/:courseId' element={<Player/>}/>
        <Route path='loading/:path' element={<Loading/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/educator' element={<Dashboard/>}/>
        <Route path='/add-course' element={<AddCourse/>}/>
        <Route path='/my-courses' element={<MyCourses/>}/>
        <Route path='/student-enrolled' element={<StudentsEnrolled/>}/>
        
      </Routes>
    </div>
  );
}
export default App;