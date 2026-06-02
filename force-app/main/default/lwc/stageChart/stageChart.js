import { LightningElement, api } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import CHARTJS from '@salesforce/resourceUrl/ChartJS';

export default class StageChart extends LightningElement {

    @api stageCounts;

    chart;
    chartJsInitialized = false;

    renderedCallback() {

        if (this.chartJsInitialized) {
            return;
        }

        this.chartJsInitialized = true;

    loadScript(this, CHARTJS + '/chart.umd.js')
        .then(() => {

            console.log('ChartJS Loaded');
            console.log(window.Chart);

            this.initializeChart();

        })
        .catch(error => {
            console.error('ChartJS Load Error', error);
        });
        }

    initializeChart() {

        if (!this.stageCounts) {
            return;
        }
        console.log('stageCounts', JSON.stringify(this.stageCounts));
        console.log('Canvas Found', this.template.querySelector('canvas'));
        const ctx =
            this.template.querySelector('canvas').getContext('2d');

        this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(this.stageCounts),
                datasets: [{
                    label: 'Opportunities',
                    data: Object.values(this.stageCounts)
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,

                plugins: {
                    legend: {
                        position: 'top'
                    }
                },

                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            precision: 0
                        }
                    }
                }
            }
        });
    }
}