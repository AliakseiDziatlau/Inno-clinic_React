import React from 'react';
import { DoctorCardsContainerProps } from '../Types/DoctorCardsContainerProps.ts';
import DoctorCard from './DoctorCard.tsx';
import { useNavigate } from 'react-router-dom';
import config from '../../../Configurations/Config.ts';
import { Doctor } from '../../UserPage/Types/Doctor.ts';

const DoctorCardsContainer: React.FC<DoctorCardsContainerProps> = ({
    filteredDoctorList
}) => {
    const navigate = useNavigate();

    const handleDoctorImageClick = (doctor: Doctor) => {
        navigate(config.ReceptionistPageChangeDoctorUrl, { state: { doctor, isReceptionist: true } });
    }

    return (
        <div className="cards-container">
            {filteredDoctorList.map((doctor) => (
                <DoctorCard
                    photo={"photo"}
                    firstName={doctor.firstName}
                    middleName={doctor.middleName}
                    lastName={doctor.lastName}
                    experience={2025-doctor.careerStartYear+1}
                    officeAddress={doctor.officeId}
                    onClick={() => handleDoctorImageClick(doctor)}
                />
            ))}
         </div>
    );
}

export default DoctorCardsContainer;

