const Transaction = require('../models/Transaction');

const getStatistics = async (req, res) => {
    const { month } = req.query;
    const start = new Date(`2022-${month}-01`);
    const end = new Date(`2022-${month}-31`);

    const totalSales = await Transaction.aggregate([
        { $match: { dateOfSale: { $gte: start, $lte: end } } },
        { $group: { _id: null, totalAmount: { $sum: '$price' }, totalItems: { $sum: 1 }, soldItems: { $sum: { $cond: ['$sold', 1, 0] } } } }
    ]);

    const totalNotSoldItems = totalSales[0].totalItems - totalSales[0].soldItems;

    res.status(200).json({
        totalAmount: totalSales[0].totalAmount,
        soldItems: totalSales[0].soldItems,
        notSoldItems: totalNotSoldItems
    });
};

module.exports = { getStatistics };
