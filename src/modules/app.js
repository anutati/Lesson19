import { DonateForm } from './donate-form';
import { DonateList } from './donate-list';
import * as Utils from '../core/utils';

const mockDonates = [
    { amount: 4, date: new Date() },
    { amount: 20, date: new Date() },
    { amount: 3, date: new Date() },
    { amount: 1, date: new Date() },
];

export default class App {
    #state
    #donateForm
    #donateList

    constructor() {
        this.#state = {
            donates: mockDonates,
            totalAmount: 0,
        };
        this.#state.totalAmount = Utils.calculateSumOfNumbers(this.#state.donates.map((donate) => donate.amount));

        this.#donateForm = new DonateForm(this.#createNewDonate.bind(this), this.#state.totalAmount);
        this.#donateList = new DonateList(this.#state.donates);
    }

    #createNewDonate(donate) {
        this.#state.donates.push(donate);
        this.#state.totalAmount += donate.amount;
        this.#donateList.updateDonates(this.#state.donates);
        this.#donateForm.updateTotalAmount(this.#state.totalAmount);
    }

    run() {
        const donateFormHTML = this.#donateForm.render();
        const donateListHTML = this.#donateList.render();
        document.body.append(donateFormHTML, donateListHTML);
    }
}
