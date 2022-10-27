import React, {Component} from 'react';
import Sidebar from "../../clint/navbar/Sidebar";

class AdminPanel extends Component {
    render() {
        return (
            <div>
                <Sidebar/>
            </div>
        );
    }
}

AdminPanel.propTypes = {};

export default AdminPanel;
