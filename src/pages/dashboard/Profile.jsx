import React from "react";
import styled from "styled-components";
import { Label } from "../../components/Components.styled";
import UserInfo from "../../components/manage-account/UserInfo";
import OrderList from "../../components/manage-account/OrderList";
import { UserProvider } from "../../context/User";

const Container = styled.div`
	padding: 10px;
	height: calc(100vh - 140px);
	background-color: #f8f9fa;
`;

const Wrapper = styled.div`
	width: 100%;
	max-width: 80%;
	margin: auto;
`;

const Content = styled.div`
	margin-bottom: 10px;
`;

const Info = styled.div`
	margin-bottom: 20px;
`;

const Orders = styled.div``;

function Profile() {
	return (
		<>
			<Container>
				<Wrapper>
					<Content>
						<Label color='#383737' fontSize='25px' fontWeight='500'>
							Manage Account
						</Label>
					</Content>
					<Info>
						<UserProvider>
							<UserInfo />
						</UserProvider>
					</Info>
					<Orders>
						<OrderList />
					</Orders>
				</Wrapper>
			</Container>
		</>
	);
}

export default Profile;
