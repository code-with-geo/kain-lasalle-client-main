import React, { useState } from "react";
import styled from "styled-components";
import { Label, Button, TextBox } from "../Components.styled";
import { useCart } from "../../context/Cart";
import Axios from "axios";
import { useGetUserID } from "../../hooks/User";
import { useNavigate } from "react-router-dom";
import { ToggleMessage } from "../../utils/SweetAlert";

const Container = styled.div`
	width: 100%;
	padding: 10px;
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Line = styled.div`
	border: 1px solid #f8f6f6;
	width: 100%;
	max-width: 100%;
	margin: auto;
	margin-bottom: 10px;
	margin-top: 10px;
`;

const Left = styled.div`
	display: flex;
`;

const UnitsContainer = styled.div`
	display: flex;
	align-items: center;
`;

const ProductContainer = styled.div`
	display: flex;
	align-items: center;
	margin: 20px;
`;
const ProductImage = styled.div``;

const Image = styled.img`
	width: 80px;
	height: 80px;
`;

const ProductDetail = styled.div`
	margin-left: 5px;
	max-width: 500px;
	text-align: left;
`;

const Right = styled.div``;

const Footer = styled.div`
	margin-top: 20px;
	display: flex;
	align-items: center;
	justify-content: right;
	flex-direction: column;
`;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
`;

const ButtonContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 20px;
`;

const PaymentMethod = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 50px;
`;

function Items() {
	const userID = useGetUserID();
	const navigate = useNavigate();
	const { cartData } = useCart();
	const cart = cartData(userID);

	const totalCart = () => {
		let SubTotal = 0;
		cart != null &&
			cart.map((value) => {
				return (SubTotal += value.subtotal);
			});
		return SubTotal;
	};

	const getStoreID = () => {
		let id = "null";
		if (cart != null) {
			id = cart[0].storeID;
		}
		return id;
	};

	const subtotal = totalCart();

	const [paymentType, setPaymentType] = useState("Cash");

	const handleCheckboxChange = (e) => {
		setPaymentType(e.target.value);
	};

	const createOrder = () => {
		try {
			Axios.post(
				`https://kain-lasalle-main-backend.onrender.com/orders/create`,
				{
					userID,
					storeID: getStoreID(),
					total: subtotal,
					paymentType,
				}
			)
				.then((res) => {
					if (res.data.responsecode === "402") {
						console.log(res.data.responsecode);
					} else if (res.data.responsecode === "200") {
						if (res.data.paymenttype === "Pay Online") {
							navigate("/");
							window.open(`${res.data.paymenturl}`, "_blank");
						} else {
							ToggleMessage(
								"success",
								"Please pay over the counter here's your order id:" +
									res.data.ordernumber
							);
							navigate("/");
						}
					}
				})
				.catch((err) => {
					if (err.response) Error();
				});
		} catch (error) {
			console.log(error);
		}
	};

	const _addToCart = (productID, price) => {
		try {
			Axios.post(
				`https://kain-lasalle-main-backend.onrender.com/cart/add/${getStoreID()}`,
				{
					userID,
					productID,
					price,
					units: 1,
				}
			)
				.then((res) => {
					if (res.data.responsecode === "402") {
						ToggleMessage("error", res.data.message);
					} else if (res.data.responsecode === "200") {
						ToggleMessage("success", res.data.message);
					}
				})
				.catch((err) => {
					if (err.response) Error();
				});
		} catch (error) {
			console.log(error);
		}
	};

	const removeToCart = (id) => {
		try {
			Axios.post(`https://kain-lasalle-main-backend.onrender.com/cart/remove`, {
				userID,
				productID: id,
			})
				.then((res) => {
					if (res.data.responsecode === "402") {
						ToggleMessage("error", res.data.message);
					} else if (res.data.responsecode === "200") {
						ToggleMessage("success", res.data.message);
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
			{cart != null &&
				cart.map((cart) => {
					return cart.product.map((value) => {
						return (
							<>
								<Container>
									<Header>
										<Left>
											<UnitsContainer>
												<Button
													padding='5px'
													marginRight='10px'
													bgColor='#fff'
													onClick={() => {
														removeToCart(value._id);
													}}>
													-
												</Button>
												<Label>{cart.units}</Label>
												<Button
													padding='5px'
													marginLeft='10px'
													bgColor='#fff'
													onClick={() => {
														_addToCart(value._id, value.price);
													}}>
													+
												</Button>
											</UnitsContainer>
											<ProductContainer>
												<ProductImage>
													<Image src={value.image} alt='' />
												</ProductImage>
												<ProductDetail>
													<Label fontSize='18px' marginBottom='5px'>
														{value.name}
													</Label>
													<Label fontSize='12px'>{value.description}</Label>
												</ProductDetail>
											</ProductContainer>
										</Left>
										<Right>
											<Label>PHP {cart.subtotal}</Label>
										</Right>
									</Header>
								</Container>
								<Line> </Line>
							</>
						);
					});
				})}
			<Footer>
				<PaymentMethod>
					<Label marginRight='50px'>
						<TextBox
							type='checkbox'
							value='Cash'
							checked={paymentType === "Cash"}
							onChange={handleCheckboxChange}
						/>
						Cash
					</Label>
					<br />
					<Label>
						<TextBox
							type='checkbox'
							value='Pay Online'
							checked={paymentType === "Pay Online"}
							onChange={handleCheckboxChange}
						/>
						Pay Online
					</Label>
				</PaymentMethod>
				<Wrapper>
					<Label marginRight='200px'>Total</Label>
					<Label>PHP {subtotal}</Label>
				</Wrapper>
				<ButtonContainer>
					<Button
						padding='10px'
						width='250px'
						height='40px'
						marginRight='20px'
						bgColor='#dcdede'
						borderRadius='5px'
						onClick={() => {
							navigate("/");
						}}>
						Back
					</Button>
					<Button
						padding='10px'
						width='250px'
						height='40px'
						bgColor='#b0c5a4'
						color='#fff'
						borderRadius='5px'
						onClick={() => {
							createOrder();
						}}>
						Place Order
					</Button>
				</ButtonContainer>
			</Footer>
		</>
	);
}

export default Items;
