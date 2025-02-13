import React from 'react';
import DoctorCard from './DoctorCard.tsx';

import { DoctorsCardsContainerProps } from '../Types/DoctorsCardsContainerProps.ts';
import '../Styles/DoctorCardsContainer.css'
import { Doctor } from '../Types/Doctor.ts';
import { Photo } from '../../../Interfaces/Photo.ts';
import { User } from '../../../Interfaces/User.ts';

const DoctorCardsContainer: React.FC<DoctorsCardsContainerProps> = ({
    filteredDoctorsList,
    filteredPhotoList,
    filteredUserList,
}) => {
    const getPhotoForDoctor = (doctor: Doctor): Photo | undefined => {
        const user: User | undefined = filteredUserList.find((user) => user.email === doctor.email);
        return filteredPhotoList.find((photo) => photo.id === user?.documentsId);
    }
    
    return (
        <div className="cards-container">
            {filteredDoctorsList.map((doctor) => (
                <DoctorCard
                    key={doctor.email} 
                    photo={getPhotoForDoctor(doctor)?.url || "default-photo.jpg"}
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