import {Provider} from "react-redux";
import store from "../redux";
import {Route, Routes} from "react-router-dom";
import NotFount from "../pages/notFaunt/NotFount";
import Navbar from "../pages/navbar/Navbar";
import Sidebar from "../pages/navbar/Sidebar";
import AuthAdmin from "../pages/AuthAdmin";
import Order from "../pages/order/Order";
import Company from "../pages/Company";

function App() {
  return (
      <Provider store={store}>
        <Navbar/>
          <Sidebar/>
        <Routes>
          <Route path='/*' element={<NotFount/>}/>
          <Route path='/authAdmin' element={<AuthAdmin/>}/>
            <Route path='/order' element={<Order/>}/>
            <Route path='/company' element={<Company/>}/>
            <Route path='/*' element={<NotFount/>}/>
        </Routes>
      </Provider>
  );
}


export default App;
