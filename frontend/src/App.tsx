import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ThemeProvider from './contexts/ThemeProvider';
import './18n.config';
import AuthLayout from './layouts/AuthLayout';
import AuthScreen from './pages/auth';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route path="login" element={<AuthLayout />}>
            <Route index element={<AuthScreen />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
