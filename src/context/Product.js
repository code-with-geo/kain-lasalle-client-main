import React, { createContext, useContext, useEffect, useState } from "react";
import Axios from "axios";

const ProductContext = createContext();

const useProductData = (storeID) => {
	const [product, setProduct] = useState(null);

	useEffect(() => {
		const getStore = () => {
			try {
				Axios.get(`http://localhost:3001/products/${storeID}`)
					.then((res) => {
						setProduct(res.data.products);
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
	}, [storeID]);

	return product;
};

export const ProductProvider = ({ storeID, children }) => {
	const productData = useProductData(storeID);
	return (
		<ProductContext.Provider value={productData}>
			{children}
		</ProductContext.Provider>
	);
};

export const useProduct = () => {
	return useContext(ProductContext);
};
