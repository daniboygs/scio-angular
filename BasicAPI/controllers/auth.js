var jwt = require('jsonwebtoken');
var User = require('../models/user');
var authConfig = require('../config/auth');

function generateToken(user){
    return jwt.sign(user, authConfig.secret, {
        expiresIn: "100d"
    });
}

function setUserInfo(request){
    return {
        _id: request._id,
        email: request.email,
        role: request.role
    };
}

exports.register = function(req, res, next){

    var email = req.body.email;
    var password = req.body.password;
    var name = req.body.name;

    if(!email){
        return res.status(400).send({error: 'You must enter an email address'});
    }

    if(!password){
        return res.status(400).send({error: 'You must enter a password'});
    }

    if(!name){
        return res.status(400).send({error: 'You must enter a name'});
    }

    User.findOne({email:email}, function(err, existingUser){

        if(err){
            return next(err);
        }

        if(existingUser){
            return res.status(409).send({error: 'That email address is already in use'});
        }

        var user = new User({
            email: email,
            password: password,
            name: name
        });

        user.save(function(err, user){

            if(err){
                return next(err);
            }

            var userInfo = setUserInfo(user);

            res.status(201).json({
                token: 'JWT ' + generateToken(userInfo),
                user: userInfo
            })

        });

    });

}


exports.login = function(req, res, next){
    
    var password = req.body.password;
    var email = req.body.email;

    if(!password){
        return res.status(400).send({error: 'You must enter a password'});
    }

    if(!email){
        return res.status(400).send({error: 'You must enter an email address'});
    }
    console.log('1111111111111111111');
    User.findOne({email:email}, function(err, existingUser){

        if(err){
            return next(err);
        }
        console.log('222222222222222222');
        if(existingUser){
            console.log('333333333333333333');
            existingUser.comparePassword(password, (err,match) =>{
                console.log('4444444444444444');
                if (match) {
                    console.log('5555555555555555');
                    console.log(existingUser.email);
                    return res.status(200).json({
                        token: 'JWT ' + generateToken(existingUser),
                        user: existingUser,
                        result: true
                    })
                }

            });
            
        }


        

        /*var user = new User({
            password: password,
            name: name
        });

        user.save(function(err, user){

            if(err){
                return next(err);
            }

            var userInfo = setUserInfo(user);

            res.status(201).json({
                token: 'JWT ' + generateToken(userInfo),
                user: userInfo
            })

        });*/

    });

}
