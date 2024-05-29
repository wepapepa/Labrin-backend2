export const productValidation = (req, res, next) => {
    !req.body.title || !req.body.description || !req.body.price || !req.body.id || !req.body.stock
    ? res.status(400).json({ error: "Todos los campos son obligatorios" })
    : next();
}