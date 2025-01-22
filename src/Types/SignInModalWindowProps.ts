export interface SignInModalWindowProps {
    closeSignInModalWindow: () => void;
    handleFromSingInToSignUp: () => void;
    checkIfEmailExists: (email: string) => Promise<boolean>;
    signInError: boolean;
    setSignInError: (error: boolean) => void;
}