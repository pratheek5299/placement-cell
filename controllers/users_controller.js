const User = require('../models/user');

//render sign in page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in',{
        title: 'Employee | Sign In'
    });
}

//render sign up page
module.exports.signUp = function(req, res){
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