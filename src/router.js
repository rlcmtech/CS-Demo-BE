const express = require('express');
const router = express.Router();



//// imports 


// exec import - confidential
const createConfidential = require('./Roles/1-Executive/Confidential File/createConfidentialFile')
const deleteConfidential = require('./Roles/1-Executive/Confidential File/deleteConfidentialFile')
const showConfidential = require('./Roles/1-Executive/Confidential File/showConfidentialFile')
const updateConfidential = require('./Roles/1-Executive/Confidential File/updateConfidentialFile')

// exec imports - classified
const CreateFile = require('./Roles/1-Executive/Classified File/createFile');
const UpdateFile = require('./Roles/1-Executive/Classified File/updateFile');
const DeleteFile = require('./Roles/1-Executive/Classified File/deleteFile');
const ShowFile = require('./Roles/1-Executive/Classified File/showFile');

// admin imports
const CreateUser = require('./Roles/2-admin/createUser');
const UpdateUser = require('./Roles/2-admin/updateUser');
const ShowUsers = require('./Roles/2-admin/showUsers');

// management imports
const CreateTask = require('./Roles/3-management/createTask');
const ApproveTask = require('./Roles/3-management/approveTask');

// production imports
const UpdateTask = require('./Roles/4-production/updateTask');



//// routes


// executive routes
router.use('/executive/create-confidential-file', createConfidential);
router.use('/executive/delete-confidential-file', deleteConfidential);
router.use('/executive/show-confidential-files', showConfidential);
router.use('/executive/update-confidential-file', updateConfidential);

router.use('/executive/create-classified-file', CreateFile);
router.use('/executive/update-classified-file', UpdateFile);
router.use('/executive/delete-classified-file', DeleteFile);
router.get('/executive/show-classified-files', ShowFile);

// admin
router.use('/admin/create-user', CreateUser);
router.use('/admin/update-user', UpdateUser);
router.use('/admin/show-users', ShowUsers);

// management routes
router.use('/management-create-task', CreateTask);
router.use('/management-approve-task', ApproveTask);

// production route
router.use('/production-update-task', UpdateTask);






module.exports = router;
