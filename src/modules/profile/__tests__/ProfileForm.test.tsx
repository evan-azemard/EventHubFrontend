import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ProfileForm } from "../components/sections/ProfileForm";
import { createTestStore } from "../../testing/test-environements";
import { setUser } from "../../auth/core/slice/auth.slice";
import { updateProfileFailure, updateProfileSuccess, startEditing } from "../core/slice/profileUI.slice";

const renderProfileForm = (store = createTestStore()) => {
    return render(
        <Provider store={store}>
            <BrowserRouter>
                <ProfileForm />
            </BrowserRouter>
        </Provider>
    );
};

describe("ProfileForm", () => {
    test("devrait afficher un message si aucun utilisateur connecté", () => {
        renderProfileForm();

        expect(screen.getByText(/aucun utilisateur connecté/i)).toBeInTheDocument();
    });

    test("devrait afficher les informations de l'utilisateur connecté", () => {
        const store = createTestStore();
        store.dispatch(setUser({ email: "test@example.com", firstName: "John", lastName: "Doe" }));
        renderProfileForm(store);

        expect(screen.getByLabelText(/email/i)).toHaveValue("test@example.com");
        expect(screen.getByRole("button", { name: /modifier/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /se déconnecter/i })).toBeInTheDocument();
    });

    test("devrait afficher l'erreur quand il y en a une", () => {
        const store = createTestStore();
        store.dispatch(setUser({ email: "test@example.com" }));
        store.dispatch(updateProfileFailure("Erreur de mise à jour"));
        renderProfileForm(store);

        expect(screen.getByText("Erreur de mise à jour")).toBeInTheDocument();
    });

    test("devrait afficher le message de succès après mise à jour", () => {
        const store = createTestStore();
        store.dispatch(setUser({ email: "test@example.com" }));
        store.dispatch(updateProfileSuccess());
        renderProfileForm(store);

        expect(screen.getByText("Profil mis à jour")).toBeInTheDocument();
    });

    test("devrait afficher les boutons de sauvegarde en mode édition", () => {
        const store = createTestStore();
        store.dispatch(setUser({ email: "test@example.com" }));
        store.dispatch(startEditing());
        renderProfileForm(store);

        expect(screen.getByRole("button", { name: /enregistrer/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /annuler/i })).toBeInTheDocument();
    });
});
