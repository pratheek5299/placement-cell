const User = require('../models/user');
const Students = require('../models/student');

module.exports.studentProfile = async function(req, res){
    try{
        let students = await Students.find({});
        return res.render('student_profile',{
            title: 'Placement Cell | Student profiles',
            students_list: students
        })
    }catch(err){
        console.log('Error in getting student data from the database', err);
    }
}

//render sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/student-profile')
    }
    return res.render('user_sign_in',{
        title: 'Employee | Sign In'
    });
}

//render sign up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/student-profile')
    }
    return res.render('user_sign_up', {
        title: 'Employee | Sign In'
    });
}

//get the sign up data
module.exports.create = async function(req, res){
   try{
        if(req.body.password != req.body.confirm_password){
            return res.redirect('back');
        }
        let user = await User.findOne({email : req.body.email});
        if(!user){
            let createUser = await User.create(req.body);
            return res.redirect('/users/sign-in');
        }else{
            return res.redirect('back');
        }
   }catch(err){
        console.log(`Error:: ${err}`);
   }
}

module.exports.createSession = function(req, res){
    return res.redirect('/users/student-profile')
}

module.exports.destroySession = function(req, res, next){
    req.logout(function(err){
        if (err){
            return next(err);
        }
        return res.redirect('/')
    });// passport give the function
   
}

module.exports.saveStudentData = async function(req, res){
    if(req.isAuthenticated()){
        try{
            let student = await Students.create(req.body);
            return res.redirect('back');
        }catch(err){
            console.log('Error in storing the student data', err);
        }
    }
    return res.render('user_sign_in',{
        title: 'Employee | Sign In'
    });
}