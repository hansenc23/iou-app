import React, {useState} from "react";
import "./RequestsList.css";
import Moment from 'moment';
import AddIcon from '@material-ui/icons/Add';
import Request from "../request/Request";

const RequestsList =() => {

    const[date, setDate] = useState(Moment().format("MMMM Do YYYY"));

    return (
        <div id="requests_list" className="">
                <div className="header_container">
                    <div className = "title_container">
                        <div className="requests_label"> Requests </div>
                        <div className="date"> {date}  </div>
                    </div>
                    <div className="new_requests_btn_container">
                        <button className = "new_requests_btn">
                            <AddIcon className = "add_icon" fontSize="large"/>
                        </button>
                    </div>
                </div>
                <Request/>
        </div>
    );

}
export default RequestsList;