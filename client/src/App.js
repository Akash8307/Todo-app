import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Navbar from './components/Navbar';
import Home from './components/Home';
import {Switch,Route, Routes} from 'react-router-dom';
import Register from './components/Register';
import Edit from './components/Edit';
import Details from './components/Details';
function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/edit/:id' component={Edit} />
        <Route exact path='/view/:id' component={Details} />
      </Switch>
    </>
  )
}

export default App;
