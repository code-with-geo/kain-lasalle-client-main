import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Top from "../components/navigator/Top";
import { UserProvider } from "../context/User";
import { useCookies } from "react-cookie";

const Container = styled.div``;

function Landing() {
	const [cookies, setCookies] = useCookies(["access_token"]);

	return (
		<>
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
		</>
	);
}

export default Landing;
