export type PasswordError = {
    hasMinLength: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasDigit: boolean;
    hasSpecialChar: boolean;
};

export function validatePassword(password: string): PasswordError {
    return {
        hasMinLength: password.length >= 12,
        hasUppercase: /[A-Z]/.test(password),
        hasLowercase: /[a-z]/.test(password),
        hasDigit: /[0-9]/.test(password),
        hasSpecialChar: /[^A-Za-z0-9]/.test(password),
    };
}

export function getPasswordErrors(validation: PasswordError): string[] {
    const errors: string[] = [];

    if (!validation.hasMinLength) errors.push("Minimum 12 caractères");
    if (!validation.hasUppercase) errors.push("Au moins une majuscule");
    if (!validation.hasLowercase) errors.push("Au moins une minuscule");
    if (!validation.hasDigit) errors.push("Au moins un chiffre");
    if (!validation.hasSpecialChar) errors.push("Au moins un caractère spécial");

    return errors;
}

export function isPasswordValid(validation: PasswordError): boolean {
    return (
        validation.hasMinLength &&
        validation.hasUppercase &&
        validation.hasLowercase &&
        validation.hasDigit &&
        validation.hasSpecialChar
    );
}