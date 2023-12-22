const colocationValidation = {
    
    async validateGetColocationById(req, res, next) {
    const { colocationID } = req.params;

    if (!/^\d+$/.test(colocationID)) {
        return res.status(400).json({ error: "Invalid colocationID format. It should be a positive integer." });
    }
    next();
    },

    async validateCreateColocation(req, res, next) {
    const { name } = req.body;
    const admin_user_id = req.user.id;
    if (!name || typeof name !== 'string' || name.length < 3 || name.length > 50) {
        // A voir pour le nombre de caractère
        return res.status(400).json({ error: "Bad Request - Name is required and should be a string with length between 3 and 50 characters." });
    }

    if (!/^\d+$/.test(admin_user_id)) {
        return res.status(400).json({ error: "Bad Request - admin_user_id should be a positive integer." });
    }
    next();
    },

    async validateUpdateColocationName(req, res, next) {
    const { colocationID } = req.params;
    const { name } = req.body;

    if (!/^\d+$/.test(colocationID)) {
        return res.status(400).json({ error: "Invalid colocationID format. It should be a positive integer." });
    }
        // A voir pour le nombre de caractère
    if (!name || typeof name !== 'string' || name.length < 3 || name.length > 50) {
        return res.status(400).json({ error: "Bad Request - Name is required and should be a string with length between 3 and 50 characters." });
    }
    next();
    },

    async validateGetColocationAdmin(req, res, next) {
    const { colocationID } = req.params;

    if (!/^\d+$/.test(colocationID)) {
        return res.status(400).json({ error: "Invalid colocationID format. It should be a positive integer." });
    }
    next();
    },

    async validateUpdateColocationAdmin(req, res, next) {
    const { colocationID } = req.params;
    const { user_id } = req.body;

    if (!/^\d+$/.test(colocationID)) {
        return res.status(400).json({ error: "Invalid colocationID format. It should be a positive integer." });
    }

    if (!/^\d+$/.test(user_id)) {
        return res.status(400).json({ error: "Bad Request - newAdminID should be a positive integer." });
    }
    next();
    },

    async validateAddColocationMember(req, res, next) {
    const { colocationID } = req.params;
    const { user_id } = req.body;

    if (!/^\d+$/.test(colocationID)) {
        return res.status(400).json({ error: "Invalid colocationID format. It should be a positive integer." });
    }

    if (!/^\d+$/.test(user_id)) {
        return res.status(400).json({ error: "Bad Request - user_id should be a positive integer." });
    }
    next();
    },

    async validateDeleteColocationMember(req, res, next) {
    const { colocationID } = req.params;
    const { user_id } = req.body;

    if (!/^\d+$/.test(colocationID)) {
        return res.status(400).json({ error: "Invalid colocationID format. It should be a positive integer." });
    }

    if (!/^\d+$/.test(user_id)) {
        return res.status(400).json({ error: "Bad Request - user_id should be a positive integer." });
    }

    next();
    },
};

export default colocationValidation;
