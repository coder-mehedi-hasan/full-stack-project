import './App.css';
import Main from './pages/Main';
import About from './pages/About';
import Home from './pages/Home';
import Login from './pages/Login';
import Signin from './pages/Signin'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import { initialState , empReducer} from './reducer/empReducer'
import { createContext, useReducer } from 'react';
import Logout from './pages/Logout';
import RegisterMember from './pages/RegisterMember';
import Error from './pages/Error';
import AllMembers from './pages/AllMembers';
import SingleMember from './pages/SingleMember';
import DepositePost from './pages/DepositePost';
export const empContext = createContext()

function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element:<Main/>,
      children:[
        {
          path:'/',
          element:<Home></Home>
        },
        {
          path:'/about',
          element:<About></About>
        },
        {
          path:'/login',
          element:<Login></Login>
        },
        {
          path:'/signin',
          element:<Signin></Signin>
        },
        {
          path:'/logout',
          element:<Logout></Logout>
        },
        {
          path:'/logout',
          element:<Logout></Logout>
        },
        {
          path:'/registermember',
          element:<RegisterMember></RegisterMember>
        },
        {
          path:'/allmembers',
          element:<AllMembers></AllMembers>
        },
        {
          path:'/:id',
          element:<SingleMember></SingleMember>,
          loader:async ({params})=>{
            const response = await fetch(`http://localhost:5000/${params.id}`,{
              method:'GET',
              headers:{
                Accept:'application/json',
                "Content-Type":"application/json"
              },
              credentials:'include'
            })
            return response.json()
          }
        },
        {
          path:'*',
          element:<Error></Error>
        },
        {
          path:'/postDeposite',
          element:<DepositePost></DepositePost>
        },
      ]

    }

  ])
  const [state, dispatch] = useReducer( empReducer,initialState)
  return (
    <>
    <empContext.Provider value={{state,dispatch}}>
    <RouterProvider router={router}></RouterProvider>
    </empContext.Provider>
    </>
  );
}

export default App;
