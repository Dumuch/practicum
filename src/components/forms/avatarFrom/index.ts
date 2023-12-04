import { Block } from '../../../libs/block';
import { DefaultInput } from '../../inputs/defaultInput';
import './styles.scss';
import serializeFormData from '../../../helpers/serializeFormData';
import connectStoreHOC from '../../../helpers/connectStoreHOC';
import { IStore } from '../../../libs/store';
import { UserController } from '../../../controllers/userContoller';
import { IUpdateUserAvatar } from '../../../types/user';
import { Button } from '../../buttons/defaultButton';

//language=hbs
const template = `
    {{{inputAvatar}}}
    
    <div class='password-settings-form__actions'>
        {{{buttonSubmit}}}
        {{{buttonClose}}}
    </div>
`;

class AvatarForm extends Block {
    constructor() {
        super('form', {
            attr: {
                id: 'avatar-form',
                class: 'avatar-settings-form',
            },
            inputAvatar: new DefaultInput({
                name: 'avatar',
                label: 'Аватарка',
                type: 'file',
            }),

            buttonSubmit: new Button({
                text: 'Сменить аватарку',
                attr: {
                    type: 'submit',
                },
            }),

            buttonClose: new Button({
                text: 'Закрыть',
                attr: {
                    type: 'button',
                },
                events: {
                    click: async e => {
                        e.preventDefault();

                        const event = new Event('closemodal', { bubbles: true });
                        document.dispatchEvent(event);
                    },
                },
            }),

            events: {
                submit: async (event: SubmitEvent) => {
                    event.preventDefault();
                    const data = serializeFormData<IUpdateUserAvatar>(event);
                    if (!this.props.isLoading) {
                        await UserController.updateUserAvatar(data);
                        const event = new Event('closemodal', { bubbles: true });
                        document.dispatchEvent(event);
                    }
                },
            },
        });
    }

    render(): Node {
        return this.compile(template);
    }
}

function mapUserToProps(state: IStore) {
    return {
        isLoading: state.isLoading,
        user: state?.user,
    };
}

export default connectStoreHOC(mapUserToProps)(AvatarForm);
