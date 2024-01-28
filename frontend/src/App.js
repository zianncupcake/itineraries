import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItinerariesPage from './pages/DashboardPage';
import DestinationPage from './pages/DestinationPage';


function App() {
  return (
    <BrowserRouter>
    {/* <HeaderComponent /> */}
      <Routes>
      <Route path="/dashboard/:id" element={<ItinerariesPage />} />
      <Route path="/destination/:id" element={<DestinationPage />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
