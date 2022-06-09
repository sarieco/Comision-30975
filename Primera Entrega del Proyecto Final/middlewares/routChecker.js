const routChecker = (req, res, next) => {
    const method = req.method;
    const url = req.originalUrl;
    if (url) return res.status(401).json({ success: false, error: `The route ${url} with method ${method} was not implemented` });
    else next();
};

module.exports = routChecker;