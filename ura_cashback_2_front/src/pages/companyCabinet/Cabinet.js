import React, {Component} from 'react';
import CompanySidebar from "./CompanySidebar";


class Cabinet extends Component {
    render() {
        return (
            <div>
            <CompanySidebar/>
            </div>
        );
    }
}

Cabinet.propTypes = {};

export default Cabinet;