import {Provider} from "react-redux";
import store from "../redux";
import {Route, Routes} from "react-router-dom";
import NotFount from "../pages/clint/notFaunt/NotFount";
import AuthAdmin from "../pages/admin/AuthAdmin";

import Order from "../pages/admin/order/Order";
import Company from "../pages/admin/company/Company";
import Sidebar from "../pages/clint/navbar/Sidebar";
import KasserLogin from "../pages/admin/order/loginPage/KasserLogin";

//https://www.w3schools.com/react/showreact.asp?filename=demo2_react_usememo // add uchun menga kk

function App() {
    return (
        <Provider store={store}>
            {/*<Navbar/>*/}
            <Sidebar/>
            <Routes>
                <Route path='/authAdmin' element={<AuthAdmin/>}/>
                <Route path='/order' element={<Order/>}/>
                <Route path='/company' element={<Company/>}/>
                <Route path='/order/login' element={<KasserLogin/>}/>
                <Route path='/*' element={<NotFount/>}/>
            </Routes>
        </Provider>
    );
}


export default App;
