import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItinerariesPage from './pages/DashboardPage';


function App() {
  return (
    <BrowserRouter>
    {/* <HeaderComponent /> */}
      <Routes>
      <Route path="/dashboard/:id" element={<ItinerariesPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
