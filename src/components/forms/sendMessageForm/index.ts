import { Block } from '../../../libs/block';
import { Button } from '../../button/button';
import { ChatInput } from '../../inputs/chatInput';
import './styles.scss';
import serializeFormData from '../../../helpers/serializeFormData';
import { hasForbiddenCharacters } from '../../../libs/validate';

//language=hbs
const template = `
    {{{addSourceButton}}}
    {{{inputMessage}}}
    {{{submitButton}}}
`;

const validation: Record<string, (value: any) => boolean> = {
  message: (value: string) => hasForbiddenCharacters(value),
};


export class SendMessageForm extends Block {
  constructor() {
    super('form', {
      attr: {
        class: `send-message-form`,
      },
      error: false,
      addSourceButton: new Button({
        text: 'Прикрепить файл',
      }),
      inputMessage: new ChatInput({
        attr: {
          class: 'send-message-form__input-message',
        },
        placeholder: 'Сообщение (Запрещен ввод HTML тегов)',
        name: 'message',
        events: {
          blur: (event: FocusEvent) => {
            const element = <HTMLInputElement> event.currentTarget;

            if (validation.message(element.value)) {
              element?.parentElement?.classList.add('error');
            }
          },
          focus: (event: FocusEvent) => {
            const element = <HTMLInputElement> event.currentTarget;
            element?.parentElement?.classList.remove('error');
          },
        },
      }),
      submitButton: new Button({
        text: 'Отправить',
        attr: {
          type: 'submit',
        },
      }),
      events: {
        submit: (event: SubmitEvent) => {
          event.preventDefault();

          const data = serializeFormData(event);
          let hasError = false;
          Object.keys(data).forEach(key => {
            if (validation[key](data[key])) {
              hasError = true;
            }
          });

          if (hasError) {
            console.error('В валидации есть ошибки');
          } else {
            console.log(data);
          }

        },
      },
    });
  }

  render(): Node {
    return this.compile(template);
  }
}
