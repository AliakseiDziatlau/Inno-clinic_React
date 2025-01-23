import React from 'react';
import DoctorCard from './DoctorCard.tsx';
import { doctors } from '../Data/Doctors.ts';
import '../Styles/DoctorCardsContainer.css'

const DoctorCardsContainer: React.FC = () => {
    return (
        <div className="cards-container">
            {doctors.map((doctor) => (
                <DoctorCard
                    photo={"photo"}
                    firstName={doctor.FirstName}
                    middleName={doctor.MiddleName}
                    lastName={doctor.LastName}
                    experience={doctor.CareerStartYear-2025+1}
                    officeAddress={doctor.OfficeId}
                />
            ))}
         </div>
    );
}

export default DoctorCardsContainer;