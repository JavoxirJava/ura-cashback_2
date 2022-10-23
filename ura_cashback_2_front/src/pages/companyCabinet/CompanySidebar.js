import React from 'react';
import ura from '../clint/navbar/sidebarImg/ura.png';
import order from '../clint/navbar/sidebarImg/order.png';
import user from '../clint/navbar/sidebarImg/user.png';
import '../clint/navbar/sidebar.scss';
import '../clint/navbar/sidebarImg/sidebar2.css';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {api} from "../../api/api";


function Sidebar(props) {

    const {currentUser} = props;

    const images = [
        {img: order, name: "order", url: "/cabinetOrder"},
        {img: user, name: "user", url: "/cabinetUser"}
    ]

    return (
        <div>
            <div className="sidebar">
                <div className="offcanvas offcanvas-start show">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title">
                            <img className="mt-3 mb-5" src={ura} alt="Ura!"/>
                        </h5>
                        {/*<button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>*/}
                    </div>
                    <div className="offcanvas-body">
                        {currentUser === 0 ?
                            <div>
                                <img src={api.getAttachment + currentUser.attachment.id} alt="user"/>
                                <h5>{currentUser.firstName}</h5>
                            </div>
                            :
                            <div>

                            </div>
                        }
                        <div className="sidebar-overflow">
                            {images.map((item, i) =>
                                <div key={i}>
                                    <Link to={item.url}>
                                        <img className="float-lg-start mb-4" src={item.img} alt="not"/>
                                        <h5 className="mb-5">{item.name}</h5>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Sidebar.propTypes = {};

export default connect(
    ({app: {currentUser}}) =>
        ({currentUser}))
(Sidebar);
