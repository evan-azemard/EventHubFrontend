import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppState } from "../../store/store";
import { useAppDispatch } from "../../store/store";
import { loginUsecase } from "../core/usecases/login.usecase";

export const useLoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const { isLoading, error } = useSelector((state: AppState) => state.loginUI);
    const { user, isAuthenticated } = useSelector((state: AppState) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/profile");
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(loginUsecase(email, password));
    };

    const isFormValid = () => {
        return email.trim() !== "" && password.trim() !== "";
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        handleSubmit,
        isFormValid,
        isLoading,
        error,
        user,
        isAuthenticated,
    };
};