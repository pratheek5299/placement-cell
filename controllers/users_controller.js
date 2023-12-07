const User = require('../models/user');
const Students = require('../models/student');
const Companies = require('../models/companies');
const {Parser} = require('@json2csv/plainjs');
const fs = require('fs');
const request = require('request');

//show the main page which contains the student data, interview data and the corresponding forms
module.exports.studentProfile = async function(req, res){
    try{
        let students = await Students.find({})
        .populate('companies')
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

//create session
module.exports.createSession = function(req, res){
    return res.redirect('/users/student-profile')
}

//sign out of the session
module.exports.destroySession = function(req, res, next){
    req.logout(function(err){
        if (err){
            return next(err);
        }
        return res.redirect('/')
    });// passport give the function
   
}

//save the student data entered by the employee in the database
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

// to save data the interview data into the data base 
module.exports.saveCompanyData = async function(req, res){
    try{
        let student = await Students.findById(req.body.students);

        if(student){
            let company = await Companies.create(req.body);
            student.companies.push(company);
            student.save();
            return res.redirect('back');            
        }
    }catch(err){
        console.log(`Error in saving the company data${err}`)
    } 
}

//To download the csv file that contains the data from the database
module.exports.downloadCsv = async function(req, res){
    try{
        let student = await Students.findById(req.params.id).select('-_id -__v ').populate('companies','-_id -__v ');
        // console.log(student);
        const fields = ['name', 'college', 'batch', 'status','companies', 'dsa', 'webd', 'react'];
        const opts = { fields };
        const parser = new Parser(opts);
        const csv = parser.parse(student);
        const filename = student.name + Date.now() + ".csv";
        // const filepath ="D:\VS Code Backend Projects\6) Placement Cell (Skill Test)\placement-cell\studentFiles" + filename;
        fs.writeFileSync(filename, csv)
        return res.download(filename);
        // return res.redirect('back')
    }catch(err){
        console.log(`Error in getting downloading the data in csv format ${err}`);
    }
}


//external api code
module.exports.externalApi = function(req, res){
    
    const options = {
        method: 'GET',
        url: 'https://remote-jobs-api.p.rapidapi.com/jobs',
        qs: {company: 'shopify'},
        headers: {
        'X-RapidAPI-Key': '3920685daemsh040d25d3e815f76p178171jsn2b01d96b31b7',
        'X-RapidAPI-Host': 'remote-jobs-api.p.rapidapi.com'
        }
    };
    
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        
            res.write(JSON.stringify(body));
            res.end();
    });
}