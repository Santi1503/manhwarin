import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import ManhwaDetail from './pages/ManhwaDetail';
import { ManhwaListProvider } from './context/ManhwaListContext';

// Componente para proteger rutas que requieren autenticación
function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}

// Componente para rutas públicas (solo accesibles si NO hay usuario autenticado)
function PublicRoute({ children }) {
  const { currentUser } = useAuth();
  return !currentUser ? children : <Navigate to="/profile" />;
}

function App() {
  return (
    <ManhwaListProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                {/* Rutas públicas */}
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<Home />} />
                  <Route path="manhwa/:id" element={<ManhwaDetail />} />
                </Route>
                
                {/* Rutas de autenticación (solo accesibles si NO hay usuario autenticado) */}
                <Route path="/login" element={
                  <PublicRoute>
                    <LoginForm />
                  </PublicRoute>
                } />
                <Route path="/register" element={
                  <PublicRoute>
                    <RegisterForm />
                  </PublicRoute>
                } />
                
                {/* Rutas protegidas (solo accesibles si hay usuario autenticado) */}
                <Route path="/profile" element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                } />
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </ManhwaListProvider>
  );
}

export default App;
