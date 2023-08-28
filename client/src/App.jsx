import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ContextWrapper } from "./context/GlobalContext";
import { PublicLayout } from "./layout/PublicLayout";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Page404 } from "./pages/Page404";
import { List } from "./pages/List";


function App() {
  return (
    <ContextWrapper>
      <BrowserRouter>
        <Routes>
          <Route Component={PublicLayout}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/list" element={<List />}></Route>
          </Route>
          {/* <Route Component={UserLayout}>
            <Route path='/dashboard' element={}></Route>
          </Route> */}
          <Route Component={PublicLayout}>
            <Route path="*" element={<Page404 />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ContextWrapper>
  )
}

export default App;
