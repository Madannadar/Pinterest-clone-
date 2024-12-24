import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/login';
import { UserData } from './context/userContext';

const App = () => {
  const {user} = UserData()

  console.log(user);
  
  return (
    <>
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
        </Routes>
        </BrowserRouter>
    </> 
  )
}

export default App;