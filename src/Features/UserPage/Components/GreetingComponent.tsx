import React from 'react';
import '../Styles/GreetingContainer.css';
import { Patient } from '../../../Interfaces/Patient.ts';
import { useState, useEffect } from "react";

const GreetingComponent: React.FC = () => {
    const [patient, setPatient] = useState<Patient | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true); 

    useEffect(() => {
        const fetchPatient = () => {
            setTimeout(() => {
                const storedPatient = localStorage.getItem("patient");
                if (storedPatient) {
                    setPatient(JSON.parse(storedPatient));
                }
                setIsLoading(false);
            }, 500); 
        };

        fetchPatient();
    }, []);

    if (isLoading) {
        return (
            <div className="greeting-container">
                <h1>Loading...</h1>
            </div>); 
    }

    return (
        <div className="greeting-container">
            <h1 className="greeting">
                {patient ? `Happy to see you, ${patient.firstName}!` : "Welcome!"}
            </h1>
        </div>
    );
};

export default GreetingComponent;