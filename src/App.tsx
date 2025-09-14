import { Outlet } from 'react-router'
import './App.css'
import CommonLayouts from './components/layouts/CommonLayouts'





function App() {

  return (
    <>
      <CommonLayouts>
          <Outlet/>
      </CommonLayouts>
    </>
      
  )
}

export default App
