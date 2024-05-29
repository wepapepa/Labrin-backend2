export const idValidation = (req, res, next) => {
    if (req.body.id && req.body.id !== req.params.productId) {
        res.status(404).json({ msg: ' producto no puede cambiar su ID '});
    } else {
        next();
    }
}