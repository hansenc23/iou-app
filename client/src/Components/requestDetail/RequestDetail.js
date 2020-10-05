import React, {useEffect, useState} from "react";
import "./RequestDetail.css";
import CompleteRequest from "../completeRequest/CompleteRequest";
import axios from "axios";
import moment from "moment";

const RequestDetail = ( {selectedRequest} ) => {
    return (
        <div id="requestDetail">
            <div className="request_title_container">
                <div className="request_name">
                    {selectedRequest.title}
                </div>
                <div className="request_subtitle">
                    <span> Requested by <strong> @{selectedRequest.request_owner.username} </strong></span>
                    <span className="sub_title_date"> on {moment(selectedRequest.createdAt).format('DD MMM')} </span>
                </div>
            </div>

            <CompleteRequest
                buttonSource={'fromRequestDetail'}
                requestName={selectedRequest.title}
                requestOwner={selectedRequest.request_owner.username}
                requestDate={selectedRequest.createdAt}
            />

            <div className="description_details_container">
                <div className="description_detail_header">
                    Details
                </div>
                <div className="description_detail_content">
                    {selectedRequest.description}
                </div>
            </div>

            <div className="reward_details_container">
                <div className="reward_detail_header">
                    Rewards
                </div>
                <div className="reward_detail_list">

                    {selectedRequest.rewards.length !== 0 &&
                        selectedRequest.rewards.map((reward) => {
                            return (
                                <div key={reward._id} className="reward_item">
                                    <div className="reward_item_content">
                                        <div className="reward_detail">
                                            <strong>{reward.reward}</strong> from {reward.owner.username}
                                        </div>
                                    </div>
                                    <div className="reward_item_date">
                                        <div className="">
                                            {moment(reward.createdAt).format('DD MMM')}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="add_reward_btn_container">
                    <button className = "add_reward_item_btn">
                        Add Reward
                    </button>
                </div>
            </div>
        </div>
    );

}
export default RequestDetail;
