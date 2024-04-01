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
		const interval = setInterval(getCart, 1000);
		return () => clearInterval(interval);
	}, [userID]);
	return cart;
};

const UseCartCount = (userID) => {
	const [count, setCount] = useState(null);

	useEffect(() => {
		const getCount = () => {
			try {
				Axios.post(`http://localhost:3001/cart/count`, {
					userID,
				})
					.then((res) => {
						setCount(res.data.cart);
					})
					.catch((err) => {
						if (err.response) Error();
						console.log(err);
					});
			} catch (error) {
				console.log(error);
			}
		};
		const interval = setInterval(getCount, 1000);
		return () => clearInterval(interval);
	}, [userID]);
	return count;
};

export const CartProvider = ({ userID, children }) => {
	const cartData = () => UseCartData(userID);
	const cartCount = () => UseCartCount(userID);

	const cartMethods = {
		cartData,
		cartCount,
	};
	return (
		<CartContext.Provider value={cartMethods}>{children}</CartContext.Provider>
	);
};

export const useCart = () => {
	return useContext(CartContext);
};
