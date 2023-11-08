import './profile.scss';
//language=hbs
window['page'] = `
    {{#> mainLayout }}

        <div class="profile-settings">
            <div class="profile-settings__header">
                <div class="profile-settings__avatar-wrapper">
                    {{> images/avatarImage class="profile-settings__avatar" src="/assets/images/noimage.jpeg" alt="image" width="200" height="200"}}
                    <div class="profile-settings__avatar-hover">
                        Поменять аватар
                    </div>
                </div>
            </div>

            <div class="profile-settings__fields">
                <form id="profileSettingsForm" action="#">
                    {{> input/input disabled="true" class="profile-settings-field" name="email" label="Почта" placeholder="test@test.com" value="test@test.com" }}
                    {{> input/input disabled="true" class="profile-settings-field" name="login" label="Логин" placeholder="ivan" value="ivan" }}
                    {{> input/input disabled="true" class="profile-settings-field" name="first_name" label="Имя" placeholder="Иван" value="Иван" }}
                    {{> input/input disabled="true" class="profile-settings-field" name="second_name" label="Фамилия" placeholder="Иванов" value="Иванов" }}
                    {{> input/input disabled="true" class="profile-settings-field" name="display_name" label="Имя в чате" placeholder="Иван" value="Иван" }}
                    {{> input/input disabled="true" class="profile-settings-field" name="phone" label="Телефон" placeholder="+7 (900) 123 12 12" value="+7 (900) 123 12 12" }}
                </form>
            </div>

            <div class="profile-settings__footer">
                {{> link/link class="profile-settings__link" href="/" label="Изменить данные"}}
                {{> link/link class="profile-settings__link" href="/" label="Изменить пароль"}}
                {{> link/link class="profile-settings__link_alert" href="/" label="Выйти"}}
            </div>

        </div>

    {{/mainLayout}}

`
