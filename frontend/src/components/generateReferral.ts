export function generateRandomReferralCode() {
    const digits = '0123456789';
    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    const referralCode = `${randomCharacters(digits, 2)}${randomCharacters(lowercaseLetters, 2)}${randomCharacters(uppercaseLetters, 2)}${randomCharacters(digits, 2)}`

    return referralCode;
}

function randomCharacters(chars: string, length: number) {
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        result += chars.charAt(randomIndex);
    }
    return result;
}
