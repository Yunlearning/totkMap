export function transformMarkerType(type) {
    try {
        let markType = Number(type);
        switch (markType) {
            case 1:
                return '塔';
            case 2:
                return '神廟';
            case 3:
                return '光之根';
            case 4:
                return '龍之淚';
            case 5:
                return '馬廄/驛站';
            case 6:
                return '井';
            case 7:
                return '洞穴';
            default:
                return '塔';
        }
    } catch (error) {
        throw Error('Unknow Marker Type');
    }
}
