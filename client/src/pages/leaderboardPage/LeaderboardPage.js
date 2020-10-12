import React, { useState, useEffect } from "react";
import "./LeaderboardPage.css";
import LeaderboardTableList from "../../Components/leaderboardTableList/LeaderboardTableList";
import LeaderboardTopThreeCards from "../../Components/leaderboardTopThreeCards/LeaderboardTopThreeCards";

function LeaderboardPage() {

    //const [] = useState(0);
    //useEffect(() => {});

    return (
        <div id='Leaderboard'>
            <LeaderboardTopThreeCards/>
            <div className="leaderboard_table_container">
                <div className="leaderboard_title">
                    Leaderboard
                </div>
                <LeaderboardTableList/>
            </div>
        </div>
    );
}

export default LeaderboardPage;