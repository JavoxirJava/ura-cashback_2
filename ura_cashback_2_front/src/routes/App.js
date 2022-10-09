import {Provider} from "react-redux";
import store from "../redux";
import {Route, Routes} from "react-router-dom";
import NotFount from "../pages/notFaunt/NotFount";
import Navbar from "../pages/navbar/Navbar";
import Sidebar from "../pages/navbar/Sidebar";
import AuthAdmin from "../pages/AuthAdmin";
import Order from "../pages/order/Order";

function App() {
  return (
      <Provider store={store}>
        <Navbar/>
          <Sidebar/>
        <Routes>
            <Route path='/order' element={<Order/>}/>
            <Route path='/*' element={<NotFount/>}/>
        </Routes>
      </Provider>
  );
}


export default App;
