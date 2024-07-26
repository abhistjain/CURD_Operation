const express = require('express');
const router = express.Router();

const { userAdd } = require('../Controllers/userControllers');
router.post('/add', userAdd);

const { getUsers } = require('../Controllers/userControllers');
router.get('/users', getUsers);

const { fetchUser } = require('../Controllers/userControllers');
router.get('/users/:id', fetchUser);

const { updateUser } = require('../Controllers/userControllers');
router.put('/update/:id', updateUser);

const { deleteUser } = require('../Controllers/userControllers');
router.delete('/delete/:id', deleteUser);

module.exports = router;
