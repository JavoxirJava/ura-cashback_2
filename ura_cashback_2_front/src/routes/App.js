import {Provider} from "react-redux";
import store from "../redux";
import {Route, Routes} from "react-router-dom";
import NotFount from "../pages/clint/notFaunt/NotFount";
import AuthAdmin from "../pages/admin/AuthAdmin";

import Order from "../pages/admin/order/Order";
import KassaClient from "../test/loginPage/KassaClient";
import Navbar from "../pages/clint/navbar/Navbar";
import Sidebar from "../pages/clint/navbar/Sidebar";
import Company from "../pages/admin/company/Company";
import CompanyRegister from "../pages/clint/company/Company";

//https://www.w3schools.com/react/showreact.asp?filename=demo2_react_usememo // add uchun menga kk

function App() {
    return (
        <Provider store={store}>
            <Navbar/>
            <Sidebar/>
            <Routes>
                <Route path='/' element={<KassaClient/>}/>
                <Route path='/user' element={<AuthAdmin/>}/>
                <Route path='/order' element={<Order/>}/>
                <Route path='/admin/company' element={<Company/>}/>
                <Route path='/company' element={<CompanyRegister/>}/>
                <Route path='/*' element={<NotFount/>}/>
            </Routes>
        </Provider>
    );
}
export default App;
