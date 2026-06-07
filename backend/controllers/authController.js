const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

// Register  


exports.register = async (req, res) => {
    const {user_name, email, password } = req.body;

    if (!user_name || !email || !password ) {
        return res.status(400).json({message: 'All fields are required.'});
    }

    if (password.length < 8) {
        return res.status(400).json({message: 'The password must be at least 8 characters.'});
    }

    try {

        const [existing] = await db.query(
           'SELECT id FROM users WHERE email = ?', [email]
        );

        if (existing.length > 0) {
            return res.status(409).json({message: 'An account with this email already exists.'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // insert new user into the database :

        await db.query(
            'INSERT  INTO users (user_name, email, password) VALUES (?, ?, ?)', 
            [user_name, email, hashedPassword]
        );

        res.status(201).json({message: 'Account created successfully.'});

    } catch (err) {
        console.error('Register error :', err);
        res.status(500).json({message: 'Server error. Please try again.'});
    }
};


// Login


exports.login = async (req, res) => {
   
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({message: 'Email/username and password are required.'});
    }

    try {

        const [rows] = await db.query(
            'SELECT * FROM users WHERE email = ? OR user_name = ?',
            [email, email]
        );

        if (rows.length === 0) {
            return res.status(401).json({message: 'Incorrect email/username or password'});
        }

        const user = rows[0];

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({message: 'Incorrect email/username or password.'});
        }

        const token = jwt.sign(
            {id: user.id, user_name: user.user_name},
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
        );

        res.status(200).json({
            message: 'Login successful.',
            token,
            user: {
                id: user.id,
                user_name: user.user_name,
                email: user.email
            },

        });


    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({message: 'Server error. Please try again.'});
    }

};








