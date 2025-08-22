const express = require('express');
const router = express.Router();

const { deleteFile } = require('./Controllers/executive/deleteFile');
const { createFile } = require('./Controllers/executive/createFile');
const { updateFile } = require('./Controllers/executive/updateFile');
const { showFile } = require('./Controllers/executive/showFile');

// Routes
router.post('/executive/create-file', createFile);
router.put('/executive/update-file', updateFile);
router.delete('/executive/delete-file', deleteFile);
router.get('/executive/show-file', showFile);

module.exports = router;
