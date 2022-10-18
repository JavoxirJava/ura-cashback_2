import {Provider} from "react-redux";
import store from "../redux";
import {Route, Routes} from "react-router-dom";
import NotFount from "../pages/clint/notFaunt/NotFount";
import Order from "../pages/admin/order/Order";
import Company from "../pages/admin/company/Company";
import KasserLogin from "../pages/admin/order/loginPage/KasserLogin";
import AuthClient from "../pages/admin/userAdmin/AuthClient";
import AuthAdmin from "../pages/admin/userAdmin/AuthAdmin";
import KassaClient from "../pages/admin/order/loginPage/KassaClient";


//https://www.w3schools.com/react/showreact.asp?filename=demo2_react_usememo // add uchun menga kk

function App() {
    return (
        <Provider store={store}>
            <Routes>
                <Route path='/' element={<KassaClient/>}/>
                <Route path='/user' element={<AuthAdmin/>}/>
                <Route path='/authClient' element={<AuthClient/>}/>
                <Route path='/order' element={<Order/>}/>
                <Route path='/company' element={<Company/>}/>
                <Route path='/order/login' element={<KasserLogin/>}/>
                <Route path='/*' element={<NotFount/>}/>
            </Routes>
        </Provider>
    );
}


export default App;
