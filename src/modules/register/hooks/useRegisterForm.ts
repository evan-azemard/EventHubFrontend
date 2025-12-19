import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppState } from "../../store/store";
import { useAppDispatch } from "../../store/store";
import { registerUsecase } from "../core/usecases/register.usecase";
import { validatePassword, getPasswordErrors, isPasswordValid } from "../utils/passwordValidation";

export const useRegisterForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const { isLoading, error, success } = useSelector((state: AppState) => state.registerUI);
    const { user, isAuthenticated } = useSelector((state: AppState) => state.auth);

    useEffect(() => {
        if (password) {
            const validation = validatePassword(password);
            setPasswordErrors(getPasswordErrors(validation));
        } else {
            setPasswordErrors([]);
        }
    }, [password]);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/profile");
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(registerUsecase({ email, password, firstName, lastName }));
    };

    const isFormValid = () => {
        const validation = validatePassword(password);
        return (
            email.trim() !== "" &&
            password.trim() !== "" &&
            firstName.trim() !== "" &&
            lastName.trim() !== "" &&
            isPasswordValid(validation)
        );
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        passwordErrors,
        handleSubmit,
        isFormValid,
        isLoading,
        error,
        success,
        user,
        isAuthenticated,
    };
};