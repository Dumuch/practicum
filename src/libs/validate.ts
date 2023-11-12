export const isEmpty = (value: string) => {
    return !value;
};

export const hasForbiddenCharacters = (value: string) => {
    const htmlTagRegex = /<[^>]*>/g;
    return htmlTagRegex.test(value);
};

export const isMinValue = (value: string, min: number) => {
    return value.length < min;
};

export const isMaxValue = (value: string, max: number) => {
    return value.length > max;
};

export const isCurrentLogin = (value: string) => {
    const spaceRegex = /\s/;
    const currentStrRegex = value.replace(/[a-zA-Z0-9-_]/g, '').length > 0;
    const onlyNumbers = value.replace(/[0-9-_]/g, '').length === 0;
    return spaceRegex.test(value) || currentStrRegex || onlyNumbers;
};

export const isCurrentPassword = (value: string): boolean => {
    const hasUpperCase = /[A-Z]/.test(value);
    const hasDigit = /\d/.test(value);
    return !hasUpperCase || !hasDigit;
};

export const isCurrentName = (value: string): boolean => {
    const startsWithUpperCaseLatin = /^[A-Z]/.test(value);
    const startsWithUpperCaseCyrillic = /^[А-Я]/.test(value);
    const currentStr = value.replace(/[а-яa-z-]/gi, '').length === 0;

    return startsWithUpperCaseLatin || startsWithUpperCaseCyrillic || !currentStr;
};

export const isCurrentPhone = (value: string): boolean => {
    const isValidRegex = /^\+?\d{10,15}$/;
    return !isValidRegex.test(value);
};

export const isCurrentEmail = (value: string): boolean => {
    const isValidRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return !isValidRegex.test(value);
};

export class Validate {
    protected _value: string;

    constructor(value: string) {
        this._value = value;
    }

    minValue = (min: number) => {
        return this._value.length < min;
    };

    maxValue = (max: number) => {
        return this._value.length > max;
    };

    correctLogin = () => {
        const spaceRegex = /\s/;
        const currentStrRegex = this._value.replace(/[a-zA-Z0-9-_]/g, '').length > 0;
        const onlyNumbers = this._value.replace(/[0-9-_]/g, '').length === 0;
        return spaceRegex.test(this._value) || currentStrRegex || onlyNumbers;
    };
}
