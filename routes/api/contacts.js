const express = require('express');

const router = express.Router();

const ctrl = require("../../controlles/contacts");

const { validationBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contactsModel");


router.get('/', ctrl.getAll);

router.get('/:id', isValidId, ctrl.getById);

router.post('/', validationBody(schemas.joiContactSchema), ctrl.add);

router.delete('/:id', isValidId, ctrl.removeById);

router.put('/:id', isValidId, validationBody(schemas.joiContactSchema), ctrl.updateById);

router.patch('/:id/favorite', isValidId, validationBody(schemas.updateFavoriteSchema), ctrl.updateFavorite);

module.exports = router
