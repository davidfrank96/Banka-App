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
}    

export default AccountController;