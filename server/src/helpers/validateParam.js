

const validateParam = (res, id) => {
    if (isNaN(id)) {
        return res.status(400).json({
            status: 400,
            error: 'Param must be an Integer',
        });
    }
};

export default validateParam;
