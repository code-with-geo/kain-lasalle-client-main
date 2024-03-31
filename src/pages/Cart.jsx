import React from "react";
import styled from "styled-components";
import { Label } from "../components/Components.styled";
import Items from "../components/cart/Items";
import { CartProvider, useCart } from "../context/Cart";
import { useGetUserID } from "../hooks/User";

const Container = styled.div`
	width: 100%;
	max-width: 80%;
	margin: auto;
	padding: 10px;
	margin-bottom: 20px;
`;

const Content = styled.div`
	display: flex;
	justify-content: center;
	align-items: left;
	flex-direction: column;
`;

const Header = styled.div`
	flex: 1;
`;

const Body = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

function Cart() {
	const userID = useGetUserID();
	return (
		<>
			<Container>
				<Content>
					<Header>
						<Label
							color='#383737'
							fontSize='25px'
							fontWeight='500'
							marginBottom='20px'>
							My Cart
						</Label>
					</Header>
					<CartProvider userID={userID}>
						<Body>
							<Items />
						</Body>
					</CartProvider>
				</Content>
			</Container>
		</>
	);
}

export default Cart;
