import React, { useContext } from 'react';
import "./LeaderboardTableList.css";
import Spinner from "../Spinner";
import {AuthContext} from "../../context/AuthContext";

function LeaderboardTableList({completedRequestData, isLoading}) {

    const { user } = useContext(AuthContext);

    return (
        <div className='leaderboard_table_list'>
            {isLoading ? (
                <Spinner />
            ) : (
                completedRequestData.length !== 0 &&
                completedRequestData.map((users, index) => {
                    return (
                        <div key={users._id} className={user.id === users._id ? 'current_user_row_container' : 'leaderboard_row_container'}>
                            <div className='row_rank_container'>
                                <span className="row_rank_label"> {index+1} </span>
                            </div>
                            <span className='row_user_name'>
                                {users.user_data[0].firstName} {users.user_data[0].lastName}
                            </span>
                            <span className='row_username'>
                                @{users.user_data[0].username}
                            </span>
                            <div className='row_completed_request'>
                                <span className='row_completed_request_label'>
                                    {users.count} Completed Requests
                                </span>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    )
}

export default LeaderboardTableList;