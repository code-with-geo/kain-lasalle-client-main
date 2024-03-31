import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Label, TextBox } from "../../components/Components.styled";
import Axios from "axios";
import { useCart } from "../../context/Cart";

const Container = styled.div`
	display: flex;
	width: 100%;
	max-width: 90%;
	margin: auto;
`;

const Image = styled.img`
	width: 80px;
	height: 80px;
	margin-right: 20px;
	border-radius: 4px;
`;

const Body = styled.div`
	display: flex;
	align-items: center;
	justify-content: left;
	flex: 1;
`;

const Content = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Left = styled.div`
	display: flex;
	align-items: left;
	justify-content: left;
	flex-direction: column;
`;

const Line = styled.div`
	border: 1px solid #f8f6f6;
	width: 100%;
	max-width: 80%;
	margin: auto;
	margin-bottom: 10px;
	margin-top: 10px;
`;

const Right = styled.div``;

function CartItems() {
	const { cartData, cartTotal } = useCart();
	const cart = cartData();
	const total = cartTotal();

	return (
		<>
			{cart != null &&
				cart.map((cart) => {
					return cart.product.map((value) => {
						return (
							<>
								<Container>
									<Body>
										<Image src={value.image} alt='' />
										<Content>
											<Left>
												<Label color='#383737' fontSize='12px' fontWeight='500'>
													{value.name}
												</Label>
												<Label color='#383737' fontSize='12px' fontWeight='500'>
													PHP {value.price}.00
												</Label>
												<Label color='#383737' fontSize='12px' fontWeight='500'>
													PHP {cart.price * cart.units}.00
												</Label>
											</Left>
											<Right>
												<Button
													padding='8px'
													width='25px'
													bgColor='#b0c5a4'
													color='#fff'>
													-
												</Button>
												<TextBox
													type='text'
													padding='5px'
													textAlign='center'
													value={cart.units}
												/>
												<Button
													padding='8px'
													width='25px'
													bgColor='#b0c5a4'
													color='#fff'>
													+
												</Button>
											</Right>
										</Content>
									</Body>
								</Container>
								<Line> </Line>
							</>
						);
					});
				})}
		</>
	);
}

export default CartItems;
