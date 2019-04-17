import AccountModel from '../models/accounts';

class AccountController {
    static async createAccount(req, res) {
        const accountData = await AccountModel.create(req.body, req);
        return res.status(201).json({
            status: 201,
            data: {
                accountNumber: accountData.accountNumber,
                firstname: req.user.firstname,
                lastname: req.user.lastname,
                email: req.user.email,
                type: accountData.type,
                openingBalance: accountData.balance
            },
        });
    }

    static async update(req, res) {
        const account = AccountModel.findByNumber(req.params.id);
        if (!account) {
            return res.status(404).json({
                status: 404,
                message: 'Account not found',
            });
        }

        const updatedAccount = AccountModel.update(req.params.id, req.body);
        return res.status(200).json({
            status: 200,
            data: {
                accountNumber: req.params.id,
                status: updatedAccount.status,
            },
        });
    }

    static async delete(req, res) {
        const account = AccountModel.findByNumber(req.params.id);
        if (!account) {
            return res.status(404).json({
                status: 404,
                message: 'Account not found',
            });
        }

        await AccountModel.delete(req.params.id);
        return res.status(200).json({
            status: 200,
            message: 'Account successfully deleted',
        });
    }
}    

export default AccountController;
