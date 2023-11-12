import { Block } from '../../../libs/block';
import { DefaultInput } from '../../inputs/defaultInput';
import './styles.scss';

//language=hbs
const template = `
        {{{inputFirstName}}}
        {{{inputSecondName}}}
        
        {{{inputLogin}}}
        {{{inputDisplayName}}}
    
        {{{inputEmail}}}
        {{{inputPhone}}}      
`;

export class ProfileForm extends Block {
  constructor() {
    super('form', {
      attr: {
        class: 'profile-settings-form',
      },
      inputFirstName: new DefaultInput({
        name: 'first_name',
        label: 'Имя',
        placeholder: 'Иван',
        disabled: 'true',
        value: 'Иван',
        attr: {
          class: 'profile-settings-field',
        },
      }),

      inputSecondName: new DefaultInput({
        name: 'second_name',
        label: 'Фамилия',
        placeholder: 'Иванов',
        disabled: 'true',
        value: 'Иванов',
        attr: {
          class: 'profile-settings-field',
        },
      }),

      inputDisplayName: new DefaultInput({
        name: 'display_name',
        label: 'Имя в чате',
        placeholder: 'Иван',
        disabled: 'true',
        value: 'Иван',
        attr: {
          class: 'profile-settings-field',
        },
      }),

      inputLogin: new DefaultInput({
        name: 'login',
        label: 'Логин',
        placeholder: 'ivan',
        disabled: 'true',
        value: 'ivan',
        attr: {
          class: 'profile-settings-field',
        },
      }),

      inputEmail: new DefaultInput({
        name: 'email',
        label: 'Email',
        placeholder: 'test@test.com',
        disabled: 'true',
        value: 'test@test.com',
        attr: {
          class: 'profile-settings-field',
        },
      }),

      inputPhone: new DefaultInput({
        name: 'phone',
        label: 'Телефон',
        placeholder: '+7 (900) 123 12 12',
        disabled: 'true',
        value: '+7 (900) 123 12 12',
        attr: {
          class: 'profile-settings-field',
        },
      }),
    });
  }

  render(): Node {
    return this.compile(template);
  }
}
