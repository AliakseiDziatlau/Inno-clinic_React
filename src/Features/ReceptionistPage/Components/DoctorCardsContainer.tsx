import React from 'react';
import { DoctorCardsContainerProps } from '../Types/DoctorCardsContainerProps.ts';
import DoctorCard from './DoctorCard.tsx';
import { useNavigate } from 'react-router-dom';
import config from '../../../Configurations/Config.ts';
import { Doctor } from '../../UserPage/Types/Doctor.ts';
import { Photo } from '../../../Interfaces/Photo.ts';
import { User } from '../../../Interfaces/User.ts';

const DoctorCardsContainer: React.FC<DoctorCardsContainerProps> = ({
    filteredDoctorList,
    filteredPhotoList,
    filteredUserList,
}) => {
    const navigate = useNavigate();

    const handleDoctorImageClick = (doctor: Doctor) => {
        navigate(config.ReceptionistPageChangeDoctorUrl, { state: { doctor, isReceptionist: true } });
    }

    const getPhotoForDoctor = (doctor: Doctor): Photo | undefined => {
        const user: User | undefined = filteredUserList.find((user) => user.email === doctor.email);
        return filteredPhotoList.find((photo) => photo.id === user?.documentsId);
    }

    return (
        <div className="cards-container">
            {filteredDoctorList.map((doctor) => (
                <DoctorCard
                    key={doctor.email} 
                    photo={getPhotoForDoctor(doctor)?.url || "default-photo.jpg"}
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

