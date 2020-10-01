import React, {useState} from "react";
import "./RequestsList.css";
import Moment from 'moment';
import AddIcon from '@material-ui/icons/Add';
import Request from "../request/Request";
import CreateRequest from "../createRequest/CreateRequest";

const RequestsList =() => {

    const[date] = useState(Moment().format("Do MMMM YYYY"));

    return (
        <div id="requests_list" className="">
            <div className="header_container">
                <div className = "title_container">
                    <span className="requests_label"> Requests </span>
                    <span className="date"> {date}  </span>
                </div>
                <CreateRequest/>
            </div>
            <Request/>
        </div>
    );

}
export default RequestsList;