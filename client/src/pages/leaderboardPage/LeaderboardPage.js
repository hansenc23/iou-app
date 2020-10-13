import React, { useState, useEffect } from "react";
import "./LeaderboardPage.css";
import LeaderboardTableList from "../../Components/leaderboardTableList/LeaderboardTableList";
import LeaderboardTopThreeCards from "../../Components/leaderboardTopThreeCards/LeaderboardTopThreeCards";
import Moment from "moment";
import axios from "axios";

function LeaderboardPage() {

    const [date] = useState(Moment().format('Do MMMM'));

    const [completedRequestData, setCompletedRequestData] = useState([]);
    const [userCompleted, setUserComplete] = useState([{fullName: '', username: '', completed: 0}]);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/request/get_completed`)
            .then((response) => {
                //console.log(response.data);
                if (response.status === 200) {
                     setCompletedRequestData(response.data);
                     console.log(completedRequestData);
                } else {
                     console.log('Failed to get completed request data');
                 }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

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