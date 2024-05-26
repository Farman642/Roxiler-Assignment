// controllers/transactionController.js
const Transaction = require('../models/Transaction');

const listTransactions = async (req, res) => {
    const { month, search, page = 1, perPage = 10 } = req.query;
    const regex = new RegExp(search, 'i');
    const start = new Date(`2022-${month}-01`);
    const end = new Date(`2022-${month}-31`);

    const query = {
        dateOfSale: { $gte: start, $lte: end },
        $or: [
            { title: regex },
            { description: regex },
            { price: regex }
        ]
    };

    const transactions = await Transaction.find(query)
        .skip((page - 1) * perPage)
        .limit(perPage);

    res.status(200).json(transactions);
};

module.exports = { listTransactions };
