import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Main from './Main/Main';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Error from './Pages/Error';
import Signup from './Pages/Signup';
import MyCart from './Pages/MyCart';
import MyOrders from './Pages/MyOrders';
import { CartProvider } from './reducer/ContextReducer';

function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element:(<Main></Main>),
      children:[
        {
          path:'/',
          element:(<Home></Home>)
        },
        {
          path:'/login',
          element:(<Login></Login>)
        },
        {
          path:'/signup',
          element:(<Signup></Signup>)
        },
        {
          path:'/mycart',
          element:(<MyCart></MyCart>)
        },
        {
          path:'/myorder',
          element:(<MyOrders></MyOrders>)
        },
        {
          path:'*',
          element:(<Error></Error>)
        },
      ]
    }
  ])
  return (
    <CartProvider>
    <RouterProvider router={router}></RouterProvider>
    </CartProvider>
  );
}

export default App;
