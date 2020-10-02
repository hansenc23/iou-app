import React, {useState} from "react";
import "./RequestsList.css";
import "./Request.css";
import CreateRequest from "../createRequest/CreateRequest";
import CompleteRequest from "../completeRequest/CompleteRequest";
import Moment from 'moment';

const RequestsList = (props) => {

    const[date] = useState(Moment().format("Do MMMM YYYY"));

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
                <div className="request_card" onClick={()=>props.getSelectedRequestID(1)}>
                    <div className="request_content">
                        <div className="content_container_left">
                            <div className="request_title">
                                Clean the Fridge
                            </div>
                            <div className="request_owner">
                                Requested by <strong>@GraceKelly</strong>
                            </div>
                        </div>
                        <div className="content_container_right">
                            <button className = "num_of_reward_btn" onClick={showRequestReward}>
                            <span className="num_of_rewards_label">
                                2
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
                            <span className="date_label"> 25 Sep </span>
                        </div>
                    </div>
                </div>
                <div className="request_card" onClick={()=>props.getSelectedRequestID(2)}>
                    <div className="request_content">
                        <div className="content_container_left">
                            <div className="request_title">
                                Clean the Fridge
                            </div>
                            <div className="request_owner">
                                Requested by <strong>@GraceKelly</strong>
                            </div>
                        </div>
                        <div className="content_container_right">
                            <button className = "num_of_reward_btn" onClick={showRequestReward}>
                            <span className="num_of_rewards_label">
                                2
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
                            <span className="date_label"> 25 Sep </span>
                        </div>
                    </div>
                </div>
                <div className="request_card" onClick={()=>props.getSelectedRequestID(3)}>
                    <div className="request_content">
                        <div className="content_container_left">
                            <div className="request_title">
                                Clean the Fridge
                            </div>
                            <div className="request_owner">
                                Requested by <strong>@GraceKelly</strong>
                            </div>
                        </div>
                        <div className="content_container_right">
                            <button className = "num_of_reward_btn" onClick={showRequestReward}>
                            <span className="num_of_rewards_label">
                                2
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
                            <span className="date_label"> 25 Sep </span>
                        </div>
                    </div>
                </div>
                <div className="request_card" onClick={()=>props.getSelectedRequestID(4)}>
                    <div className="request_content">
                        <div className="content_container_left">
                            <div className="request_title">
                                Clean the Fridge
                            </div>
                            <div className="request_owner">
                                Requested by <strong>@GraceKelly</strong>
                            </div>
                        </div>
                        <div className="content_container_right">
                            <button className = "num_of_reward_btn" onClick={showRequestReward}>
                            <span className="num_of_rewards_label">
                                2
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
                            <span className="date_label"> 25 Sep </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default RequestsList;