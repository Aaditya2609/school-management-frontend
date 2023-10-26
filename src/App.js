import { Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import StudentPage from './pages/StudentPage';
import TeachersPage from './pages/TeachersPage';
import ClassesPage from './pages/ClassesPage';
import SchoolPage from './pages/SchoolPage';
import LinksPage from './pages/LinksPage';

function App() {
  return (
    <div className="w-full text-center flex justify-between">
      <Nav />
      <div className='w-full'>
      <Routes>
        <Route path="/" element={<StudentPage />} />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route path="/classes" element={<ClassesPage />} />
        <Route path="/school" element={<SchoolPage />} />
        <Route path="/links" element={<LinksPage />} />
      </Routes>
      </div>
    </div>
  );
}

export default App;
