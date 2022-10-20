import {Provider} from "react-redux";
import store from "../redux";
import {Route, Routes} from "react-router-dom";
import NotFount from "../pages/clint/notFaunt/NotFount";
import Order from "../pages/admin/order/Order";
import KasserLogin from "../pages/admin/order/loginPage/KasserLogin";
import CompanyRegister from "../pages/admin/company/CompanyRegister";
import AuthClient from "../pages/admin/userAdmin/AuthUserCompany";
import AuthAdmin from "../pages/admin/userAdmin/AuthAdmin";
import KassaClient from "../pages/admin/order/loginPage/KassaClient";
import Company from "../pages/admin/company/CompanyAdmin";
import AuthUserCompany from "../pages/admin/userAdmin/AuthUserCompany";


//https://www.w3schools.com/react/showreact.asp?filename=demo2_react_usememo // add uchun menga kk

function App() {
    return (
        <Provider store={store}>
            <Routes>
                <Route path='/' element={<KassaClient/>}/>
                <Route path='/user' element={<AuthAdmin/>}/>
                <Route path='/order' element={<Order/>}/>
                <Route path='/company' element={<Company/>}/>
                <Route path='/company/register' element={<CompanyRegister/>}/>
                <Route path='/authUserCompany/register' element={<AuthUserCompany/>}/>
                <Route path='/authClient' element={<AuthClient/>}/>
                <Route path='/order/login' element={<KasserLogin/>}/>
                <Route path='/*' element={<NotFount/>}/>
            </Routes>
        </Provider>
    );
}


export default App;
