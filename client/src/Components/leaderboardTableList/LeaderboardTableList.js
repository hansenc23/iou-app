import React from "react";
import "./LeaderboardTableList.css";

function LeaderboardTableList() {

    //const [] = useState(0);
    //useEffect(() => {});

    return (
        <div className='leaderboard_table_list'>
            <div className='leaderboard_row_container'>
                <div className='row_rank_container'>
                    <span className="row_rank_label"> 1 </span>
                </div>
                <span className='row_user_name'>
                            Grace Kelly
                        </span>
                <span className='row_username'>
                            @gracekelly
                        </span>
                <div className='row_completed_request'>
                            <span className='row_completed_request_label'>
                                45 Completed Requests
                            </span>
                </div>
            </div>
            <div className='leaderboard_row_container'>
                <div className='row_rank_container'>
                    <span className="row_rank_label"> 2 </span>
                </div>
                <span className='row_user_name'>
                            Jimmy Stewart
                        </span>
                <span className='row_username'>
                            @jimmystewart
                        </span>
                <div className='row_completed_request'>
                            <span className='row_completed_request_label'>
                                22 Completed Requests
                            </span>
                </div>
            </div>
            <div className='leaderboard_row_container'>
                <div className='row_rank_container'>
                    <span className="row_rank_label"> 3 </span>
                </div>
                <span className='row_user_name'>
                            Anne Bancroft
                        </span>
                <span className='row_username'>
                            @annebancroft
                        </span>
                <div className='row_completed_request'>
                            <span className='row_completed_request_label'>
                                10 Completed Requests
                            </span>
                </div>
            </div>
            <div className='leaderboard_row_container'>
                <div className='row_rank_container'>
                    <span className="row_rank_label"> 4 </span>
                </div>
                <span className='row_user_name'>
                            Humphrey Bogart
                        </span>
                <span className='row_username'>
                            @humphreybogart
                        </span>
                <div className='row_completed_request'>
                            <span className='row_completed_request_label'>
                                5 Completed Requests
                            </span>
                </div>
            </div>
            <div className='leaderboard_row_container'>
                <div className='row_rank_container'>
                    <span className="row_rank_label"> 5 </span>
                </div>
                <span className='row_user_name'>
                            Vivien Leigh
                        </span>
                <span className='row_username'>
                            @vivienleigh
                        </span>
                <div className='row_completed_request'>
                            <span className='row_completed_request_label'>
                                2 Completed Requests
                            </span>
                </div>
            </div>
        </div>
    )
}

export default LeaderboardTableList;