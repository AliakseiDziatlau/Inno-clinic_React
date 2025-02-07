import React from 'react';
import { useUser } from '../../../Contexts/UserContext.tsx';
import '../Styles/GreetingContainer.css';

const GreetingComponent: React.FC = () => {
    const { currUser } = useUser();
    return (
        <div className="greeting-container">
            <h1 className="greeting">Happy to see you, {currUser?.firstName}!</h1>
        </div>
    );
} 

export default GreetingComponent;