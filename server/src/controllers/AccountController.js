import AccountModel from '../models/accounts';

class AccountController {
    static async createAccount(req, res) {
        try {
            const response = await AccountModel.create(req.body, req);
            return res.status(201).json({
                status: res.statusCode,
                message: 'Account created successfully',
                data: response.rows[0],
            });
        } catch (error) {
            return res.status(500).json({
                status: res.statusCode,
                error,
            });
        }
    }

    static async update(req, res) {
        try {
            const { rows } = await AccountModel.findByNumber(req.params.id);
            if (!rows[0]) {
                return res.status(404).json({
                    status: res.statusCode,
                    error: 'Account Not Found',
                });
            }
            const response = await AccountModel.update(req.params.id, req.body);
            return res.status(200).json({
                status: 200,
                message: 'Account details updated successfully',
                data: response.rows[0],
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                error,
            });
        }
    }

    static async delete(req, res) {
        try {
            const { rows } = await AccountModel.findByNumber(req.params.id);
            if (!rows[0]) {
                return res.status(404).json({
                    status: res.statusCode,
                    error: 'Account Not Found',
                });
            }
            await AccountModel.delete(req.params.id);
            return res.status(200).json({
                status: 200,
                message: 'Account successfully deleted',
            });
        } catch (error) {
            return res.status(500).json({
                status: res.statusCode,
                error,
            });
        }
    }
}

export default AccountController;
