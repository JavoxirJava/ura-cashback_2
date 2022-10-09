import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Navbar from "../navbar/Navbar";
import "./orderC.css"
class Order extends Component {
    render() {
        return (
        // font-family: GothamPro;
        // font-size: 24px;
        // line-height: 36px;
        // letter-spacing: 0.10000000149011612px;
        // text-align: center;

           <div>
                <h1 className="order">Order</h1>
               <div className="orderList">
                   <div className="order1">fef</div>
                   <div className="order2"></div>
                   <div className="order3"></div>
                   <div className="order4"></div>
                   <div className="order5"></div>
                   <div className="order6"></div>
                   <div className="order7"></div>
                   <div className="order8"></div>
                   <div className="order9"></div>
                   <div className="order10"></div>
                   <div className="order11"></div>
                   <div className="order12"></div>
                   <div className="order13"></div>
               </div>
            </div>
        );
    }
}

Order.propTypes = {};

export default Order;
