import { createTestStore } from "../../testing/test-environements";
import { setUser, updateUser, clearUser } from "../core/slice/auth.slice";

describe("authSlice", () => {
    test("devrait définir l'utilisateur quand setUser est appelé", () => {
        const store = createTestStore();
        const user = { email: "test@test.com", name: "John Doe" };

        store.dispatch(setUser(user));

        expect(store.getState().auth.user).toEqual(user);
        expect(store.getState().auth.isAuthenticated).toBe(true);
    });

    test("devrait mettre à jour l'utilisateur quand updateUser est appelé", () => {
        const store = createTestStore();
        const user = { email: "test@test.com", name: "Evan Azmd" };

        store.dispatch(setUser(user));
        store.dispatch(updateUser({ firstName: "Evan", lastName: "Azmd" }));

        expect(store.getState().auth.user).toEqual({
            email: "test@test.com",
            name: "Evan Azmd",
            firstName: "Evan",
            lastName: "Azmd",
        });
    });

    test("devrait effacer l'utilisateur quand clearUser est appelé", () => {
        const store = createTestStore();
        const user = { email: "test@test.com", name: "Evan Azmd" };

        store.dispatch(setUser(user));
        store.dispatch(clearUser());

        expect(store.getState().auth.user).toBe(null);
        expect(store.getState().auth.isAuthenticated).toBe(false);
    });
});