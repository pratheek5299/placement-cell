const express = require('express');

const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/users_controller');
router.get('/student-profile', passport.checkAuthentication,usersController.studentProfile);
router.get('/sign-in', usersController.signIn);
router.get('/sign-up', usersController.signUp);
router.post('/create', usersController.create);
router.get('/sign-out', usersController.destroySession);
router.post('/enter-student-details', passport.checkAuthentication, usersController.saveStudentData);
router.get('/enter-student-details', passport.checkAuthentication, usersController.studentProfile);
router.post('/enter-interview-details', passport.checkAuthentication, usersController.saveCompanyData);
router.get('/download-student-data/:id', usersController.downloadCsv);
router.get('/external-api', usersController.externalApi);
//use passport as a middle ware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
), usersController.createSession);
module.exports = router;