import {body} from "express-validator";

export const registerValidation = [
    body('email', 'Incorrect mail format').isEmail(),
    body('password', 'Password must be at least 5 characters long').isLength({min: 5}),
    body('fullName', 'Enter name, name must be at least 3 characters long').isLength({min: 3}),
    body('avatarUrl', 'Incorrect avatar link ').optional().isURL(),
];

export const loginValidation = [
    body('email', 'Incorrect mail format').isEmail(),
    body('password', 'Password must be at least 5 characters long').isLength({min: 5}),
];

export const postCreateValidation = [
    body('title', 'Enter article title').isLength({min: 3}).isString(),
    body('text', 'Enter the text of the article').isLength({min: 10}).isString(),
    body('tags', 'Incorrect tag format (specify array)').optional().isString(),
    body('imgUrl', 'Incorrect image  link ').optional().isString(),
];
