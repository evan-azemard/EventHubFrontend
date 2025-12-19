import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppWrapper } from "./modules/app/components/AppWrapper";
import { Layout } from "./modules/app/components/Layout";
import { Login } from "./modules/login/components/pages/Login";
import { Register } from "./modules/register/components/pages/Register";
import { Profile } from "./modules/profile/components/pages/Profile";
import type { AppState } from "./modules/store/store";

function AppRoutes() {
	const isAuthenticated = useSelector((state: AppState) => state.auth.isAuthenticated);

	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route
				path="/profile"
				element={isAuthenticated ? <Profile /> : <Navigate to="/login" replace />}
			/>
			<Route path="/" element={<Navigate to="/login" replace />} />
			<Route path="*" element={<Navigate to="/login" replace />} />
		</Routes>
	);
}

function App() {

	return (
		<AppWrapper>
			<BrowserRouter>
				<Layout>
					<AppRoutes />
				</Layout>
			</BrowserRouter>
		</AppWrapper>
	);
}

export default App;