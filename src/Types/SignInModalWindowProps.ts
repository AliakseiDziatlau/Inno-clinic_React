export interface SignInModalWindowProps {
    closeSignInModalWindow: () => void;
    handleFromSingInToSignUp: () => void;
    signInError: boolean;
    setSignInError: (error: boolean) => void;
}