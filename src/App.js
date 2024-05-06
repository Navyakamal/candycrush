import { Route,Routes } from 'react-router-dom';
import './App.css';
import Landing from './Landing';
import Home from './Home';





function App() {
  return (
    <div className="App">
<Routes>
          <Route path='/' element={<Landing></Landing>}></Route>
          <Route path='/home' element={<Home></Home>}></Route>  
</Routes>   
 </div>
  );
}

export default App;
