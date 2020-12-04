export default class Form {
  constructor(form, errorMessages, api) {
    this._form = form;
    this._submitButton = form.querySelector('[type="submit"]');
    this._errorMessages = errorMessages;
    this._api = api;
    this._addEventListeners();
    this._checkValidity();
    this._setSubmitState();
  }

  _addEventListeners() {
    Array.from(this._form.elements).forEach(input => {
      input.addEventListener('input', () => {
        Array.from(document.querySelectorAll('[data-error]')).forEach(elem => {
          elem.classList.remove('popup__error_is-visible');
        })

        this._setSubmitState();
        this._checkInputValidity(input);
      });
    })
    this._form.querySelector('[type="submit"]').addEventListener('click', this._submit.bind(this));
  }

  _checkValidity() {
    let isValid = true;
    Array.from(this._form.elements).forEach(function(input){
      if(input.type !== 'submit') {
        if (!input.validity.valid) {
          isValid = false;
        }
      }
    });
    return isValid;
  }

  _setSubmitState() {
    if(this._checkValidity()) {
      this._submitButton.disabled = false;
      this._submitButton.classList.add('button_brand');
    }
    else {
      this._submitButton.disabled = true;
      this._submitButton.classList.remove('button_brand');
    }
  }

  _checkInputsValidity() {
    Array.from(this._form.elements).forEach(input => {
      if (input.type !== 'submit') {
        this._checkInputValidity(input);
      }
    });
  }

  _checkInputValidity(input) {
    const errorMessage = input.nextElementSibling;
    if(input.validity.valueMissing) {
      errorMessage.textContent = this._errorMessages.empty();
    }
    else if(input.validity.tooShort || input.validity.tooLong) {
      errorMessage.textContent = this._errorMessages.wrongLength(input.getAttribute('minlength'), input.getAttribute('maxlength'));
    }
    else if(input.validity.typeMismatch && input.type === 'url') {
      errorMessage.textContent =  this._errorMessages.wrongUrl();
    }
    else if(input.validity.typeMismatch && input.type === 'email') {
      errorMessage.textContent =  this._errorMessages.wrongEmail();
    }
    else {
      errorMessage.textContent = '';
    }
  }

  _submit() {
    const path = this._form.getAttribute('action');
    let body = {};

    Array.from(this._form.elements).forEach(input => {
      if(input.type !== 'submit') {
        body[input.name] = input.value;
      }
    })

    this._api.post(path, body)
      .then((res) => {
        if(this.onSubmit) {
          this.onSubmit(res);
        }
      })
      .catch(err => {
        console.log(err);
        document.querySelector(`[data-error="${err}"]`).classList.add('popup__error_is-visible');
      })

  }
}