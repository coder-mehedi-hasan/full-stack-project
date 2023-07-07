import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Main from './components/Main';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Register from './components/Register';
import Errorpage from './components/Errorpage';
import Logout from './components/Logout';
import { createContext, useReducer } from 'react';
import { initialState, reducer } from './reducer/UserReduce';
export const userContext = createContext()

function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element:(<Main></Main>),
      children:[
        {
          path:'/',
          element:(<Home></Home>),
        },
        {
          path:'about',
          element:(<About></About>)
        },
        {
          path:'contact',
          element:(<Contact></Contact>)
        },
        {
          path:'login',
          element:(<Login></Login>)
        },
        {
          path:'register',
          element:(<Register></Register>)
        },
        {
          path:'*',
          element:(<Errorpage></Errorpage>)
        },
        {
          path:'logout',
          element:(<Logout></Logout>)
        }
      ]
    }
  ])
  const [state , dispatch] = useReducer(reducer , initialState)
  return (
    <>
    <userContext.Provider value={{state , dispatch}}>
    <RouterProvider router={router}></RouterProvider>
    </userContext.Provider>
    </>
  );
}

export default App;
