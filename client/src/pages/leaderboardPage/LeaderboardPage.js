import React, { useState, useEffect } from "react";
import "./LeaderboardPage.css";
import LeaderboardTableList from "../../Components/leaderboardTableList/LeaderboardTableList";
import LeaderboardTopThreeCards from "../../Components/leaderboardTopThreeCards/LeaderboardTopThreeCards";
import Moment from "moment";

function LeaderboardPage() {

    const [date] = useState(Moment().format('Do MMMM'));
    //useEffect(() => {});

    return (
        <div id='Leaderboard'>
            <LeaderboardTopThreeCards/>
            <div className="leaderboard_table_container">
                <div className="leaderboard_table_header">
                    <div className="leaderboard_title">
                        Leaderboard
                    </div>
                    <span className='leaderboard_date'> {date} </span>
                </div>
                <LeaderboardTableList/>
            </div>
        </div>
    );
}

export default LeaderboardPage;