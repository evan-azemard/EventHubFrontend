import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { RegisterForm } from "../components/sections/RegisterForm";
import { createTestStore } from "../../testing/test-environements";
import { registerStart, registerFailure, registerSuccess } from "../core/slice/registerUI.slice";

const renderRegisterForm = (store = createTestStore()) => {
    return render(
        <Provider store={store}>
            <BrowserRouter>
                <RegisterForm />
            </BrowserRouter>
        </Provider>
    );
};

describe("RegisterForm", () => {
    test("devrait afficher les champs du formulaire", () => {
        renderRegisterForm();

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/prénom/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/nom de famille/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /s'inscrire/i })).toBeInTheDocument();
    });

    test("devrait permettre de saisir des valeurs dans les inputs", async () => {
        const user = userEvent.setup();
        renderRegisterForm();

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/mot de passe/i);

        await user.type(emailInput, "test@example.com");
        await user.type(passwordInput, "Password123!");

        expect(emailInput).toHaveValue("test@example.com");
        expect(passwordInput).toHaveValue("Password123!");
    });

    test("devrait afficher le loader quand isLoading est true", () => {
        const store = createTestStore();
        store.dispatch(registerStart());
        renderRegisterForm(store);

        expect(screen.getByRole("button", { name: /inscription.../i })).toBeInTheDocument();
    });

    test("devrait afficher l'erreur quand il y en a une", () => {
        const store = createTestStore();
        store.dispatch(registerFailure("Cet email existe déjà"));
        renderRegisterForm(store);

        expect(screen.getByText("Cet email existe déjà")).toBeInTheDocument();
    });

    test("devrait afficher le message de succès", () => {
        const store = createTestStore();
        store.dispatch(registerSuccess());
        renderRegisterForm(store);

        expect(screen.getByText("Inscription réussie")).toBeInTheDocument();
    });
});
