import React, { createContext, useContext, useEffect, useState } from "react";
import Axios from "axios";

const CartContext = createContext();

const UseCartData = (userID) => {
	const [cart, setCart] = useState(null);

	useEffect(() => {
		const getCart = () => {
			try {
				Axios.post(`https://kain-lasalle-main-backend.onrender.com/cart/`, {
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
				Axios.post(
					`https://kain-lasalle-main-backend.onrender.com/cart/count`,
					{
						userID,
					}
				)
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

export const CartProvider = (props) => {
	const cartData = (userID) => UseCartData(userID);
	const cartCount = (userID) => UseCartCount(userID);

	const cartMethods = {
		cartData,
		cartCount,
	};
	return (
		<CartContext.Provider value={cartMethods}>
			{props.children}
		</CartContext.Provider>
	);
};

export const useCart = () => {
	return useContext(CartContext);
};
