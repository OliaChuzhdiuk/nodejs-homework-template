const express = require("express");

const router = express.Router();

const ctrl = require("../../controlles/contacts");

const { ctrlWrapper } = require("../../helpers");

const { validationBody, isValidId, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/contactsModel");


router.get('/', authenticate, ctrlWrapper(ctrl.getAll));

router.get('/:id',  authenticate, isValidId, ctrlWrapper(ctrl.getById));

router.post('/', authenticate, validationBody(schemas.joiContactSchema), ctrlWrapper(ctrl.add));

router.delete('/:id',  authenticate, isValidId, ctrlWrapper(ctrl.removeById));

router.put('/:id',  authenticate, isValidId, validationBody(schemas.joiContactSchema), ctrlWrapper(ctrl.updateById));

router.patch('/:id/favorite',  authenticate, isValidId, validationBody(schemas.updateFavoriteSchema), ctrlWrapper(ctrl.updateFavorite));

module.exports = router
