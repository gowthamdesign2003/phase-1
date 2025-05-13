const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// Add a new transaction
router.post('/add', async (req, res) => {
    try {
        const { type, amount, category, date } = req.body;
        const transaction = new Transaction({ type, amount, category, date });
        await transaction.save();
        res.status(201).json({ message: "Transaction added successfully!" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all transactions
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Filter transactions by date range
router.get('/filter', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const transactions = await Transaction.find({
            date: { $gte: new Date(startDate), $lte: new Date(endDate) }
        });
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get summary report
router.get('/summary', async (req, res) => {
    try {
        const income = await Transaction.aggregate([
            { $match: { type: "income" } },
            { $group: { _id: null, totalIncome: { $sum: "$amount" } } }
        ]);

        const expenses = await Transaction.aggregate([
            { $match: { type: "expense" } },
            { $group: { _id: null, totalExpense: { $sum: "$amount" } } }
        ]);

        const totalIncome = income[0]?.totalIncome || 0;
        const totalExpense = expenses[0]?.totalExpense || 0;
        const balance = totalIncome - totalExpense;

        res.json({ totalIncome, totalExpense, balance });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
