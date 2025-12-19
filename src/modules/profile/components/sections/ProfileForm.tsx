import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser } from "../../../auth/core/slice/auth.slice";
import { useProfileForm } from "../../hooks/useProfileForm";

export const ProfileForm = () => {
    const hook = useProfileForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(clearUser());
        navigate("/login");
    };

    if (!hook.user) {
        return (
            <Box sx={{ maxWidth: 600, mx: "auto", mt:  4, p: 3 }}>
                <Alert severity="warning">Aucun utilisateur connecté</Alert>
            </Box>
        );
    }

    return (
        <Box
            component="form"
            onSubmit={hook.handleSubmit}
            sx={{ maxWidth:  600, mx: "auto", mt:  4, p: 3 }}
        >
            <Typography variant="h4" gutterBottom>
                Profil
            </Typography>

            {hook.error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {hook.error}
                </Alert>
            )}

            {hook.updateSuccess && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    Profil mis à jour
                </Alert>
            )}

            <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                value={hook.email}
                onChange={(e) => hook.handleEmailChange(e.target.value)}
                disabled={!hook.isEditing}
                required
            />

            <TextField
                label="Prénom"
                type="text"
                fullWidth
                margin="normal"
                value={hook.firstName}
                onChange={(e) => hook.handleFirstNameChange(e.target.value)}
                disabled={!hook.isEditing}
            />

            <TextField
                label="Nom de famille"
                type="text"
                fullWidth
                margin="normal"
                value={hook.lastName}
                onChange={(e) => hook.handleLastNameChange(e.target.value)}
                disabled={!hook.isEditing}
            />

            <Box sx={{ mt: 3 }}>
                {!hook.isEditing ? (
                    <>
                        <Button variant="contained" onClick={hook.handleEdit} fullWidth sx={{ mb: 2 }}>
                            Modifier
                        </Button>
                        <Button variant="outlined" color="error" onClick={handleLogout} fullWidth>
                            Se déconnecter
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={!hook.isFormValid() || hook.isLoading}
                            fullWidth
                            sx={{ mb: 1 }}
                        >
                            {hook.isLoading ? "Enregistrement..." : "Enregistrer"}
                        </Button>
                        <Button variant="outlined" onClick={hook.handleCancel} fullWidth>
                            Annuler
                        </Button>
                    </>
                )}
            </Box>
        </Box>
    );
};