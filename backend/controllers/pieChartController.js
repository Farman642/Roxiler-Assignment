// controllers/pieChartController.js
const Transaction = require('../models/Transaction');

const getPieChart = async (req, res) => {
    const { month } = req.query;
    const start = new Date(`2022-${month}-01`);
    const end = new Date(`2022-${month}-31`);

    const categories = await Transaction.aggregate([
        { $match: { dateOfSale: { $gte: start, $lte: end } } },
        { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    res.status(200).json(categories);
};

module.exports = { getPieChart };
