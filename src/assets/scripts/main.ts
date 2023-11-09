import Handlebars from 'handlebars';
// import button from '../../components/button/button.tmpl'
// import link from '../../components/link/link.tmpl'
import defaultModal from '../../components/modals/defaultModal.tmpl';
import avatarImage from '../../components/images/avatarImage.tmpl';
import input from '../../components/input/input.tmpl';
import mainLayout from '../../layouts/mainLayout/mainLayout.tmpl';

// Handlebars.registerPartial('button/button', button)
// Handlebars.registerPartial('link/link', link)
Handlebars.registerPartial('modals/defaultModal', defaultModal)
Handlebars.registerPartial('images/avatarImage', avatarImage)
Handlebars.registerPartial('input/input', input)

Handlebars.registerPartial('mainLayout', mainLayout)

// document.addEventListener('DOMContentLoaded', () => {
//     const root = document.querySelector("#app")
//     const templateFunction = Handlebars.compile(window['page']);
//     root.innerHTML = templateFunction({})
// })
