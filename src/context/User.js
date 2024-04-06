import React, { createContext, useContext, useEffect, useState } from "react";
import { useGetUserID } from "../hooks/User";
import Axios from "axios";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const userID = useGetUserID();

	useEffect(() => {
		const getProducts = () => {
			try {
				Axios.get(
					`https://kain-lasalle-main-backend.onrender.com/users/${userID}`
				)
					.then((res) => {
						setUser(res.data.user);
					})
					.catch((err) => {
						if (err.response) Error();
						console.log(err);
					});
			} catch (error) {
				console.log(error);
			}
		};
		getProducts();
	}, [userID]);

	return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUserData = () => useContext(UserContext);
