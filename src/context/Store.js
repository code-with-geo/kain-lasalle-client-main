import React, { createContext, useContext, useEffect, useState } from "react";
import Axios from "axios";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
	const [store, setStore] = useState(null);

	useEffect(() => {
		const getStore = () => {
			try {
				Axios.get(`http://localhost:3001/stores/`)
					.then((res) => {
						setStore(res.data.store);
					})
					.catch((err) => {
						if (err.response) Error();
						console.log(err);
					});
			} catch (error) {
				console.log(error);
			}
		};
		getStore();
	}, []);

	return (
		<StoreContext.Provider value={store}>{children}</StoreContext.Provider>
	);
};

export const useStoreData = () => useContext(StoreContext);
