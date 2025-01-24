import React from 'react';
import DoctorCard from './DoctorCard.tsx';

import { DoctorsCardsContainerProps } from '../Types/DoctorsCardsContainerProps.ts';
import '../Styles/DoctorCardsContainer.css'

const DoctorCardsContainer: React.FC<DoctorsCardsContainerProps> = ({
    filteredDoctorsList,
}) => {
    return (
        <div className="cards-container">
            {filteredDoctorsList.map((doctor) => (
                <DoctorCard
                    photo={"photo"}
                    firstName={doctor.firstName}
                    middleName={doctor.middleName}
                    lastName={doctor.lastName}
                    experience={2025-doctor.careerStartYear+1}
                    officeAddress={doctor.officeId}
                />
            ))}
         </div>
    );
}

export default DoctorCardsContainer;