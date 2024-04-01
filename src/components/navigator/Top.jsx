import { ShoppingBag, Settings, Logout } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
	Avatar,
	Chip,
	MenuItem,
	Divider,
	Menu,
	ListItemIcon,
	Badge,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useUserData } from "../../context/User";
import { useCart } from "../../context/Cart";

const Container = styled.div`
	height: 120px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #fff;
	z-index: 999;
	position: sticky;
	top: 0;
	box-shadow: 1px 8px 13px -9px rgba(0, 0, 0, 0.21);
	-webkit-box-shadow: 1px 8px 13px -9px rgba(0, 0, 0, 0.21);
	-moz-box-shadow: 1px 8px 13px -9px rgba(0, 0, 0, 0.21);
`;

const Wrapper = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: space-between;
	max-width: 80%;
	margin: auto;
	padding: 10px;
`;

const Left = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Logo = styled.img`
	height: 100px;
	width: 130px;
	cursor: pointer;
`;

const Button = styled.button`
	padding: ${(props) => props.padding};
	width: ${(props) => props.width};
	line-height: 1;
	outline: none;
	background-color: #fff;
	border: 1px solid #d2d4d6;
	font-size: 12px;
	font-weight: 400;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
`;

const Right = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const List = styled.ul`
	list-style: none;
	display: flex;
	gap: 10px;
`;

const ListItem = styled.li``;
function Top() {
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const data = useUserData();
	const [cookies, setCookies] = useCookies(["access_token"]);
	const { cartCount } = useCart();
	let count = cartCount();
	const _logout = () => {
		setCookies("access_token", "");
		window.localStorage.clear();
		navigate("/login");
	};

	return (
		<>
			<Container>
				<Wrapper>
					<Left>
						<Logo
							src='https://firebasestorage.googleapis.com/v0/b/studies-14951.appspot.com/o/assets%2Flogo-1.png?alt=media&token=6cefb280-8676-4b1a-8857-20b5da4757e6'
							alt=''
							onClick={() => {
								navigate("/");
							}}
						/>
					</Left>
					<Right>
						<List>
							{!cookies.access_token ? (
								<>
									<ListItem>
										<Button
											padding='6px'
											marginRight='10px'
											onClick={() => navigate("/cart")}>
											<ShoppingBag fontSize='small' />
										</Button>
									</ListItem>
									<ListItem>
										<Button
											width='130'
											padding='10px'
											onClick={() => navigate("/login")}>
											Login/Sign Up
										</Button>
									</ListItem>
								</>
							) : (
								<>
									<ListItem>
										<Badge badgeContent={count} color='secondary'>
											<Button
												padding='6px'
												marginRight='10px'
												onClick={() => navigate("/cart")}>
												<ShoppingBag fontSize='small' />
											</Button>
										</Badge>
									</ListItem>
									<ListItem>
										<Chip
											sx={{ marginRight: "20px" }}
											avatar={<Avatar src='/broken-image.jpg' />}
											label={data != null ? data.name : ""}
											variant='outlined'
											clickable
											onClick={handleClick}
											aria-controls={open ? "account-menu" : undefined}
											aria-haspopup='true'
											aria-expanded={open ? "true" : undefined}
										/>
										<Menu
											anchorEl={anchorEl}
											id='account-menu'
											open={open}
											onClose={handleClose}
											onClick={handleClose}
											PaperProps={{
												elevation: 0,
												sx: {
													overflow: "visible",
													filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
													mt: 1.5,
													fontFamily: "Roboto Serif",
													fontSize: "12px",
													"& .MuiAvatar-root": {
														width: 32,
														height: 32,
														ml: -0.5,
														mr: 1,
													},
													"&::before": {
														content: '""',
														display: "block",
														position: "absolute",
														top: 0,
														right: 14,
														width: 10,
														height: 10,
														bgcolor: "background.paper",
														transform: "translateY(-50%) rotate(45deg)",
														zIndex: 0,
													},
												},
											}}
											transformOrigin={{ horizontal: "right", vertical: "top" }}
											anchorOrigin={{
												horizontal: "right",
												vertical: "bottom",
											}}>
											<MenuItem
												onClick={() => navigate("/manage-account")}
												sx={{ fontSize: "14px" }}>
												<Avatar fontSize='small' /> Manage Account
											</MenuItem>
											<Divider />
											<MenuItem
												onClick={() => navigate("/settings")}
												sx={{ fontSize: "14px" }}>
												<ListItemIcon>
													<Settings fontSize='small' />
												</ListItemIcon>
												Settings
											</MenuItem>
											<MenuItem
												sx={{ fontSize: "14px" }}
												onClick={() => _logout()}>
												<ListItemIcon>
													<Logout fontSize='small' />
												</ListItemIcon>
												Logout
											</MenuItem>
										</Menu>
									</ListItem>
								</>
							)}
						</List>
					</Right>
				</Wrapper>
			</Container>
		</>
	);
}

export default Top;
