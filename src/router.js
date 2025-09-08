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
const loginRoute = require('./Controllers/loginRoute');
const logoutRoute = require('./Controllers/logoutRoute.js');
const resetPassword = require('./')
//user login, logoute, and reset password route







//// RBAC
// exec imports - classified
const createClassifiedFile = require('./Routes/Roles/1-Executive/Classified File/createClassified.js');
const UpdateClassified = require('./Routes/Roles/1-Executive/Classified File/updateClassified.js');
const DeleteClassified = require('./Routes/Roles/1-Executive/Classified File/deleteClassified.js');
const ShowClassified = require('./Routes/Roles/1-Executive/Classified File/showClassified.js');
// exec import - confidential
const createConfidentialFile = require('./Routes/Roles/1-Executive/Confidential File/createConfidential.js');
const DeleteConfidential = require('./Routes/Roles/1-Executive/Confidential File/deleteConfidential.js');
const ShowConfidential = require('./Routes/Roles/1-Executive/Confidential File/showConfidential.js');
const UpdateConfidential = require('./Routes/Roles/1-Executive/Confidential File/updateConfidential.js');
// admin imports
const CreateUser = require('./Routes/Roles/2-admin/createUser.js');
const UpdateUser = require('./Routes/Roles/2-admin/updateUser.js'); 
const ShowUsers = require('./Routes/Roles/2-admin/showUsers.js');
// management imports
const CreateTask = require('./Routes/Roles/3-management/createTask.js');
const ViewAllTasks = require('./Routes/Roles/3-management/viewAllTasks.js');
const ApproveTask = require('./Routes/Roles/3-management/approveTask.js');
// production imports
const UpdateTaskProgress = require('./Routes/Roles/4-production/updateTask.js');
const ViewTasks = require('./Routes/Roles/4-production/viewTasks');
// view files
const ViewClassifiedFiles = require('../src/Routes/Files/classifiedFiles.js');
const ViewConfidentialFiles = require('./Routes/Files/confidentialfiles.js');

//// routes

// controller routes
router.post('/login', loginRoute); // this is login
// executive routes
router.use('/executive/create-classified-file', isLoggedin, isExecutive, createClassifiedFile);
router.put('/executive/update-classified-file/:id', isLoggedin, isExecutive, UpdateClassified);
router.use('/executive/delete-classified-file/:id', isLoggedin, isExecutive, DeleteClassified);
router.use('/executive/show-classified-files', isLoggedin, isExecutive, ShowClassified);

router.use('/executive/create-confidential-file', isLoggedin, isExecutive, createConfidentialFile);
router.use('/executive/delete-confidential-file/:id', isLoggedin, isExecutive, DeleteConfidential);
router.use('/executive/show-confidential-files', isLoggedin, isExecutive, ShowConfidential);
router.use('/executive/update-confidential-file/:id', isLoggedin, isExecutive, UpdateConfidential);

// admin
router.post('/admin/create-user', isLoggedin, isAdmin, CreateUser); 
router.put('/admin/update-user/:id', isLoggedin, isAdmin, UpdateUser);
router.use('/admin/show-users', isLoggedin, isAdmin, ShowUsers);
// management routes
router.use('/management/create-task', isLoggedin, isManagement, CreateTask);
router.put('/management/approve-task/:id', isLoggedin, isManagement, ApproveTask);
router.get('/management/view-tasks', isLoggedin, isManagement, ViewAllTasks);
// production route
router.put('/production/update-task/:id', isLoggedin, isProduction, UpdateTaskProgress);
router.use('/production/view-tasks', isLoggedin, isProduction, ViewTasks);
// Files Access
router.use('/user/view/classified-files', isLoggedin, ViewClassifiedFiles);
router.use('/user/view/confidential-files', isLoggedin, ViewConfidentialFiles);

module.exports = router;
