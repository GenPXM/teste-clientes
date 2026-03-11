import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import ClientsPage from '../pages/ClientsPage';
import ClientFormPage from '../pages/ClientFormPage';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/clients/new" element={<ClientFormPage />} />
        <Route path="/clients/edit/:id" element={<ClientFormPage />} />
      </Routes>
    </BrowserRouter>
  );
}