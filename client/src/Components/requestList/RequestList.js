import React, { useState, useEffect} from "react";
import "./RequestsList.css";
import "./Request.css";
import CreateRequest from "../createRequest/CreateRequest";
import CompleteRequest from "../completeRequest/CompleteRequest";
import axios from 'axios';
import Moment from 'moment';
import moment from "moment";

const RequestsList = ({requestData, selectRequestId}) => {

    const[date] = useState(Moment().format("Do MMMM YYYY"))

    const showRequestReward = () => {
        console.log("view and add request reward")
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
                    requestData.map((request) => {
                        return (
                            <div key={request._id} className="request_card" onClick={()=>selectRequestId(request._id)}>
                                <div className="request_content">
                                    <div className="content_container_left">
                                        <div className="request_title">
                                            {request.title}
                                        </div>
                                        <div className="request_owner">
                                            Requested by <strong>{request.request_owner.username}</strong>
                                        </div>
                                    </div>
                                    <div className="content_container_right">
                                        <button className = "num_of_reward_btn" onClick={showRequestReward}>
                                            <span className="num_of_rewards_label">
                                                {request.rewards.length}
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
                                            buttonSource={'fromRequestCard'}
                                            requestName={request.title}
                                            requestOwner={request.request_owner.username}
                                            requestDate={moment(request.createdAt).format('DD MMM')}
                                        />
                                    </div>
                                    <div className="request_date_container">
                                        <span className="date_label"> {moment(request.createdAt).format('DD MMM')} </span>
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