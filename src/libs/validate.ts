export class Validator {
    private ERROR_CLASS = 'error';
    private ERROR_ELEMENT_CLASS = 'error-messages';

    private _errors: Record<string, Record<string, string>> = {};
    private readonly _values: Record<string, (string | object)[]>;
    private _validateValue: any;
    private _inputName: string = '';

    constructor(values: Record<string, (string | object)[]>) {
        this._values = values;

        Object.keys(this._values).forEach(key => {
            this._errors[key] = {};
        });
    }

    clear(): void {
        Object.keys(this._values).forEach(key => {
            this._errors[key] = {};
            this.hideErrorMessage(key);
        });
    }

    getErrorString() {
        let str = '';

        for (const errorKey in this._errors[this._inputName]) {
            str += this._errors[this._inputName][errorKey] + '\n';
        }
        return str;
    }

    getErrorElement() {
        const element = document.createElement('div');
        element.classList.add(this.ERROR_ELEMENT_CLASS);
        element.innerHTML = this.getErrorString();
        return element;
    }

    hasError(inputName: string = '') {
        if (!inputName) {
            for (const inputName in this._errors) {
                for (const errors in this._errors[inputName]) {
                    if (Object.hasOwn(this._errors[inputName], errors)) {
                        return true;
                    }
                }
            }
            return false;
        }
        for (const prop in this._errors[inputName]) {
            if (Object.hasOwn(this._errors[inputName], prop)) {
                return true;
            }
        }
        return false;
    }

    validate(valueName: string, value?: string | number) {
        const currentObjectValidation = this._values[valueName];
        this._validateValue = value;
        this._inputName = valueName;

        currentObjectValidation?.forEach(item => {
            if (typeof item === 'string') {
                if (item in this) {
                    //@ts-ignore
                    this[item]();
                }
            } else {
                Object.entries(item).forEach(([key, value]) => {
                    if (key in this) {
                        //@ts-ignore
                        this[key](value);
                    }
                });
            }
        });
    }

    visibleErrorMessage(inputName: string, setErrorClassOnParent: boolean = false) {
        this.hideErrorMessage(inputName);
        this._inputName = inputName;
        if (this.hasError(inputName)) {
            const element = document.querySelector(`input[name="${inputName}"]`);
            if (setErrorClassOnParent) {
                element?.parentElement?.classList.add(this.ERROR_CLASS);
            } else {
                element?.classList.add(this.ERROR_CLASS);
            }
            element?.after(this.getErrorElement());
        }
    }

    hideErrorMessage(inputName: string) {
        const element = document.querySelector(`input[name="${inputName}"]`);

        element?.parentElement?.classList.remove(this.ERROR_CLASS);
        element?.classList.remove(this.ERROR_CLASS);

        element?.parentElement?.querySelector(`.${this.ERROR_ELEMENT_CLASS}`)?.remove();
    }

    hasForbiddenCharacters() {
        const htmlTagRegex = /<[^>]*>/g;
        if (htmlTagRegex.test(this._validateValue)) {
            this._errors[this._inputName]['hasForbiddenCharacters'] = 'Сообщение не может содержать HTML теги';
        } else {
            delete this._errors[this._inputName]['hasForbiddenCharacters'];
        }
    }

    notEmpty() {
        if (!this._validateValue) {
            this._errors[this._inputName]['notEmpty'] = 'Значение не может быть пустым';
        } else {
            delete this._errors[this._inputName]['notEmpty'];
        }
    }

    maxValue(max: number) {
        if (this._validateValue.length > max) {
            this._errors[this._inputName]['maxValue'] = 'Длина текста не может быть больше ' + max;
        } else {
            delete this._errors[this._inputName]['maxValue'];
        }
    }

    minValue(min: number) {
        if (this._validateValue.length < min) {
            this._errors[this._inputName]['minValue'] = 'Длина текста не может быть меньше ' + min;
        } else {
            delete this._errors[this._inputName]['minValue'];
        }
    }

    correctLogin() {
        const spaceRegex = /\s/;
        const currentStrRegex = this._validateValue.replace(/[a-zA-Z0-9-_]/g, '').length > 0;
        const onlyNumbers = this._validateValue.replace(/[0-9-_]/g, '').length === 0;

        if (onlyNumbers || spaceRegex.test(this._validateValue) || currentStrRegex) {
            this._errors[this._inputName]['correctLogin'] =
                'Логин может включать в себя дефис или нижнее подчеркивание';
        } else {
            delete this._errors[this._inputName]['correctLogin'];
        }
    }

    currentPassword() {
        const hasUpperCase = /[A-Z]/.test(this._validateValue);
        const hasDigit = /\d/.test(this._validateValue);
        if (!hasUpperCase || !hasDigit) {
            this._errors[this._inputName]['currentPassword'] =
                'Пароль должен включать в себя хотя бы одну цифру или заглавную букву';
        } else {
            delete this._errors[this._inputName]['currentPassword'];
        }
    }

    currentName() {
        const startsWithUpperCaseLatin = /^[A-Z]/.test(this._validateValue);
        const startsWithUpperCaseCyrillic = /^[А-Я]/.test(this._validateValue);
        const currentStr = this._validateValue.replace(/[а-яa-z-]/gi, '').length === 0;

        if ((!startsWithUpperCaseLatin && !startsWithUpperCaseCyrillic) || !currentStr) {
            this._errors[this._inputName]['currentName'] =
                'Строка должна быть с заглавной буквы, может включать в себя только дефис';
        } else {
            delete this._errors[this._inputName]['currentName'];
        }
    }

    currentPhone() {
        const isValidRegex = /^\+?\d{10,15}$/;
        if (!isValidRegex.test(this._validateValue)) {
            this._errors[this._inputName]['currentPhone'] = 'Не верный формат телефона';
        } else {
            delete this._errors[this._inputName]['currentPhone'];
        }
    }

    currentEmail() {
        const isValidRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!isValidRegex.test(this._validateValue)) {
            this._errors[this._inputName]['currentEmail'] = 'Не верный формат email';
        } else {
            delete this._errors[this._inputName]['currentEmail'];
        }
    }
}
