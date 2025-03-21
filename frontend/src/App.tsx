import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ThemeProvider from './contexts/ThemeProvider';
import './18n.config';
import AuthLayout from './layouts/AuthLayout';
import AuthScreen from './pages/auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomeLayout from './layouts/HomeLayout';
import Home from './pages/home';

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Routes>
            <Route path="/" element={<HomeLayout />}>
              <Route index element={<Home />} />
            </Route>
            <Route path="login" element={<AuthLayout />}>
              <Route index element={<AuthScreen />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
