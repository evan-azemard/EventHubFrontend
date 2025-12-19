import { createTestStore } from "../../testing/test-environements";
import { loginStart, loginSuccess, loginFailure, resetLoginUI } from "../core/slice/loginUI.slice";

describe("loginUISlice", () => {
    test("devrait mettre isLoading à true quand loginStart est appelé", () => {
        const store = createTestStore();

        store.dispatch(loginStart());

        expect(store.getState().loginUI.isLoading).toBe(true);
        expect(store.getState().loginUI.error).toBe(null);
    });

    test("devrait mettre isLoading à false quand loginSuccess est appelé", () => {
        const store = createTestStore();

        store.dispatch(loginStart());
        store.dispatch(loginSuccess());

        expect(store.getState().loginUI.isLoading).toBe(false);
        expect(store.getState().loginUI.error).toBe(null);
    });

    test("devrait définir l'erreur quand loginFailure est appelé", () => {
        const store = createTestStore();
        const errorMessage = "Email ou mot de passe incorrect";

        store.dispatch(loginStart());
        store.dispatch(loginFailure(errorMessage));

        expect(store.getState().loginUI.isLoading).toBe(false);
        expect(store.getState().loginUI.error).toBe(errorMessage);
    });

    test("devrait réinitialiser l'état quand resetLoginUI est appelé", () => {
        const store = createTestStore();

        store.dispatch(loginStart());
        store.dispatch(loginFailure("Error"));
        store.dispatch(resetLoginUI());

        expect(store.getState().loginUI.isLoading).toBe(false);
        expect(store.getState().loginUI.error).toBe(null);
    });
});