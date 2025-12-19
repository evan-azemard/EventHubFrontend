import { createTestStore } from "../../testing/test-environements";
import {
    loadProfileStart,
    loadProfileSuccess,
    loadProfileFailure,
    updateProfileStart,
    updateProfileSuccess,
    startEditing,
    cancelEditing,
    markAsChanged,
    resetProfileUI,
} from "../core/slice/profileUI.slice";

describe("profileUISlice", () => {
    test("devrait mettre isLoading à true quand loadProfileStart est appelé", () => {
        const store = createTestStore();

        store.dispatch(loadProfileStart());

        expect(store.getState().profileUI.isLoading).toBe(true);
        expect(store.getState().profileUI.error).toBe(null);
    });

    test("devrait mettre isLoading à false quand loadProfileSuccess est appelé", () => {
        const store = createTestStore();

        store.dispatch(loadProfileStart());
        store.dispatch(loadProfileSuccess());

        expect(store.getState().profileUI.isLoading).toBe(false);
        expect(store.getState().profileUI.error).toBe(null);
    });

    test("devrait définir l'erreur quand loadProfileFailure est appelé", () => {
        const store = createTestStore();
        const errorMessage = "Erreur lors du chargement du profil";

        store.dispatch(loadProfileStart());
        store.dispatch(loadProfileFailure(errorMessage));

        expect(store.getState().profileUI.isLoading).toBe(false);
        expect(store.getState().profileUI.error).toBe(errorMessage);
    });

    test("devrait activer le mode édition quand startEditing est appelé", () => {
        const store = createTestStore();

        store.dispatch(startEditing());

        expect(store.getState().profileUI.isEditing).toBe(true);
        expect(store.getState().profileUI.updateSuccess).toBe(false);
    });

    test("devrait marquer comme modifié quand markAsChanged est appelé", () => {
        const store = createTestStore();

        store.dispatch(markAsChanged());

        expect(store.getState().profileUI.hasUnsavedChanges).toBe(true);
    });

    test("devrait annuler l'édition quand cancelEditing est appelé", () => {
        const store = createTestStore();

        store.dispatch(startEditing());
        store.dispatch(markAsChanged());
        store.dispatch(cancelEditing());

        expect(store.getState().profileUI.isEditing).toBe(false);
        expect(store.getState().profileUI.hasUnsavedChanges).toBe(false);
    });

    test("devrait mettre updateSuccess à true quand updateProfileSuccess est appelé", () => {
        const store = createTestStore();

        store.dispatch(startEditing());
        store.dispatch(markAsChanged());
        store.dispatch(updateProfileStart());
        store.dispatch(updateProfileSuccess());

        expect(store.getState().profileUI.isLoading).toBe(false);
        expect(store.getState().profileUI.updateSuccess).toBe(true);
        expect(store.getState().profileUI.isEditing).toBe(false);
        expect(store.getState().profileUI.hasUnsavedChanges).toBe(false);
    });

    test("devrait réinitialiser l'état quand resetProfileUI est appelé", () => {
        const store = createTestStore();

        store.dispatch(startEditing());
        store.dispatch(markAsChanged());
        store.dispatch(resetProfileUI());

        expect(store.getState().profileUI.isLoading).toBe(false);
        expect(store.getState().profileUI.error).toBe(null);
        expect(store.getState().profileUI.isEditing).toBe(false);
        expect(store.getState().profileUI.hasUnsavedChanges).toBe(false);
        expect(store.getState().profileUI.updateSuccess).toBe(false);
    });
});