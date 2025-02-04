export const getCoordinates = async (address: string): Promise<[number, number] | null> => {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
        );
        const data = await response.json();

        if (data.length > 0) {
            return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
        } else {
            console.error("Адрес не найден:", address);
            return null;
        }
    } catch (error) {
        console.error("Ошибка геокодинга:", error);
        return null;
    }
};