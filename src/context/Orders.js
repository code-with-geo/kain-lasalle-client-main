import React, { createContext, useContext, useEffect, useState } from "react";
import Axios from "axios";

const OrderContext = createContext();

const UseOrderData = (userID) => {
	const [order, setOrder] = useState(null);

	useEffect(() => {
		const getOrder = () => {
			try {
				Axios.post(`https://kain-lasalle-main-backend.onrender.com/orders/`, {
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

const GetOrderItems = (orderID) => {
	const [items, setItems] = useState(null);

	useEffect(() => {
		const getAllItems = () => {
			try {
				Axios.post(
					`https://kain-lasalle-main-backend.onrender.com/orders/get-products`,
					{
						orderID,
					}
				)
					.then((res) => {
						setItems(res.data.orders);
					})
					.catch((err) => {
						if (err.response) Error();
						console.log(err);
					});
			} catch (error) {
				console.log(error);
			}
		};
		const interval = setInterval(getAllItems, 1000);
		return () => clearInterval(interval);
	}, [orderID]);
	return items;
};

const GetOrdersByID = (orderID) => {
	const [orders, setOrders] = useState(null);

	useEffect(() => {
		const getOrders = () => {
			try {
				Axios.post(
					`https://kain-lasalle-main-backend.onrender.com/orders/get-by-order-id`,
					{
						orderID,
					}
				)
					.then((res) => {
						setOrders(res.data.orders);
					})
					.catch((err) => {
						if (err.response) Error();
						console.log(err);
					});
			} catch (error) {
				console.log(error);
			}
		};
		const interval = setInterval(getOrders, 1000);
		return () => clearInterval(interval);
	}, [orderID]);
	return orders;
};

const GetStoreInfo = (storeID) => {
	const [store, setStores] = useState(null);

	useEffect(() => {
		const getStores = () => {
			try {
				Axios.post(`https://kain-lasalle-main-backend.onrender.com/stores/`, {
					storeID,
				})
					.then((res) => {
						setStores(res.data.store);
					})
					.catch((err) => {
						if (err.response) Error();
						console.log(err);
					});
			} catch (error) {
				console.log(error);
			}
		};
		const interval = setInterval(getStores, 1000);
		return () => clearInterval(interval);
	}, [store]);
	return orders;
};

export const OrderProvider = (props) => {
	const orderData = (userID) => UseOrderData(userID);
	const ordersDataByID = (orderID) => GetOrdersByID(orderID);
	const ordersItemData = (orderID) => GetOrderItems(orderID);
	const storeData = (storeID) => GetStoreInfo(storeID);
	const orderMethod = {
		orderData,
		ordersItemData,
		ordersDataByID,
		storeData,
	};
	return (
		<OrderContext.Provider value={orderMethod}>
			{props.children}
		</OrderContext.Provider>
	);
};

export const useOrder = () => {
	return useContext(OrderContext);
};
