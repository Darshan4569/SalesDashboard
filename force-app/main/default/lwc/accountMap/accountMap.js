import { LightningElement, api } from 'lwc';

export default class AccountMap extends LightningElement {

    @api accounts;

    get mapMarkers() {

        if (!this.accounts) {
            return [];
        }

        return this.accounts.map(account => {

            return {

                location: {

                    Street: account.BillingStreet,

                    City: account.BillingCity,

                    Country: account.BillingCountry
                },

                title: account.Name,

                description:
                    account.BillingCity +
                    ', ' +
                    account.BillingCountry
            };
        });
    }
}