import './App.css';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import GlobalContextProvider from './contexts/GlobalContext';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import useGlobalContext from './hooks/useGlobalContext';

function ProtectedRoutes({ children }: { children: JSX.Element; }) {
  const { authToken } = useGlobalContext();

  if (!authToken) {
    return (
      <Navigate to='/' />
    );
  }

  return children;
}

function App() {

  return (
    <div className="App">
      <GlobalContextProvider>
        <Router>
          <Routes>
            <Route path={'/'} element={<SignIn />} />
            <Route path={'/sign-up'} element={<SignUp />} />
            <Route
              path={'/home'}
              element={
                <ProtectedRoutes>
                  <Home />
                </ProtectedRoutes>
              }
            />
          </Routes>
        </Router>
      </GlobalContextProvider>
    </div>
  );
}

export default App;
