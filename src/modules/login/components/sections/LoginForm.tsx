import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { Link } from "react-router-dom";
import { useLoginForm } from "../../hooks/useLoginForm";

export const LoginForm = () => {
    const hook = useLoginForm();

    return (
        <Box
            component="form"
            onSubmit={hook.handleSubmit}
            sx={{ maxWidth: 400, mx: "auto", mt: 4, p: 3 }}
        >
            <Typography variant="h4" gutterBottom>
                Connexion
            </Typography>

            {hook.error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {hook.error}
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
            />

            <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={!hook.isFormValid() || hook.isLoading}
                sx={{ mt: 2 }}
            >
                {hook.isLoading ? "Connexion..." : "Se connecter"}
            </Button>

            <Box sx={{ mt: 2, textAlign: "center" }}>
                <Typography variant="body2">
                    Pas encore de compte ?{" "}
                    <Link to="/register" style={{ textDecoration: "none", color: "#1976d2" }}>
                        S'inscrire
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
};