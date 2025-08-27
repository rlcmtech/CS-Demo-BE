const express = require('express');
const router = express.Router();
const isLoggedin = require('./Middleware/isLogin.js');
const AccessLevel = require('./Middleware/accessLevel.js');

// middlewares
const isExecutive = require('./Middleware/isExecutive.js');
const isAdmin = require('./Middleware/isAdmin.js');
const isManagement = require('./Middleware/isManagement.js');
const isProduction = require('./Middleware/isProduction.js');



//// imports 

// controllers

const loginRoute = require('./Controllers/loginRoute')

//// RBAC

// exec import - confidential
const createConfidentialFile = require('./Routes/Roles/1-Executive/Confidential File/createConfidential.js')
const DeleteConfidential = require('./Routes/Roles/1-Executive/Confidential File/deleteConfidential.js')
const ShowConfidential = require('./Routes/Roles/1-Executive/Confidential File/showConfidential.js')
const UpdateConfidential = require('./Routes/Roles/1-Executive/Confidential File/updateConfidential.js')

// exec imports - classified
const createClassifiedFile = require('./Routes/Roles/1-Executive/Classified File/createClassified.js');
const UpdateClassified = require('./Routes/Roles/1-Executive/Classified File/updateClassified.js');
const DeleteClassified = require('./Routes/Roles/1-Executive/Classified File/deleteClassified.js');
const ShowClassified = require('./Routes/Roles/1-Executive/Classified File/showClassified.js');

// admin imports
const CreateUser = require('./Routes/Roles/2-admin/createUser.js');
const UpdateUser = require('./Routes/Roles/2-admin/updateUser.js');
const ShowUsers = require('./Routes/Roles/2-admin/showUsers.js');

// management imports
const CreateTask = require('./Routes/Roles/3-management/createTask.js');
const ApproveTask = require('./Routes/Roles/3-management/approveTask.js');

// production imports
const UpdateTask = require('./Routes/Roles/4-production/updateTask.js');



//// routes



// controller routes
router.post('/login', loginRoute ); // this is login




// executive routes
router.use('/executive/create-confidential-file', isLoggedin, isExecutive, createConfidentialFile);
router.use('/executive/delete-confidential-file', DeleteConfidential);
router.use('/executive/show-confidential-files', ShowConfidential);
router.use('/executive/update-confidential-file', UpdateConfidential);

router.use('/executive/create-classified-file', isLoggedin, isExecutive, createClassifiedFile);
router.use('/executive/update-classified-file', UpdateClassified);
router.use('/executive/delete-classified-file', DeleteClassified);
router.get('/executive/show-classified-files', ShowClassified);

// admin
router.post('/admin/create-user', isLoggedin, isAdmin, CreateUser); 
router.post('/admin/update-user', isLoggedin, UpdateUser);
router.use('/admin/show-users', ShowUsers);

// management routes
router.use('/management-create-task', CreateTask);
router.use('/management-approve-task', ApproveTask);

// production route
router.use('/production-update-task', UpdateTask);


// Files Access








module.exports = router;
