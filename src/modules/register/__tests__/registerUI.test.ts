import { createTestStore } from "../../testing/test-environements";
import { registerStart, registerSuccess, registerFailure, resetRegisterUI } from "../core/slice/registerUI.slice";

describe("registerUISlice", () => {
    test("devrait mettre isLoading à true quand registerStart est appelé", () => {
        const store = createTestStore();

        store.dispatch(registerStart());

        expect(store.getState().registerUI.isLoading).toBe(true);
        expect(store.getState().registerUI.error).toBe(null);
        expect(store.getState().registerUI.success).toBe(false);
    });

    test("devrait mettre success à true quand registerSuccess est appelé", () => {
        const store = createTestStore();

        store.dispatch(registerStart());
        store.dispatch(registerSuccess());

        expect(store.getState().registerUI.isLoading).toBe(false);
        expect(store.getState().registerUI.success).toBe(true);
        expect(store.getState().registerUI.error).toBe(null);
    });

    test("devrait définir l'erreur quand registerFailure est appelé", () => {
        const store = createTestStore();
        const errorMessage = "Cet email est déjà utilisé";

        store.dispatch(registerStart());
        store.dispatch(registerFailure(errorMessage));

        expect(store.getState().registerUI.isLoading).toBe(false);
        expect(store.getState().registerUI.error).toBe(errorMessage);
        expect(store.getState().registerUI.success).toBe(false);
    });

    test("devrait réinitialiser l'état quand resetRegisterUI est appelé", () => {
        const store = createTestStore();

        store.dispatch(registerStart());
        store.dispatch(registerSuccess());
        store.dispatch(resetRegisterUI());

        expect(store.getState().registerUI.isLoading).toBe(false);
        expect(store.getState().registerUI.error).toBe(null);
        expect(store.getState().registerUI.success).toBe(false);
    });
});