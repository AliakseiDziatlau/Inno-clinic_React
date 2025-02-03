import React from 'react';
import '../Styles/UserProfileInfoContainer.css';
import { UserProfileInfoContainerProps } from '../Types/UserInfoContainerProps.ts';

const UserProfileInfoContainer: React.FC<UserProfileInfoContainerProps> = ({
    title,
    value
}) => {
    return (
        <div className="inline-container">
            <p>{title}: </p>
            <p>{value}</p>
        </div>
    );
}

export default UserProfileInfoContainer;