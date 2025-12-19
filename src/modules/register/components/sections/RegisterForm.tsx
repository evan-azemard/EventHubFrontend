import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { Link } from "react-router-dom";
import { useRegisterForm } from "../../hooks/useRegisterForm";

export const RegisterForm = () => {
    const hook = useRegisterForm();

    return (
        <Box
            component="form"
            onSubmit={hook.handleSubmit}
            sx={{ maxWidth: 400, mx: "auto", mt: 4, p: 3 }}
        >
            <Typography variant="h4" gutterBottom>
                Inscription
            </Typography>

            {hook.error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {hook.error}
                </Alert>
            )}

            {hook.success && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    Inscription réussie
                </Alert>
            )}

            <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                value={hook.email}
                onChange={(e) => hook.setEmail(e.target.value)}
                required
            />

            <TextField
                label="Mot de passe"
                type="password"
                fullWidth
                margin="normal"
                value={hook.password}
                onChange={(e) => hook.setPassword(e.target.value)}
                required
                error={hook.passwordErrors.length > 0}
                helperText={hook.passwordErrors.join(", ")}
            />

            <TextField
                label="Prénom"
                type="text"
                fullWidth
                margin="normal"
                value={hook.firstName}
                onChange={(e) => hook.setFirstName(e.target.value)}
                required
            />

            <TextField
                label="Nom de famille"
                type="text"
                fullWidth
                margin="normal"
                value={hook.lastName}
                onChange={(e) => hook.setLastName(e.target.value)}
                required
            />

            <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={!hook.isFormValid() || hook.isLoading}
                sx={{ mt: 2 }}
            >
                {hook.isLoading ? "Inscription..." : "S'inscrire"}
            </Button>

            <Box sx={{ mt: 2, textAlign: "center" }}>
                <Typography variant="body2">
                    Déjà un compte ?{" "}
                    <Link to="/login" style={{ textDecoration: "none", color: "#1976d2" }}>
                        Se connecter
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
};