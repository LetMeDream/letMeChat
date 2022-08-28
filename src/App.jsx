import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Room1 from './pages/Room1'



function App() {

  return (
    <Routes>
      {/* Home */}
      <Route path='/' element={<Home/>}></Route>
      <Route path='/letMeChat/' element={<Home/>}></Route>
      {/* General chat room */}
      <Route path='/letMeChat/Reposteros' element={<Room1/>}></Route>

    </Routes>
  )
}

export default App
