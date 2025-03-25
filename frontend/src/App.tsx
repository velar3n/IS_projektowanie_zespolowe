import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './18n.config';
import AuthLayout from './layouts/AuthLayout';
import AuthScreen from './pages/auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomeLayout from './layouts/HomeLayout';
import Home from './pages/home';
import { Provider } from './components/ui/provider';

const queryClient = new QueryClient();

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<HomeLayout />}>
              <Route index element={<Home />} />
            </Route>
            <Route path="login" element={<AuthLayout />}>
              <Route index element={<AuthScreen />} />
            </Route>
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
