import React, {useEffect, useState} from 'react';
import "./style.scss";
import {Link} from "react-router-dom";
import image from "./image/logo.png";
import KassaClient from "./KassaClient";
import {Table} from "reactstrap";
import {connect} from "react-redux";
import {getOrderFindByUser} from "../../../../redux/actions/AppAction";

function Kassa(props) {

    const {orders, dispatch, currentAdmin} = props;
    const [isOrder, setIsOrder] = useState(false);

    useEffect(() => {
        dispatch(getOrderFindByUser(currentAdmin.id));
    }, []);

    const addOrder = () => {
        setIsOrder(true);
    }


    return (
        <>
            {isOrder ?
                <KassaClient/>
                :
                <div className="login">
                    <div className="login-page">

                        <div className="kassa-nav">
                            <Link to="/" className="text-decoration-none font-monospace link-1">Войти</Link>
                            <img src={image} alt="Icon"/>
                            <Link to="/" className="text-decoration-none font-monospace link-2">Пригласить</Link>
                            <div className="overflow-auto fill">
                                <Table>
                                    <thead>
                                    <tr>
                                        <th>firstName</th>
                                        <th>Cash price</th>
                                        <th>Cashback</th>
                                    </tr>
                                    </thead>
                                    {orders.length != null &&
                                        orders.map((item, i) =>
                                            <tbody key={i}>
                                            <tr>
                                                <td>{item.client.firstName}</td>
                                                <td>{item.cash_price}</td>
                                                <td>{item.cashback}</td>
                                            </tr>
                                            </tbody>
                                        )
                                    }
                                </Table>
                            </div>
                            <i className="bi bi-plus-circle-fill plus-icon-style">
                                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor"
                                     className="bi bi-plus-circle-fill" viewBox="0 0 16 16"
                                     onClick={addOrder}
                                >
                                    <path
                                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                                </svg>
                            </i>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
Kassa.propTypes = {};

export default connect(
    ({app: {orders, dispatch, currentAdmin}}) =>
    ({orders, dispatch, currentAdmin}))
(Kassa);

