import { LightningElement, api } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import CHARTJS from '@salesforce/resourceUrl/ChartJS';

export default class StageChart extends LightningElement {

    _stageCounts;
    chart;
    chartJsInitialized = false;

    @api
    set stageCounts(value) {

        this._stageCounts = value;

        if (this.chartJsInitialized && this.chart) {
            this.updateChart();
        }
    }

    get stageCounts() {
        return this._stageCounts;
    }

    renderedCallback() {

        if (this.chartJsInitialized) {
            return;
        }

        this.chartJsInitialized = true;

        loadScript(this, CHARTJS + '/chart.umd.js')
            .then(() => {
                this.initializeChart();
            })
            .catch(error => {
                console.error('ChartJS Load Error', error);
            });
    }

    initializeChart() {

        const canvas = this.template.querySelector('canvas');

        if (!canvas) {
            return;
        }

        const ctx = canvas.getContext('2d');

        this.chart = new Chart(ctx, {

            type: 'bar',

            data: {

                labels: [],

                datasets: [{
                    label: 'Opportunities',
                    data: [],
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,

                    barPercentage: 0.6,
                    categoryPercentage: 0.7,
                    maxBarThickness: 60
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
                            stepSize: 1,
                            precision: 0
                        }
                    }
                }
            }
        });

        this.updateChart();
    }

    updateChart() {

        if (!this.chart || !this._stageCounts) {
            return;
        }

        this.chart.data.labels =
            Object.keys(this._stageCounts);

        this.chart.data.datasets[0].data =
            Object.values(this._stageCounts);

        this.chart.update();
    }
}