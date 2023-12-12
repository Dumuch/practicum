function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export default (): string => {
    let uid = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charsLength = chars.length;

    for (let i = 0; i < 8; ++i) {
        uid += chars[getRandomInt(0, charsLength - 1)];
    }

    return uid;
};
