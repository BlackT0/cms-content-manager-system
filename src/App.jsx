import './App.scss';
import {BrowserRouter, Route, Link} from 'react-router-dom'

import Login from './pages/Login/Login'
import Main from './pages/Main/Main'
import Test from './pages/Test/Test'


function App() {
    return (
        <BrowserRouter>
            <Route exact path='/' component={Login}/>
            <Route path='/main' component={Main}/>
            <Route path='/test' component={Test}/>
        </BrowserRouter>
    );
}

export default App;
