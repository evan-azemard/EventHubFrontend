import type { AppDispatch } from "../../../store/store";
import { registerStart, registerSuccess, registerFailure } from "../slice/registerUI.slice";
import { setUser } from "../../../auth/core/slice/auth.slice";

export const registerUsecase =
    (data: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
    }) =>
    async (dispatch: AppDispatch) => {
        dispatch(registerStart());

        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));

            if (data.email === "existing@test.com") {
                dispatch(registerFailure("Cet email est déjà utilisé"));
                return;
            }

            const user = {
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
            };

            dispatch(setUser(user));
            dispatch(registerSuccess());
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Erreur lors de l'inscription";
            dispatch(registerFailure(message));
        }
    };