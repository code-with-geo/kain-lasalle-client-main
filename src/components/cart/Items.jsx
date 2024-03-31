import React from "react";
import styled from "styled-components";
import { Label, Button } from "../Components.styled";
import { useCart } from "../../context/Cart";

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
`;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
`;

function Items() {
	const { cartData, cartTotal } = useCart();
	const cart = cartData();
	const total = cartTotal();

	const totalCart = () => {
		let SubTotal = 0;
		{
			total != null &&
				total.map((value) => {
					SubTotal += value.total;
				});
		}
		return SubTotal;
	};

	const subtotal = totalCart();
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
												<Button padding='5px' marginRight='10px' bgColor='#fff'>
													-
												</Button>
												<Label>{cart.units}</Label>
												<Button padding='5px' marginLeft='10px' bgColor='#fff'>
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
											<Label>PHP {cart.price * cart.units}</Label>
										</Right>
									</Header>
								</Container>
								<Line> </Line>
							</>
						);
					});
				})}
			<Footer>
				<Wrapper>
					<Label marginRight='200px'>Total</Label>
					<Label>PHP {subtotal}</Label>
				</Wrapper>
				<Button
					onClick={() => {
						window.open(
							"https://pm.link/org-FRnQyvnkN971qNXHAi4Y3k43/test/2iEzYr8"
						);
					}}>
					Check Out
				</Button>
			</Footer>
		</>
	);
}

export default Items;
