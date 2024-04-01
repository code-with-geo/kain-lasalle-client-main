import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Top from "../components/navigator/Top";
import { UserProvider } from "../context/User";
import { useCookies } from "react-cookie";
import { CartProvider } from "../context/Cart";
import { useGetUserID } from "../hooks/User";

const Container = styled.div``;

function Landing() {
	const [cookies, setCookies] = useCookies(["access_token"]);
	const userID = useGetUserID();
	return (
		<>
			<Container>
				{!cookies.access_token ? (
					<Top />
				) : (
					<CartProvider userID={userID}>
						<UserProvider>
							<Top />
						</UserProvider>
					</CartProvider>
				)}
				<Outlet />
			</Container>
		</>
	);
}

export default Landing;
