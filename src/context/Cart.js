import React, { createContext, useContext, useEffect, useState } from "react";
import Axios from "axios";

const CartContext = createContext();

const UseCartData = (userID) => {
	const [cart, setCart] = useState(null);

	useEffect(() => {
		const getCart = () => {
			try {
				Axios.post(`http://localhost:3001/cart/`, {
					userID,
				})
					.then((res) => {
						setCart(res.data.cart);
					})
					.catch((err) => {
						if (err.response) Error();
						console.log(err);
					});
			} catch (error) {
				console.log(error);
			}
		};
		getCart();
	}, [userID]);
	return cart;
};

const UseCartTotal = (userID) => {
	const [total, setTotal] = useState(null);

	useEffect(() => {
		const getTotal = () => {
			try {
				Axios.post(`http://localhost:3001/cart/total`, {
					userID,
				})
					.then((res) => {
						setTotal(res.data.total);
					})
					.catch((err) => {
						if (err.response) Error();
						console.log(err);
					});
			} catch (error) {
				console.log(error);
			}
		};
		getTotal();
	}, [userID]);
	return total;
};

export const CartProvider = ({ userID, children }) => {
	const cartData = () => UseCartData(userID);
	const cartTotal = () => UseCartTotal(userID);

	const cartMethods = {
		cartData,
		cartTotal,
	};
	return (
		<CartContext.Provider value={cartMethods}>{children}</CartContext.Provider>
	);
};

export const useCart = () => {
	return useContext(CartContext);
};
