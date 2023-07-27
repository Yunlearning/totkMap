import { redirect } from 'react-router-dom';

export const getTokenDuration = () => {
    const storeExpirationDate = localStorage.getItem('expiration');
    const expirationData = new Date(storeExpirationDate);
    const now = new Date();
    const duration = expirationData.getTime() - now.getTime();
    return duration;
};
export const getAuthToken = () => {
    const token = localStorage.getItem('token');
    // 檢查token是否還存在
    if (!token) {
        return null;
    }
    // 檢查token是否到期
    const tokenDuration = getTokenDuration();
    if (tokenDuration < 0) {
        return 'EXPIRED';
    }
    return token;
};
export const tokenLoader = () => {
    return getAuthToken();
};
export const checkAuthLoader = () => {
    // return getAuthToken();
    // this function will be added in the next lecture
    // make sure it looks like this in the end
    const token = getAuthToken();

    if (!token) {
        return redirect('/auth');
    }

    return null; // this is missing in the next lecture video and should be added by you
};
