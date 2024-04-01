import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/authentication/Login";
import Signup from "./pages/authentication/Signup";
import Forgot from "./pages/authentication/Forgot";
import Reset from "./pages/authentication/Reset";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import { StoreProvider } from "./context/Store";
import Store from "./pages/Store";
import Cart from "./pages/Cart";
import Profile from "./pages/dashboard/Profile";
function App() {
	return (
		<div className='App'>
			<StoreProvider>
				<Router>
					<Routes>
						<Route path='/login' element={<Login />} />
						<Route path='/signup' element={<Signup />} />
						<Route path='/forgot' element={<Forgot />} />
						<Route path='/:userID/reset/:token' element={<Reset />} />
						<Route path='/' element={<Landing />}>
							<Route index element={<Home />} />
							<Route path='/store/:id' element={<Store />} />
							<Route path='/cart' element={<Cart />} />
							<Route path='/manage-account' element={<Profile />} />
						</Route>
					</Routes>
				</Router>
			</StoreProvider>
		</div>
	);
}

export default App;
