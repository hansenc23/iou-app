import React, {useState} from 'react';
import "./Request.css";
import CompleteRequest from "../completeRequest/CompleteRequest";

const Request = () => {

    const showRequestDetail = () => {
        console.log("request card clicked")
    }

    const showRequestReward = () => {
        console.log("view and add request reward")
    }

    return (
        <div id = "request" className="">
            <div className="request_card" onClick={showRequestDetail}>
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
                        />
                    </div>
                    <div className="request_date_container">
                        <span className="date_label"> 25 Sep </span>
                    </div>
                </div>
            </div>

            <div className="request_card" onClick={showRequestDetail}>
                <div className="request_content">
                    <div className="content_container_left">
                        <div className="request_title">
                            Print Some Documents
                        </div>
                        <div className="request_owner">
                            Requested by <strong>@VivienLeigh</strong>
                        </div>
                    </div>
                    <div className="content_container_right">
                        <button className = "num_of_reward_btn" onClick={showRequestReward}>
                            <span className="num_of_rewards_label">
                                5
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
                        />
                    </div>
                    <div className="request_date_container">
                        <span className="date_label"> 24 Sep</span>
                    </div>
                </div>
            </div>

            <div className="request_card" onClick={showRequestDetail}>
                <div className="request_content">
                    <div className="content_container_left">
                        <div className="request_title">
                            Organise the Office Party
                        </div>
                        <div className="request_owner">
                            Requested by <strong>@jimmystewart</strong>
                        </div>
                    </div>
                    <div className="content_container_right">
                        <button className = "num_of_reward_btn" onClick={showRequestReward}>
                            <span className="num_of_rewards_label">
                                7
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
                        />
                    </div>
                    <div className="request_date_container">
                        <span className="date_label"> 21 Sep</span>
                    </div>
                </div>
            </div>

            <div className="request_card" onClick={showRequestDetail}>
                <div className="request_content">
                    <div className="content_container_left">
                        <div className="request_title">
                            Fix The Coffee Machine
                        </div>
                        <div className="request_owner">
                            Requested by <strong>@marlonbrando</strong>
                        </div>
                    </div>
                    <div className="content_container_right">
                        <button className = "num_of_reward_btn" onClick={showRequestReward}>
                            <span className="num_of_rewards_label">
                                1
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
                        />
                    </div>
                    <div className="request_date_container">
                        <span className="date_label"> 20 Sep</span>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default Request;