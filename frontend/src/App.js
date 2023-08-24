import logo from './logo.svg';
import "@picocss/pico/css/pico.min.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import FileForm from './components/FileForm';
import LatestImage from './components/LatestImage';
import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import Signup from './components/Signup';
import { useContext } from 'react';
import { UserContext } from './context/User';
import Login from './components/Login';
import Profile from './components/Profile';
import ProfileForm from './components/ProfileForm';
import ProductForm from './components/ProductForm';



function App() {
const { loggedIn, user } = useContext( UserContext)

  if (!loggedIn) {
    return (
      <Router>
        <Routes>
          <Route exact path="/signup" element={<Signup/>}/>
          <Route path="/*" element={<Login />} />
        </Routes>
      </Router>
    )
  } else {

    return (
      <div className="App">
       <Router>
        <NavigationBar/>
        <Routes>
        <Route exact path="/file-form" element={<FileForm/>}/>
        <Route exact path="/latest-image" element={<LatestImage/>}/>
        <Route exact path="/profile" element={<Profile/>}/>
        <Route exact path="/profile-form" element={<ProfileForm/>}/>
        <Route exact path="/product-form" element={<ProductForm/>}/>
        <Route exact path='/' element={<Home />} />
          {/* <Route exact path='/signup' element={<Signup />} /> */}
        </Routes>
      </Router>
      </div>
    );
  }
}

export default App;
