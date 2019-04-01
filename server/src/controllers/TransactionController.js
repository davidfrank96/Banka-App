/* eslint-disable radix */
import randomString from 'random-string';
import AccountModel from '../models/accounts';
import TransactionModel from '../models/transactions';

class TransactionController {
    static async credit(req, res) {
        const { amount } = req.body;
        const accountDetail = AccountModel.findByNumber(req.params.id);
        if (!accountDetail) {
            return res.status(404).json({
                status: 404,
                message: 'Account not found',
            });
        }

        const updatedDetail = await TransactionModel.credit(req.params.id, req.body)

        return res.status(201).json({
            status: 201,
            data: {
                transactionId: parseInt(randomString(
                    {
                        length: 6, numeric: true, letters: false, special: false,
                    },
                )),
                accountNumber: req.params.id,
                amount,
                cashier: req.user.id,
                transactionType: 'credit',
                accountBalance: updatedDetail.balance,
            },
        });
    }
}

export default TransactionController;