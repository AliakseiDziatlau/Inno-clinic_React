export interface SignUpModalWindowProps {
    closeSignUpModalWindow: () => void;
    handleFromSignUpToSignIn: () => void;
    checkIfEmailExists: (email: string) => Promise<boolean>;
}