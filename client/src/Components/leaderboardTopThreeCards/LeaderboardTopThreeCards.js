import React from "react";
import "./LeaderboardTopThreeCards.css";

function LeaderboardCard() {

    //const [] = useState(0);
    //useEffect(() => {});

    return (
        <div className="top_3_container">
            <div className="top_3_card">
                <div className="top_3_header">
                    <div className="ranking_container">
                        <span className='ranking_label'> 1st </span>
                    </div>
                    <div className="top_3_user_name">
                        Grace Kelly
                    </div>
                    <div className="top_3_user_username">
                        @gracekelly
                    </div>
                </div>
                <div className='completed_requests_container'>
                        <span className='completed_requests_label'>
                            45 Completed Requests
                        </span>
                </div>
            </div>
            <div className="top_3_card">
                <div className="top_3_header">
                    <div className="ranking_container">
                        <span className='ranking_label'> 2nd </span>
                    </div>
                    <div className="top_3_user_name">
                        Jimmy Stewart
                    </div>
                    <div className="top_3_user_username">
                        @jimmystewart
                    </div>
                </div>
                <div className='completed_requests_container'>
                        <span className='completed_requests_label'>
                            17 Completed Requests
                        </span>
                </div>
            </div>
            <div className="top_3_card">
                <div className="top_3_header">
                    <div className="ranking_container">
                        <span className='ranking_label'> 3rd </span>
                    </div>
                    <div className="top_3_user_name">
                        Anne Bancroft
                    </div>
                    <div className="top_3_user_username">
                        @annebancroft
                    </div>
                </div>
                <div className='completed_requests_container'>
                        <span className='completed_requests_label'>
                            15 Completed Requests
                        </span>
                </div>
            </div>
        </div>
    )
}

export default LeaderboardCard;