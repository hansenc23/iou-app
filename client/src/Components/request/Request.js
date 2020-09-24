import React, {useState} from 'react';
import "./Request.css";
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const Request = () => {

    const showRequestDetail = () => {
        console.log("request card clicked")
    }

    const showRequestReward = () => {
        console.log("view and add request reward")
    }

    const completeRequest = () => {
        console.log("complete request and add proof")
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
                                23
                            </span>
                        </button>
                        <div className="reward">
                            <span className="reward_label"> Rewards </span>
                        </div>
                    </div>
                </div>
                <div className="button_containers">
                    <div className="view_and_detail_btns">
                        <button className = "view_detail_btn" onClick={showRequestDetail}>
                            <VisibilityIcon fontSize ="small" style={{marginRight:"5px"}}/>
                            Details
                        </button>
                        <button className = "add_reward_btn" onClick={showRequestReward}>
                            <AddBoxRoundedIcon fontSize ="small" style={{marginRight:"5px"}}/>
                            Add Reward
                        </button>
                    </div>
                    <button className = "complete_request_btn" onClick={completeRequest}>
                        <CheckCircleIcon fontSize ="small" style={{marginRight:"5px"}}/>
                        Complete Request
                    </button>
                </div>
            </div>

            <div className="request_card">
                <div className="request_content">
                    <div className="content_container_left">
                        <div className="request_title">
                            Organise Christmas Party
                        </div>
                        <div className="request_owner">
                            Requested by <strong>@VivienLeigh</strong>
                        </div>
                    </div>
                    <div className="content_container_right">
                        <button className = "num_of_reward_btn">
                            <span className="num_of_rewards_label">
                                7
                            </span>
                        </button>
                        <div className="reward">
                            <span className="reward_label"> Rewards </span>
                        </div>
                    </div>
                </div>
                <div className="button_containers">
                    <div className="view_and_detail_btns">
                        <button className = "view_detail_btn">
                            <VisibilityIcon fontSize ="small" style={{marginRight:"5px"}}/>
                            Details
                        </button>
                        <button className = "add_reward_btn">
                            <AddBoxRoundedIcon fontSize ="small" style={{marginRight:"5px"}}/>
                            Add Reward
                        </button>
                    </div>
                    <button className = "complete_request_btn">
                        <CheckCircleIcon fontSize ="small" style={{marginRight:"5px"}}/>
                        Complete Request
                    </button>
                </div>
            </div>

            <div className="request_card">
                <div className="request_content">
                    <div className="content_container_left">
                        <div className="request_title">
                            Fix the Coffee Machine
                        </div>
                        <div className="request_owner">
                            Requested by <strong>@Humphreybogart</strong>
                        </div>
                    </div>
                    <div className="content_container_right">
                        <button className = "num_of_reward_btn">
                            <span className="num_of_rewards_label">
                                11
                            </span>
                        </button>
                        <div className="reward_label">
                            Rewards
                        </div>
                    </div>
                </div>
                <div className="button_containers">
                    <div className="view_and_detail_btns">
                        <button className = "view_detail_btn">
                            <VisibilityIcon fontSize ="small" style={{marginRight:"5px"}}/>
                            Details
                        </button>
                        <button className = "add_reward_btn">
                            <AddBoxRoundedIcon fontSize ="small" style={{marginRight:"5px"}}/>
                            Add Reward
                        </button>
                    </div>
                    <button className = "complete_request_btn">
                        <CheckCircleIcon fontSize ="small" style={{marginRight:"5px"}}/>
                        Complete Request
                    </button>
                </div>
            </div>

            <div className="request_card">
                <div className="request_content">
                    <div className="content_container_left">
                        <div className="request_title">
                            Print Some Documents
                        </div>
                        <div className="request_owner">
                            Requested by <strong>@Jimmystewart</strong>
                        </div>
                    </div>
                    <div className="content_container_right">
                        <button className = "num_of_reward_btn">
                            <span className="num_of_rewards_label">
                                3
                            </span>
                        </button>
                        <div className="reward_label">
                            Rewards
                        </div>
                    </div>
                </div>
                <div className="button_containers">
                    <div className="view_and_detail_btns">
                        <button className = "view_detail_btn">
                            <VisibilityIcon fontSize ="small" style={{marginRight:"5px"}}/>
                            Details
                        </button>
                        <button className = "add_reward_btn">
                            <AddBoxRoundedIcon fontSize ="small" style={{marginRight:"5px"}}/>
                            Add Reward
                        </button>
                    </div>
                    <button className = "complete_request_btn">
                        <CheckCircleIcon fontSize ="small" style={{marginRight:"5px"}}/>
                        Complete Request
                    </button>
                </div>
            </div>

            <div className="request_card">
                <div className="request_content">
                    <div className="content_container_left">
                        <div className="request_title">
                            Clean the Dishes
                        </div>
                        <div className="request_owner">
                            Requested by <strong>@annebancroft</strong>
                        </div>
                    </div>
                    <div className="content_container_right">
                        <button className = "num_of_reward_btn">
                            <span className="num_of_rewards_label">
                                12
                            </span>
                        </button>
                        <div className="reward_label">
                            Rewards
                        </div>
                    </div>
                </div>
                <div className="button_containers">
                    <div className="view_and_detail_btns">
                        <button className = "view_detail_btn">
                            <VisibilityIcon fontSize ="small" style={{marginRight:"5px"}}/>
                            Details
                        </button>
                        <button className = "add_reward_btn">
                            <AddBoxRoundedIcon fontSize ="small" style={{marginRight:"5px"}}/>
                            Add Reward
                        </button>
                    </div>
                    <button className = "complete_request_btn">
                        <CheckCircleIcon fontSize ="small" style={{marginRight:"5px"}}/>
                        Complete Request
                    </button>
                </div>
            </div>
        </div>

    )
}

export default Request;