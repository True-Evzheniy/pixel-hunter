import AbstractView from "../abstract-view";

class ConfirmationView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
<section class="modal">
  <form class="modal__inner">
    <button class="modal__close" type="button">
      <span class="visually-hidden">Закрыть</span>
    </button>
    <h2 class="modal__title">Подтверждение</h2>
    <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
    <div class="modal__button-wrapper">
      <button class="modal__btn modal__btn--ok">Ок</button>
      <button class="modal__btn modal__btn--cancel">Отмена</button>
    </div>
  </form>
</section>
    `;
  }

  bind() {
    this.okButton = this._element.querySelector(`.modal__btn--ok`);
    this.cancelButton = this._element.querySelector(`.modal__btn--cancel`);
    this.closeButton = this._element.querySelector(`button.modal__close`);

    this.okButton.addEventListener(`click`, this.onOkBtnClick);
    this.cancelButton.addEventListener(`click`, this.onCancelBtnClick);
    this.closeButton.addEventListener(`click`, this.onCloseBtnClick);
  }

  unbind() {
    this.okButton.removeEventListener(`click`, this.onOkBtnClick);
    this.cancelButton.removeEventListener(`click`, this.onCancelBtnClick);
    this.closeButton.removeEventListener(`click`, this.onCloseBtnClick);
  }

  onOkBtnClick() {}

  onCancelBtnClick() {}

  onCloseBtnClick() {}
}

export default ConfirmationView;
