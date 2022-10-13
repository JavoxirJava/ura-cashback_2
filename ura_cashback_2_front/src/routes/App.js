import {Provider} from "react-redux";
import store from "../redux";
import {Route, Routes} from "react-router-dom";
import NotFount from "../pages/clint/notFaunt/NotFount";
import Order from "../pages/admin/order/Order";
import Company from "../pages/admin/company/Company";
import KassaClient from "../test/loginPage/KassaClient";
import Navbar from "../pages/clint/navbar/Navbar";
import Sidebar from "../pages/clint/navbar/Sidebar";
import AuthAdmin from "../pages/admin/userAdmin/AuthAdmin";
import Page from "../pages/admin/pagination/Page";

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
                <Route path='/company' element={<Company/>}/>
                <Route path='/page' element={<Page/>}/>
                <Route path='/*' element={<NotFount/>}/>
            </Routes>
        </Provider>
    );
}


export default App;
