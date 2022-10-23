import React, {Component} from 'react';
import CompanySidebar from "./CompanySidebar";


class Cabinet extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <h2>Salom</h2>
                </div>
            <CompanySidebar/>
            </div>
        );
    }
}

Cabinet.propTypes = {};

export default Cabinet;