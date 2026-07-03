import React from 'react';
import {BrowserRouter as Router , Routes , Route , Navigate} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import DashBoard from './pages/dashboard/DashBoard'
import DocumentListPage from './pages/documents/DocumentListPage'
import DocumentDetailPage from './pages/documents/DocumentDetailPage'
import FlashCardListPage from './pages/flashcards/FlashCardListPage'
import FlashCardPage from './pages/flashcards/FlashCardPage'
import QuizTakePage from './pages/quizzes/QuizTakePage'
import QuizResultPage from './pages/quizzes/QuizResultPage'
import ProfilePage from './pages/profile/ProfilePage'
import ProtectedRoute from './components/auth/ProtectedRoute'
import { useAuth } from './context/AuthContext';

const App = () => {
  const {isAuthenticated,loading} = useAuth();

  if(loading){
    return(
        <div className='flex items-center justify-center h-screen bg-canvas'>
          <span className='inline-block h-8 w-8 rounded-full border-[3px] border-brand-500/25 border-t-brand-500 animate-spin' />
        </div>
    );
  }

  return(
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/login' element={isAuthenticated ? <Navigate to="/dashboard" replace/> : <LoginPage/>}/>
        <Route path='/register' element={isAuthenticated ? <Navigate to="/dashboard" replace/> : <RegisterPage/>}/>

        {/*ProtectedRoute*/}
        <Route element={<ProtectedRoute/>}>
        <Route path='/dashboard' element={<DashBoard/>}/>
        <Route path='/documents' element={<DocumentListPage/>}/>
        <Route path='/documents/:id' element={<DocumentDetailPage/>}/>
        <Route path='/flashcards' element={<FlashCardListPage/>}/>
        <Route path='/documents/:id/flashcards' element={<FlashCardPage/>}/>
        <Route path='quizzes/:quizId' element={<QuizTakePage/>}/>
        <Route path='/quizzes/:quizId/results' element={<QuizResultPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        </Route>

        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
    </Router>
  )
}

export default App