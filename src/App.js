
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import { Provider } from "react-redux";
import store from './components/redux/store/store'
import Error404 from "./components/pages/Error404";
import Register from "./components/pages/auth/Register";
import Activate from "./components/pages/auth/Activate";
import Login from "./components/pages/auth/Login";
import ResetPassword from "./components/pages/auth/ResetPassword";
import ResetPasswordConfirm from "./components/pages/auth/ResetPasswordConfirm";


function App() {
  return (
    <Provider store={store}>
    <Router>
      <Routes>
        <Route path='' element={<Home/>}/>
        <Route path='*' element={<Error404/>}/>

        {/* Authentication*/}

          <Route path='/signup' element={<Register/>}/>
          <Route path='/activate/:uid/:token' element={<Activate/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/reset_password' element={<ResetPassword/>}/>
          <Route path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm/>}/>
        
        
      </Routes>
    </Router>
    </Provider>
    
    
    );
}

export default App;
