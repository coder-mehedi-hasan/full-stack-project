import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Main from './pages/Main';
import Home from './pages/Home';
import Login from './pages/Login';
import SignIn from './pages/SignIn';
import Logout from './pages/Logout';
import CashMemo from './pages/CashMemo';
import { createContext, useReducer } from 'react';
import { initilState, reducer } from './reducer/NavigationReducer';
import NotFound from './pages/NotFound';
import CashmemoOutput from './components/CashmemoOutput';
import AllCollectedTax from './pages/AllCollectedTax';
export const userContext = createContext()

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>,
      children: [
        {
          path: '/',
          element: <Home></Home>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/signin',
          element: <SignIn></SignIn>
        },
        {
          path: '/করপরিশোধ',
          element: <CashMemo></CashMemo>
        },
        {
          path: '/:serialNo',
          element: <CashmemoOutput></CashmemoOutput>,
          loader: async ({ params }) => {
            const response = await fetch(`http://localhost:5000/${params.serialNo}`, {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
              },
              credentials: 'include'
            })
            return response.json()
          }
        },
        {
          path: '/সকল/পরিশোধিতকর',
          element: <AllCollectedTax></AllCollectedTax>,
        },
        {
          path: '/logout',
          element: <Logout></Logout>
        },
        {
          path: '*',
          element: <NotFound></NotFound>
        },
      ]
    }
  ])
  const [state, dispatch] = useReducer(reducer, initilState)
  return (
    <>
      <userContext.Provider value={{ state, dispatch }}>
        <RouterProvider router={router}></RouterProvider>
      </userContext.Provider>
    </>
  );
}

export default App;
