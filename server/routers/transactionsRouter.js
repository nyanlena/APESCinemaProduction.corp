// const express = require('express');
// const { Op } = require('sequelize');
// const { Transaction } = require('../db/models');

// const transactionRouter = express.Router();

// transactionRouter
//   .route('/')
//   .post(async (req, res) => {
//     const { receiverId, message, value } = req.body;
//     const newTransaction = await Transaction.create({
//       senderId: req.session.user.id,
//       receiverId,
//       message,
//       value,
//     });
//     const newTransactionWithUsers = await Transaction.findOne({
//       where: { id: newTransaction.id },
//       include: ['Sender', 'Receiver'],
//     });
//     res.json(newTransactionWithUsers);
//   })
//   .get(async (req, res) => {
//     const allTransactions = await Transaction.findAll({
//       include: ['Sender', 'Receiver'],
//     });
//     res.json(allTransactions);
//   });

// transactionRouter.route('/:id').delete(async (req, res) => {
//   await Transaction.destroy({ where: { id: req.params.id } });
//   res.sendStatus(200);
// });

// postRouter.get('/search/:str', async (req, res) => {
//   const words = await Post.findAll({
//     where: { body: { [Op.like]: `%${req.params.str}%` } },
//   });
//   res.json(words);
// });

// module.exports = transactionRouter;
