import React from "react";
import styled from "styled-components";
import { Button, Label } from "../Components.styled";
import { useProduct } from "../../context/Product";
import { useGetUserID } from "../../hooks/User";
import { useParams } from "react-router-dom";
import Axios from "axios";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	padding: 5px;
`;

const Wrapper = styled.div`
	display: flex;
	justify-content: left;
	padding: 5px;
`;
const Content = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: left;
	margin-left: 10px;
`;

const Image = styled.img`
	width: 80px;
	height: 80px;
`;

function Cards() {
	const product = useProduct();
	const userID = useGetUserID();
	const { id } = useParams();

	const _addToCart = (productID, price) => {
		try {
			Axios.post(`http://localhost:3001/cart/add/${id}`, {
				userID,
				productID,
				price,
				units: 1,
			})
				.then((res) => {
					if (res.data.responsecode === "402") {
						alert(res.data.message);
					} else if (res.data.responsecode === "200") {
						alert(res.data.message);
					}
				})
				.catch((err) => {
					if (err.response) Error();
				});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			{product != null &&
				product.map((product) => {
					return (
						<Container>
							<Wrapper>
								<Image src={product.image} alt='' />
								<Content>
									<Label fontSize='16px' fontWeight='600' marginBottom='10px'>
										{product.name}
									</Label>
									<Label fontSize='10px' fontWeight='400' marginBottom='10px'>
										{product.description}
									</Label>
									<Label fontSize='12px' fontWeight='500' marginBottom='10px'>
										PHP {product.price}
									</Label>
								</Content>
							</Wrapper>
							<Button
								bgColor='#b0c5a4'
								color='#fff'
								padding='10px'
								onClick={() => _addToCart(product._id, product.price)}>
								Add to cart
							</Button>
						</Container>
					);
				})}
		</>
	);
}

export default Cards;
