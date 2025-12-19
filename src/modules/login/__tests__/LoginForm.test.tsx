import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { LoginForm } from "../components/sections/LoginForm";
import { createTestStore } from "../../testing/test-environements";
import { loginStart, loginFailure } from "../core/slice/loginUI.slice";

const renderLoginForm = (store = createTestStore()) => {
    return render(
        <Provider store={store}>
            <BrowserRouter>
                <LoginForm />
            </BrowserRouter>
        </Provider>
    );
};

describe("LoginForm", () => {
    test("devrait afficher les champs du formulaire", () => {
        renderLoginForm();

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /se connecter/i })).toBeInTheDocument();
    });

    test("devrait permettre de saisir des valeurs dans les inputs", async () => {
        const user = userEvent.setup();
        renderLoginForm();

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/mot de passe/i);

        await user.type(emailInput, "test@example.com");
        await user.type(passwordInput, "password123");

        expect(emailInput).toHaveValue("test@example.com");
        expect(passwordInput).toHaveValue("password123");
    });

    test("devrait afficher le loader quand isLoading est true", () => {
        const store = createTestStore();
        store.dispatch(loginStart());
        renderLoginForm(store);

        expect(screen.getByRole("button", { name: /connexion.../i })).toBeInTheDocument();
    });

    test("devrait afficher l'erreur quand il y en a une", () => {
        const store = createTestStore();
        store.dispatch(loginFailure("Email ou mot de passe incorrect"));
        renderLoginForm(store);

        expect(screen.getByText("Email ou mot de passe incorrect")).toBeInTheDocument();
    });

    test("devrait afficher le lien vers l'inscription", () => {
        renderLoginForm();

        expect(screen.getByText(/s'inscrire/i)).toBeInTheDocument();
    });
});
