import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './18n.config';
import AuthLayout from './layouts/AuthLayout';
import AuthScreen from './pages/auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/home';
import { Provider } from '@/components/ui/provider';
import MainLayout from './layouts/MainLayout';
import WithNavbarLayout from './layouts/AuthorizedLayout';
import Users from './pages/users';
import Polls from './pages/polls';
import Poll from './pages/polls/poll';
import SinglePoll from './pages/poll';
import { Toaster } from './components/ui/toaster';
import AdminLayout from './layouts/AdminLayout';
import MySubmissions from './pages/my-submissions';
import PollResults from './pages/poll/results';

const queryClient = new QueryClient();

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <MainLayout>
            <Routes>
              <Route path="/" element={<WithNavbarLayout />}>
                <Route index element={<Home />} />
                <Route path="/poll/:pollId" element={<SinglePoll />} />
                <Route path="/poll/:pollId/results" element={<PollResults />} />
                <Route path="/my-submissions" element={<MySubmissions />} />
                <Route element={<AdminLayout />}>
                  <Route path="/users" element={<Users />} />
                  <Route path="/polls" element={<Polls />} />
                  <Route path="/polls/poll" element={<Poll />} />
                </Route>
              </Route>
              <Route path="login" element={<AuthLayout />}>
                <Route index element={<AuthScreen />} />
              </Route>
            </Routes>
          </MainLayout>
          <Toaster />
        </QueryClientProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
