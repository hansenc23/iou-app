import React, { useState, useEffect, useCallback, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

import "./PartyPage.css";

export default function PartyPage() {
	const { isAuth, setIsAuth, user, setUser, getUser } = useContext(
		AuthContext
	);
	const [isLoading, setIsLoading] = useState(false);

	const [parties, setParties] = useState(null);

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

	const renderPage = isAuth ? (
		<>
			<h1>Party Detections</h1>
			{/* To check if parties is empty or null */}
			{parties &&
				parties.map((party, i) => {
					// Check if party.party_members is not empty
					// party.party_members contains all the party member
					if (party.party_members) {
						return (
							<div key={i}>
								You
								{party.party_members.map((user, i) => {
									// This is the current user, we skip it
									if (user._id !== party.owner) {
										return `, ${user.username}`;
									}
								})}{" "}
								should go for {party.favor_detail} together.
							</div>
						);
					}
				})}
			{/* Uncomment below if u want to debug */}
			{/* {parties && console.log(parties)} */}
		</>
	) : (
		<Redirect to="/login"></Redirect>
	);

	return (
		<div id="PartyPage" className="">
			{renderPage}
		</div>
	);
}
