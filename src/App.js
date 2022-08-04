import { Routes, Route } from "react-router-dom";
import { Home } from "./pages";
import FourOFour from "./pages/fallback/FourOFour";
import InvitePage from "./pages/invitePage/InvitePage";


function App() {
  return (
   <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/room/:id' element={<InvitePage />}/>
        <Route path='*' element={<FourOFour />}/>
      </Routes>
   </>
  );
}

export default App;
