import React, {Component} from 'react';
import CabinetSidebar from "./CabinetSidebar";
import {companyCabinet} from "../../redux/actions/AppAction";

class Cabinet extends Component {

    componentDidMount() {
        this.props.dispatch(companyCabinet())
    }

    render() {
        return (
            <div>
                <CabinetSidebar/>
                <h1>Salom</h1>
            </div>
        );
    }
}

Cabinet.propTypes = {};

export default Cabinet;