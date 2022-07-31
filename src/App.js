import { Routes, Route } from "react-router-dom";
import { Home, Login } from "./pages";


function App() {
  return (
   <>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Home/>}/>
      </Routes>
   </>
  );
}

export default App;
