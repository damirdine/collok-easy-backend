import { check, validationResult }  from 'express-validator';

const colocationValidation = {

    validateGetColocationById: [
        check('colocationID').isInt().withMessage('ID de la colocation non valide. Il devrait être un entier positif.'),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        }
    ],

    validateCreateColocation: [
        check('name').isString().isLength({ min: 3, max: 50 }).withMessage('Le nom est requis et doit être une chaîne de caractères d\'une longueur entre 3 et 50 caractères.'),
        check('admin_user_id').isInt().withMessage('ID de l\'admin devrait être un entier positif.'),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        }
    ],

    validateUpdateColocationName: [
        check('colocationID').isInt().withMessage('ID de la colocation non valide. Il devrait être un entier positif.'),
        check('name').isString().isLength({ min: 3, max: 50 }).withMessage('Le nom est requis et doit être une chaîne de caractères d\'une longueur entre 3 et 50 caractères.'),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        }
    ],

    validateGetColocationAdmin: [
        check('colocationID').isInt().withMessage('ID de la colocation non valide. Il devrait être un entier positif.'),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        }
    ],

    validateUpdateColocationAdmin: [
        check('colocationID').isInt().withMessage('ID de la colocation non valide. Il devrait être un entier positif.'),
        check('user_id').isInt().withMessage('ID de l\'admin devrait être un entier positif.'),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        }
    ],

    validateAddColocationMember: [
        check('colocationID').isInt().withMessage('ID de la colocation non valide. Il devrait être un entier positif.'),
        check('user_id').isInt().withMessage('ID de l\'utilisateur devrait être un entier positif.'),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        }
    ],

    validateDeleteColocationMember: [
        check('colocationID').isInt().withMessage('ID de la colocation non valide. Il devrait être un entier positif.'),
        check('user_id').isInt().withMessage('ID de l\'utilisateur devrait être un entier positif.'),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        }
    ],

    validateGetColocationMembers: [
        check('colocationID').isInt().withMessage('ID de la colocation non valide. Il devrait être un entier positif.'),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        }
    ],
};

export default colocationValidation;
