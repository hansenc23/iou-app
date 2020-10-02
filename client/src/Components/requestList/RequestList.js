import React, { useState, useEffect} from "react";
import "./RequestsList.css";
import "./Request.css";
import CreateRequest from "../createRequest/CreateRequest";
import CompleteRequest from "../completeRequest/CompleteRequest";
import axios from 'axios';
import Moment from 'moment';
import moment from "moment";

const RequestsList = (props) => {

    const[date] = useState(Moment().format("Do MMMM YYYY"));

    const [requestData, setRequestData] = useState([]);

    const showRequestReward = () => {
        console.log("view and add request reward")
    }

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/request/get_all`)
            .then((response) => {
                if (response.data.success) {
                    setRequestData(response.data.requests);
                } else {
                    console.log("Failed to get request data");
                }
            }).catch(error => {
                console.log(error);
        })
    },  [requestData])

    function sortRequest(data) {
        let copyArray = [...data];

        copyArray.sort(function (a, b) {
            return Date.parse(b.create_time) - Date.parse(a.create_time);
        });
        return copyArray;
    }

    return (
        <div id="requests_list" className="">
            <div className="header_container">
                <div className = "title_container">
                    <span className="requests_label"> Requests </span>
                    <span className="date"> {date}  </span>
                </div>
                <CreateRequest/>
            </div>

            <div id="request" className="">
                {requestData.length !== 0 &&
                    requestData.map((each, i) => {
                        return (
                        <div className="request_card" onClick={()=>props.getSelectedRequestID(each._id)}>
                            <div className="request_content">
                                <div className="content_container_left">
                                    <div className="request_title">
                                        {each.title}
                                    </div>
                                    <div className="request_owner">
                                        Requested by <strong>{each.request_owner.username}</strong>
                                    </div>
                                </div>
                                <div className="content_container_right">
                                    <button className = "num_of_reward_btn" onClick={showRequestReward}>
                            <span className="num_of_rewards_label">
                                {each.rewards.length}
                            </span>
                                    </button>
                                    <div className="reward">
                                        <span className="reward_label"> Rewards </span>
                                    </div>
                                </div>
                            </div>
                            <div className="bottom_row">
                                <div className="button_containers">
                                    <CompleteRequest
                                        buttonSource={"fromRequestCard"}
                                        requestName={"Clean The Fridge"}
                                        requestOwner={"GraceKelly"}
                                        requestDate={"25 Sep"}
                                    />
                                </div>
                                <div className="request_date_container">
                                    <span className="date_label"> {moment(each.createdAt).format('DD MMM')} </span>
                                </div>
                            </div>
                        </div>
                        )
                    })
                }
            </div>

        </div>
    );

}
export default RequestsList;