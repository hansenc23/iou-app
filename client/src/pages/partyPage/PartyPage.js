import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

import "./PartyPage.css";
import Spinner from "../../Components/Spinner";

const PartyPage = () => {
	const { isAuth, user, getUser } = useContext(
		AuthContext
	);
	const [isLoading, setIsLoading] = useState(false);

	let [parties, setParties] = useState([]);

	useEffect(() => {
		getUser();

		if (isAuth) {
			getParty(user.id);
		}
	}, []);

	async function getParty(user_id) {
		let results = [];
		let promises = [];

		["Coffee", "Chocolate", "Pizza", "Cupcake", "Mints"].map((reward) => {
			promises.push(
				axios
					.post(`${process.env.REACT_APP_API_URL}/party/detection`, {
						user_id,
						reward,
					})
					.then((response) => {
						if (response.data.parties) {
							results = [...results, ...response.data.parties];
						}
					})
			);
		});

		Promise.all(promises).then(() => {
			setParties(results);
		});
	}

	let filteredParties = parties.filter((party) => {
		return (party.party_members.length > 2)
	})

	const renderPartyList = isAuth ? (
		<div className="party_list">
			{isLoading ? (
				<Spinner />
			) : (
				filteredParties.length !== 0 ?
				filteredParties.map((party) => {
					return (
						<div key={party._id} className="party_item">
							<div className="party_content_left">
								<span className="party_type">
									<strong> {party.favor_detail} </strong> Party
								</span>
								<span className="party_members">
									with <span className="user_member">@You</span>
									<span className="user_member">
										{party.party_members.map((user, i) => {
											if (user._id !== party.owner) {
												return `, @${user.username}`;
											}})}
									</span>
								</span>
							</div>
							<div className="party_content_right">
								<div className="member_number_container">
									<span className="member_number_label"> {party.party_members.length} </span>
								</div>
								<span className="member_label"> Members</span>
							</div>
						</div>
					);
				}) : (<div className="no_party_item"> No Party Detected </div>)
			)}
		</div>
	) : (
		<Redirect to="/login"></Redirect>
	);

	return (
		<div id="PartyPage" className="">
			<div className="parties_label"> Parties </div>
			<div className="parties_description"> Parties are detected when cycles of favours owed to each other are formed. Here are party recommendations to clear each other's debts at once. </div>
			{renderPartyList}
		</div>
	);
}
export default PartyPage;
