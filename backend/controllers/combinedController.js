const { listTransactions } = require('./transactionController');
const { getStatistics } = require('./statisticsController');
const { getBarChart } = require('./barChartController');
const { getPieChart } = require('./pieChartController');

const getCombinedData = async (req, res) => {
    try {
        const transactions = await listTransactions(req, res);
        const statistics = await getStatistics(req, res);
        const barChart = await getBarChart(req, res);
        const pieChart = await getPieChart(req, res);

        res.status(200).json({
            transactions,
            statistics,
            barChart,
            pieChart
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getCombinedData };
