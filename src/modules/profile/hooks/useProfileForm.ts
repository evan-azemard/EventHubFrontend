import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { AppState } from "../../store/store";
import { useAppDispatch } from "../../store/store";
import { updateProfileUsecase } from "../core/usecases/updateProfile.usecase";
import { startEditing, cancelEditing, markAsChanged } from "../core/slice/profileUI.slice";

export const useProfileForm = () => {
    const dispatch = useAppDispatch();
    const { user } = useSelector((state: AppState) => state.auth);
    const { isLoading, error, isEditing, hasUnsavedChanges, updateSuccess } = useSelector(
        (state: AppState) => state.profileUI
    );

    const [email, setEmail] = useState(user?.email || "");
    const [name, setName] = useState(user?.name || "");
    const [firstName, setFirstName] = useState(user?.firstName || "");
    const [lastName, setLastName] = useState(user?.lastName || "");

    useEffect(() => {
        if (user) {
            setEmail(user.email);
            setName(user.name);
            setFirstName(user.firstName || "");
            setLastName(user.lastName || "");
        }
    }, [user]);

    const handleEdit = () => {
        dispatch(startEditing());
    };

    const handleCancel = () => {
        if (user) {
            setEmail(user.email);
            setName(user.name);
            setFirstName(user.firstName || "");
            setLastName(user.lastName || "");
        }
        dispatch(cancelEditing());
    };

    const handleChange = () => {
        if (! hasUnsavedChanges) {
            dispatch(markAsChanged());
        }
    };

    const handleEmailChange = (value: string) => {
        setEmail(value);
        handleChange();
    };

    const handleNameChange = (value: string) => {
        setName(value);
        handleChange();
    };

    const handleFirstNameChange = (value: string) => {
        setFirstName(value);
        handleChange();
    };

    const handleLastNameChange = (value: string) => {
        setLastName(value);
        handleChange();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(updateProfileUsecase({ email, name, firstName, lastName }));
    };

    const isFormValid = () => {
        return email.trim() !== "" && name.trim() !== "" && hasUnsavedChanges;
    };

    return {
        email,
        handleEmailChange,
        name,
        handleNameChange,
        firstName,
        handleFirstNameChange,
        lastName,
        handleLastNameChange,
        handleEdit,
        handleCancel,
        handleSubmit,
        isFormValid,
        isLoading,
        error,
        isEditing,
        hasUnsavedChanges,
        updateSuccess,
        user,
    };
};