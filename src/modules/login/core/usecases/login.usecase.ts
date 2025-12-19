import type { AppDispatch } from "../../../store/store";
import { loginStart, loginSuccess, loginFailure } from "../slice/loginUI.slice";
import { setUser } from "../../../auth/core/slice/auth.slice";

export const loginUsecase = (email: string, password: string) => async (dispatch: AppDispatch) => {
        dispatch(loginStart());

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            if (email === "test@test.com" && password === "Password12345!") {
                const user = { email, name: "Evan azmd" };
                
                dispatch(setUser(user));
                dispatch(loginSuccess());
            } else {
                dispatch(loginFailure("Email ou mot de passe incorrect"));
            }
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Erreur inconnue";
            dispatch(loginFailure(message));
        }
    };