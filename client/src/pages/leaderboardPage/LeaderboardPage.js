import React, { useState, useEffect, useContext } from "react";
import "./LeaderboardPage.css";
import LeaderboardTableList from "../../Components/leaderboardTableList/LeaderboardTableList";
import LeaderboardTopThreeCards from "../../Components/leaderboardTopThreeCards/LeaderboardTopThreeCards";
import {AuthContext} from "../../context/AuthContext";
import Moment from "moment";
import axios from "axios";

function LeaderboardPage() {

    const { isAuth, getUser } = useContext(AuthContext);

    const [date] = useState(Moment().format('Do MMMM'));
    const [isLoading, setIsLoading] = useState(false);

    const [completedRequestData, setCompletedRequestData] = useState([]);
    const [userCompleted, setUserComplete] = useState([{fullName: '', username: '', completed: 0}]);

    useEffect(() =>{
       getUser();
    }, [])

    useEffect(() => {
        setIsLoading(true);
        axios
            .get(`${process.env.REACT_APP_API_URL}/request/get_completed`)
            .then((response) => {
                //console.log(response.data);
                if (response.data.success) {
                     setIsLoading(false);
                     setCompletedRequestData(response.data.requests);
                    //  console.log(completedRequestData);
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
            <LeaderboardTopThreeCards
                completedRequestData={completedRequestData}
                isLoading={isLoading}
            />
            <div className="leaderboard_table_container">
                <div className="leaderboard_table_header">
                    <div className="leaderboard_title">
                        Leaderboard
                    </div>
                    <span className='leaderboard_date'> {date} </span>
                </div>
                <LeaderboardTableList
                    completedRequestData={completedRequestData}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
}

export default LeaderboardPage;