import type { AppDispatch } from "../../../store/store";
import { updateProfileStart, updateProfileSuccess, updateProfileFailure } from "../slice/profileUI.slice";
import { updateUser } from "../../../auth/core/slice/auth.slice";

export const updateProfileUsecase =
    (data: {
        email: string;
        name: string;
        firstName?: string;
        lastName?: string;
    }) =>
    async (dispatch: AppDispatch) => {
        dispatch(updateProfileStart());

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            if (!data.email || !data.name) {
                dispatch(updateProfileFailure("Email et nom sont requis"));
                return;
            }

            dispatch(updateUser(data));
            dispatch(updateProfileSuccess());
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Erreur lors de la mise à jour du profil";
            dispatch(updateProfileFailure(message));
        }
    };
