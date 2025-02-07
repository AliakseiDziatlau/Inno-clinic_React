export interface OfficeModalWindowProps {
    handleCloseModalWindow: () => void;
    officeAddress: string;
    handleSelectOffice: (officeAddress: string) => void;
}