import React, { createContext, useContext, useEffect, useState } from "react";
import Axios from "axios";

const OrderContext = createContext();

const UseOrderData = (userID) => {
	const [order, setOrder] = useState(null);

	useEffect(() => {
		const getOrder = () => {
			try {
				Axios.post(`http://localhost:3001/orders/`, {
					userID,
				})
					.then((res) => {
						setOrder(res.data.orders);
					})
					.catch((err) => {
						if (err.response) Error();
						console.log(err);
					});
			} catch (error) {
				console.log(error);
			}
		};
		const interval = setInterval(getOrder, 1000);
		return () => clearInterval(interval);
	}, [userID]);
	return order;
};

export const OrderProvider = ({ userID, children }) => {
	const orderData = () => UseOrderData(userID);

	const orderMethod = {
		orderData,
	};
	return (
		<OrderContext.Provider value={orderMethod}>
			{children}
		</OrderContext.Provider>
	);
};

export const useOrder = () => {
	return useContext(OrderContext);
};
