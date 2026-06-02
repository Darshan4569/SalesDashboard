import { LightningElement, api } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';

import CHARTJS from '@salesforce/resourceUrl/ChartJS';

export default class RevenueChart extends LightningElement {

    _revenueData;

    chart;

    chartLoaded = false;

    @api
    set revenueData(value) {

        this._revenueData = value;

        if (this.chartLoaded && this.chart) {
            this.updateChart();
        }
    }

    get revenueData() {
        return this._revenueData;
    }

    renderedCallback() {

        if (this.chartLoaded) {
            return;
        }

        this.chartLoaded = true;

        loadScript(this, CHARTJS + '/chart.umd.js')
            .then(() => {

                this.initializeChart();

            })
            .catch(error => {
                console.error(error);
            });
    }

    initializeChart() {

        const ctx =
            this.template
                .querySelector('canvas')
                .getContext('2d');

        this.chart = new Chart(ctx, {

            type: 'line',

            data: {

                labels: [],

                datasets: [{

                    label: 'Revenue',

                    data: [],

                    fill: false,

                    tension: 0.3
                }]
            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {
                        position: 'top'
                    }
                }
            }
        });

        this.updateChart();
    }

    updateChart() {

        if (!this.chart || !this._revenueData) {
            return;
        }

        const sortedKeys =
            Object.keys(this._revenueData).sort();

        this.chart.data.labels = sortedKeys;

        this.chart.data.datasets[0].data =
            sortedKeys.map(
                key => this._revenueData[key]
            );

        this.chart.update();
    }
}