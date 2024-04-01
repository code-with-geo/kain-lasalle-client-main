import React from "react";
import styled from "styled-components";
import { Label } from "../Components.styled";
import { Edit } from "@mui/icons-material";
import { useUserData } from "../../context/User";

const Container = styled.div`
	padding: 10px;
	background-color: #fff;
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Left = styled.div``;

const Right = styled.div``;

const EditButton = styled(Edit)`
	cursor: pointer;
`;

const Body = styled.div`
	margin-top: 10px;
`;

const List = styled.ul`
	list-style: none;
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const ListItem = styled.li`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

function UserInfo() {
	const user = useUserData();
	console.log(user);
	return (
		<>
			<Container>
				<Header>
					<Left>
						<Label color='#383737' fontSize='18px' fontWeight='500'>
							Personal Profile
						</Label>
					</Left>
					<Right>
						<EditButton fontSize='small' />
					</Right>
				</Header>
				<Body>
					<List>
						<ListItem>
							<Label color='#383737' fontSize='12px' fontWeight='400'>
								Name:
							</Label>
							<Label color='#383737' fontSize='12px' fontWeight='500'>
								{user != null ? user.name : ""}
							</Label>
						</ListItem>
						<ListItem>
							<Label color='#383737' fontSize='12px' fontWeight='400'>
								Email:
							</Label>
							<Label color='#383737' fontSize='12px' fontWeight='500'>
								{user != null ? user.email : ""}
							</Label>
						</ListItem>
						<ListItem>
							<Label color='#383737' fontSize='12px' fontWeight='400'>
								Mobile Number:
							</Label>
							<Label color='#383737' fontSize='12px' fontWeight='500'>
								{user != null ? user.phonenumber : "N/A"}
							</Label>
						</ListItem>
					</List>
				</Body>
			</Container>
		</>
	);
}

export default UserInfo;
