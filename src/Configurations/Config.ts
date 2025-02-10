const config = {
    AuthServiceCheckEmailUrl: "http://localhost:5001/api/auths/check-email?email=",
    AuthServiceLoginUrl: "http://localhost:5001/api/auths/login",
    AuthServiceRegisterUrl: "http://localhost:5001/api/auths/register",
    AuthServiceUpdateUserUrl: "http://localhost:5001/api/auths/update-user",
    ProfilesServiceGetAllDoctorsUrl: "http://localhost:5003/api/doctors",
    OfficeServiceGetAllOffices: "http://localhost:5002/api/offices",
    ProfilesServicePatientsUrl: "http://localhost:5003/api/patients",
    AuthServiceRefreshToken: "http://localhost:5001/api/auths/refresh-token",
    AuthServiceLogout: "http://localhost:5001/api/auths/logout",
    ProfilesServiceCreateDoctorsProfileUrl: "http://localhost:5003/api/doctors",
    LoginPageUrl: "/",
    PatientPageUrl: "/patient-page",
    PatientPageProfileUrl: "/patient-page/profile",
    PatientPageMapUrl: "/patient-page/map",
    DoctorPageUrl: "/doctor-page",
    DoctorPageProfileUrl: "/doctor-page/profile",
    ReceptionistPageUrl: "/receptionist-page",
    ReceptionistPageProfileUrl: "/receptionist-page/profile",
    ReceptionistPageChangeDoctorUrl: "/receptionist-page/change-doctor",
}

export default config;