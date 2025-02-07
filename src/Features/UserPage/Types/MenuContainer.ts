import { User } from './User.ts';

export interface MenuContainerProps {
    handleOurDoctorsBtn: () => void;
    currUser: User | null,
}