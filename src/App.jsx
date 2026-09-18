
import { Outlet } from 'react-router';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

function App() {

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
