import React, { useState, useEffect, useCallback, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

import "./PartyPage.css";
import Spinner from "../../Components/Spinner";

export default function PartyPage() {
	const { isAuth, setIsAuth, user, setUser, getUser } = useContext(
		AuthContext
	);
	const [isLoading, setIsLoading] = useState(false);

	const [parties, setParties] = useState(null);
	const [filtered, setFiltered] = useState(null);

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

	const renderPartyList = isAuth ? (
		<div className="party_list">
			{parties && parties.map((party) => {
				if (party.party_members.length >= 3) {
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
				}
			})}
		</div>
	) : (
		<Redirect to="/login"></Redirect>
	);

	return (
		<div id="PartyPage" className="">
			<div className="parties_label"> Parties </div>
			<div className="parties_description"> Parties are detected when cycles of favours owed to each other are formed. Here are party recommendations that can clear each other's debts at once. </div>
			{renderPartyList}
		</div>
	);
}
