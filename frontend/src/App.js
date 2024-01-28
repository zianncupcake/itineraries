import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItinerariesPage from './pages/DashboardPage';
import DestinationPage from './pages/DestinationPage';
import NavComponent from './components/NavComponent';


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/dashboard/:id" element={<ItinerariesPage />} />
      <Route path="/destination/:id" element={<DestinationPage />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
