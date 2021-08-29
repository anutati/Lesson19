import { Settings } from '../core/constants/settings';

export class DonateForm {
    #donateForm
    #createDonate
    #totalAmount
    #totalAmountHTML
    #maxDonate
    #minDonate

    static TextObject = {
        DonateButtonText: 'Задонатить',
        InputLabel: `Введите сумму в ${Settings.currency}`,
    }

    static DefaultDonateValues = {
        min: 0,
        max: 100,
    }

    constructor(createDonate, totalAmount = 0, minDonate, maxDonate) {
        this.#createDonate = createDonate;
        this.#totalAmount = totalAmount;
        this.#maxDonate = maxDonate || DonateForm.DefaultDonateValues.max;
        this.#minDonate = minDonate || DonateForm.DefaultDonateValues.min;
    }

    #renderDonateButton() {
        const donateButton = document.createElement('button');
        donateButton.classList = 'donate-form__submit-button';
        donateButton.type = 'submit';
        donateButton.innerText = DonateForm.TextObject.DonateButtonText;

        return donateButton;
    }

    #renderAmountInput() {
        const amountInput = document.createElement('input');
        const amountInputLabel = document.createElement('label');
        amountInputLabel.textContent = DonateForm.TextObject.InputLabel;
        amountInputLabel.className = 'donate-form__input-label';

        amountInput.classList = 'donate-form__number-input';
        amountInput.name = 'amount';
        amountInput.type = 'number';
        amountInput.className = 'donate-form__donate-input';
        amountInput.max = this.#maxDonate;
        amountInput.min = this.#minDonate;
        amountInput.required = 'required';

        amountInputLabel.append(amountInput);

        return amountInputLabel;
    }

    #onCreateNewDonateSubmit(event) {
        event.preventDefault();
        const newDonateValue = Number(event.target.amount.value);
        if (newDonateValue && this.#createDonate) {
            const newDonate = {
                id: Date.now(),
                date: new Date(),
                amount: newDonateValue,
            };
            this.#createDonate(newDonate);
            event.target.amount.value = '';
        }
    }

    updateTotalAmount(newAmount) {
        this.#totalAmountHTML.textContent = `${newAmount}${Settings.currency}`;
    }

    render() {
        this.#donateForm = document.createElement('form');
        this.#donateForm.className = 'donate-form';
        this.#donateForm.addEventListener('submit', this.#onCreateNewDonateSubmit.bind(this));

        this.#totalAmountHTML = document.createElement('h1');
        this.#totalAmountHTML.id = 'total-amount';
        this.updateTotalAmount(this.#totalAmount);

        const donateButton = this.#renderDonateButton();
        const amountInput = this.#renderAmountInput();
        this.#donateForm.append(this.#totalAmountHTML, amountInput, donateButton);

        return this.#donateForm;
    }
}