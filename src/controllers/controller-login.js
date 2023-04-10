const config = require('../configs/database');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

let mysql      = require('mysql');
let pool       = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    
    login(req,res){
        res.render("login",{
            url : 'http://localhost:5050/',
            
            colorFlash: req.flash('color'),
            statusFlash: req.flash('status'),
            pesanFlash: req.flash('message'),
        });
    },
    
    loginAuth(req,res){
        let email = req.body.email;
        let password = req.body.pass;
        if (email && password) {
            pool.getConnection(function(err, connection) {
                if (err) throw err;
                connection.query(
                    `SELECT * FROM table_user WHERE user_email = ? AND user_password = SHA2(?,512)`
                , [email, password],function (error, results) {
                    if (error) throw error;  
                    if (results.length > 0) {
                        
                        // Generate JWT token
                        const token = jwt.sign({
                            user_id: results[0].user_id,
                            user_name: results[0].user_name
                        }, 'secret-key', { expiresIn: '1h' });
                        
                        // Save JWT token in cookie
                        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
                        
                        req.session.loggedin = true;
                        req.session.userid = results[0].user_id;
                        req.session.username = results[0].user_name;
                        res.redirect('/');
                    } else {
                        
                        req.flash('color', 'danger');
                        req.flash('status', 'Oops..');
                        req.flash('message', 'Akun tidak ditemukan');
                        res.redirect('/login');
                    }
                });
                connection.release();
            })
        } else {
            res.redirect('/login');
            res.end();
        }
    },
    
    logout(req,res){
        
        req.session.destroy((err) => {
            if(err) {
                return console.log(err);
            }
            
            // Clear JWT token from cookie
            res.clearCookie('token');
            res.redirect('/login');
        });
    },
}
