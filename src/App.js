
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Homepage } from './Components/Homepage';
import { UserDashboard } from './Components/UserDashboard';

function App() {

  


  return (
    <div className="App">
      <BrowserRouter basename='/website-clone'>
      <Routes>
        <Route path='/' element={<Homepage />}></Route>
        <Route path='/dashboard' element={<UserDashboard />} />

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
