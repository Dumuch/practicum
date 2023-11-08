import './defaultModal.scss';

//language=hbs
export default `
    <div class="modal {{class}}">
        <span class="modal__title">{{title}}</span>
        <div class="modal__body">
            {{> body}}
        </div>
    </div>`
