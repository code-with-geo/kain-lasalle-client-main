import React, { createContext, useContext, useEffect, useState } from "react";
import Axios from "axios";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
	const [store, setStore] = useState(null);

	useEffect(() => {
		const getStore = () => {
			try {
				Axios.get(`https://kain-lasalle-main-backend.onrender.com/stores/`)
					.then((res) => {
						setStore(res.data.store);
					})
					.catch((err) => {
						if (err.response) Error();
					});
			} catch (error) {
				console.log(error);
			}
		};
		const interval = setInterval(getStore, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<StoreContext.Provider value={store}>{children}</StoreContext.Provider>
	);
};

export const useStoreData = () => useContext(StoreContext);
