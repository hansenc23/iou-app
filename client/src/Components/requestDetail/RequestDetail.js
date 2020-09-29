import React, {useState} from "react";
import "./RequestDetail.css";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CompleteRequest from "../completeRequest/CompleteRequest";

const RequestDetail =() => {

    return(
        <div id="requestDetail">
            <div className="request_title_container">
                <div className="request_title_label">
                        Clean The Fridge
                </div>
                <div className="request_sub_title_label">
                    <span> Requested by <strong> @gracekelly </strong></span>
                    <span className="sub_title_date"> on 25 Sep </span>
                </div>
            </div>

            <CompleteRequest/>

            <div className="description_details_container">
                <div className="description_detail_header">
                    Details
                </div>
                <div className="description_detail_content">
                    The panasonic fridge on the second floor needs some work. Clean the compartments from left-over crumbs and neatly organise food items Let's keep the fridge clean people!
                </div>
            </div>

            <div className="reward_details_container">
                <div className="reward_detail_header">
                    Rewards
                </div>
                <div className="reward_detail_list">
                    <div className="reward_item">
                        <div className="reward_item_content">
                            <div className="reward_detail">
                                <strong>Chocolate</strong> from @johndoe
                            </div>
                        </div>
                        <div className="reward_item_date">
                            <div className="">
                                25 Sept
                            </div>
                        </div>
                    </div>
                    <div className="reward_item">
                        <div className="reward_item_content">
                            <div className="reward_detail">
                                <strong>Pizza</strong> from @jimmyruan
                            </div>
                        </div>
                        <div className="reward_item_date">
                            <div className="">
                                21 Sept
                            </div>
                        </div>
                    </div>
                    <div className="reward_item">
                        <div className="reward_item_content">
                            <div className="reward_detail">
                                <strong>Coffee</strong> from @jison
                            </div>
                        </div>
                        <div className="reward_item_date">
                            <div className="">
                                20 Sept
                            </div>
                        </div>
                    </div>
                    <div className="reward_item">
                        <div className="reward_item_content">
                            <div className="reward_detail">
                                <strong>Pizza</strong> from @jimmyruan
                            </div>
                        </div>
                        <div className="reward_item_date">
                            <div className="">
                                19 Sept
                            </div>
                        </div>
                    </div>
                    <div className="reward_item">
                        <div className="reward_item_content">
                            <div className="reward_detail">
                                <strong>Coffee</strong> from @jison
                            </div>
                        </div>
                        <div className="reward_item_date">
                            <div className="">
                                15 Sept
                            </div>
                        </div>
                    </div>
                    <div className="reward_item">
                        <div className="reward_item_content">
                            <div className="reward_detail">
                                <strong>Chocolate</strong> from @johndoe
                            </div>
                        </div>
                        <div className="reward_item_date">
                            <div className="">
                                15 Sept
                            </div>
                        </div>
                    </div>
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
