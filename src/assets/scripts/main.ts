import { SignInPage } from '../../pages/signIn';
import { SignUpPage } from '../../pages/signUp';
import { Router } from '../../libs/router';
import { appRoutes } from '../../constants/routes';
import { Error500Page } from '../../pages/500';
import { Error404Page } from '../../pages/404';
import { ChatsPage } from '../../pages/chat';
import { ProfilePage } from '../../pages/profile';
import store from '../../libs/store';

const router = new Router("#app");

router
    .use(appRoutes.index, SignInPage)
    .use(appRoutes.signIn, SignInPage)
    .use(appRoutes.signUp, SignUpPage)
    .use(appRoutes.error404, Error404Page)
    .use(appRoutes.error500, Error500Page)
    .use(appRoutes.chats, ChatsPage)
    .use(appRoutes.profile, ProfilePage)
    .error(Error404Page)
    .start();

store.set('router', router)
