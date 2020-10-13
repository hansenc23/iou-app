import React, { useState, useEffect } from 'react';
import "./LeaderboardTopThreeCards.css";
import Spinner from "../Spinner";

function LeaderboardCard({completedRequestData, isLoading}) {
    const topThreeUsers = completedRequestData.slice(0, 3).map(users => {
        return (
            <div key={users._id} className="top_3_card">
                <div className="top_3_header">
                    <div className="ranking_container">
                        <span className='ranking_label'> 1st </span>
                    </div>
                    <div className="top_3_user_name">
                        {users.user_data[0].firstName} {users.user_data[0].lastName}
                    </div>
                    <div className="top_3_user_username">
                        @{users.user_data[0].username}
                    </div>
                </div>
                <div className='completed_requests_container'>
                    <span className='completed_requests_label'>
                        {users.count} Completed Requests
                    </span>
                </div>
            </div>
        )
    });

    return (
        <div className="top_3_container">
            {isLoading ? (
                <Spinner />
            ) : (topThreeUsers)}
        </div>
    )
}

export default LeaderboardCard;