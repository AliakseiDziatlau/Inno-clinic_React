import React from 'react';
import '../Styles/GreetingContainer.css'

const GreetingComponent: React.FC = () => {
    return (
        <div className="greeting-container">
            <h1 className="greeting">Happy to see you, "name"</h1>
        </div>
    );
} 

export default GreetingComponent;