import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Top from "../components/navigator/Top";
import { UserProvider } from "../context/User";
import { useCookies } from "react-cookie";
import { CartProvider } from "../context/Cart";

const Container = styled.div``;

function Landing() {
	const [cookies, setCookies] = useCookies(["access_token"]);
	return (
		<>
			<CartProvider>
				<Container>
					{!cookies.access_token ? (
						<Top />
					) : (
						<UserProvider>
							<Top />
						</UserProvider>
					)}
					<Outlet />
				</Container>
			</CartProvider>
		</>
	);
}

export default Landing;
