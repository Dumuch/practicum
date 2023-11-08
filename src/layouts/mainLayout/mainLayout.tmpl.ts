import './mainLayout.scss';

//language=hbs
export default `
    <header>
        <nav class="site-nav">
            <ul class="site-nav-list">
                <li>{{> link/link href="/pages/index/index.html" label="Главная страница"}}</li>
                <li>{{> link/link href="/pages/chat/chat.html" label="Страница чата"}}</li>
                <li>{{> link/link href="/pages/signIn/signIn.html" label="Страница авторизации"}}</li>
                <li>{{> link/link href="/pages/signUp/signUp.html" label="Страница регистрации"}}</li>
                <li>{{> link/link href="/pages/profile/profile.html" label="Страница профиля"}}</li>
                <li>{{> link/link href="/pages/404/404.html" label="Страница 404"}}</li>
                <li>{{> link/link href="/pages/500/500.html" label="Страница 5**"}}</li>
            </ul>
        </nav>
    </header>

    <main>
        <div class="container">
            {{> @partial-block }}
        </div>
    </main>
`
