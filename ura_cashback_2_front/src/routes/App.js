import {Provider} from "react-redux";
import store from "../redux";
import {Route, Routes} from "react-router-dom";
import NotFount from "../pages/clint/notFaunt/NotFount";
import Order from "../pages/admin/order/Order";
import KasserLogin from "../pages/admin/order/loginPage/KasserLogin";
import AuthUserCompany from "../pages/admin/userAdmin/AuthUserCompany";
import AuthAdmin from "../pages/admin/userAdmin/AuthAdmin";
import KassaClient from "../pages/admin/order/loginPage/KassaClient";
import Company from "../pages/admin/company/CompanyAdmin";
import CompanyClint from "../pages/admin/company/CompanyClint";
import ClientRegister from "../pages/admin/userAdmin/ClientRegister";


//https://www.w3schools.com/react/showreact.asp?filename=demo2_react_usememo // add uchun menga kk

function App() {
    return (
        <Provider store={store}>
            <Routes>
                <Route path='/' element={<KassaClient/>}/>
                <Route path='/user' element={<AuthAdmin/>}/>
                <Route path='/order' element={<Order/>}/>
                <Route path='/company' element={<Company/>}/>
                <Route path='/company/register' element={<CompanyClint/>}/>
                <Route path='/authUserCompany/register' element={<AuthUserCompany/>}/>
                <Route path='/order/login' element={<KasserLogin/>}/>
                <Route path='/client' element={<ClientRegister/>}/>
                <Route path='/*' element={<NotFount/>}/>
            </Routes>
        </Provider>
    );
}


export default App;
