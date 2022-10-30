import {Provider} from "react-redux";
import store from "../redux";
import {Route, Routes} from "react-router-dom";
import NotFount from "../pages/clint/notFaunt/NotFount";
import Order from "../pages/admin/order/Order";
import KasserLogin from "../pages/admin/order/loginPage/KasserLogin";
import AuthUserCompany from "../pages/admin/userAdmin/AuthUserCompany";
import AuthAdmin from "../pages/admin/userAdmin/AuthAdmin";
import CompanyAdmin from "../pages/admin/company/CompanyAdmin";
import CompanyClint from "../pages/admin/company/CompanyClint";
import ClientRegister from "../pages/admin/userAdmin/ClientRegister";
import Home from "../pages/admin/home/Home";
import LoginCompany from "../pages/admin/company/LoginCompany";
import CabinetOrder from "../pages/companyCabinet/CabinetOperation";
import CompanyKassa from "../pages/companyCabinet/CompanyKassa";
import CabinetClient from "../pages/companyCabinet/CabinetClient";
import CompanySettings from "../pages/companyCabinet/CompanySettings";
import AdminPanel from "../pages/admin/company/AdminPanel";


//https://www.w3schools.com/react/showreact.asp?filename=demo2_react_usememo // add uchun menga kk

function App() {
    return (
        <Provider store={store}>
            <Routes>
                //
                <Route path='/' element={<Home/>}/>
                //

                //SuperAdminPanel
                <Route path='/admin' element={<AdminPanel/>}/>
                <Route path='/company' element={<CompanyAdmin/>}/>
                <Route path='/user' element={<AuthAdmin/>}/>
                <Route path='/order' element={<Order/>}/>
                <Route path='/*' element={<NotFount/>}/>
                //

                //registerCompanyAdmin
                <Route path='/authUserCompany/register' element={<AuthUserCompany/>}/>
                <Route path='/company/register' element={<CompanyClint/>}/>
                //

                //Company cabinet
                <Route path='/cabinetOrder' element={<CabinetOrder/>}/>
                <Route path='/company/settings' element={<CompanySettings/>}/>
                <Route path='/cabinetClient' element={<CabinetClient/>}/>
                <Route path='/company/kassa' element={<CompanyKassa/>}/>
                //


                //client register
                <Route path='/client' element={<ClientRegister/>}/>
                //

                //login
                <Route path='/company/login' element={<LoginCompany/>}/>
                //

                //kassa
                <Route path='/kassa' element={<KasserLogin/>}/>
                //


            </Routes>
        </Provider>
    );
}


export default App;
