import { LightningElement, wire } from 'lwc';
import getDashboardData from '@salesforce/apex/SalesDashboardController.getDashboardData';

export default class SalesDashboard extends LightningElement {

    openOpps = 0;
    wonDeals = 0;
    pipelineAmount = 0;
    stageCounts = {};

    @wire(getDashboardData)
    wiredDashboard({ error, data }) {

        if(data){

            this.openOpps = data.openOpportunities;
            this.wonDeals = data.wonDeals;
            this.pipelineAmount = data.pipelineAmount;
            this.stageCounts = data.stageCounts;

            console.log(data);
        }
        else if(error){
            console.error(error);
        }
    }
}