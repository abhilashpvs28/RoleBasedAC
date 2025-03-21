const db = require("../config/db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const hasedPassword = await bcrypt.hash(password, 10);

    // Insert Query

    const query = `
        INSERT INTO users (name, email, password, role)
        VALUES ($1, $2, $3, $4)
        RETURNING id, name, role;
        `;

    const values = [name, email, hasedPassword, role];

    const result = await db.query(query,values);

    res.status(201).json({
        message:`Registered SuccessFully with User : ${email}`,
        user: result.rows[0]
    })
  } catch (err) {
    res.status(500).json({"error" : `${err}`})
  }
};

const login = async (req, res) => {
    
    const {email, password} = req.body;

    try {
        const result = await db.query(`SELECT * FROM users WHERE email = $1`,[email]);

        if(result.rows.length === 0){
            return res.status(400).json({message : "User Not Found with the Email"});
        }

        const user = result.rows[0];

        const validPassword = await bcrypt.compare(password, user.password);

        if(!validPassword){
            return res.status(400).json({message : "Password does not Match, Please try again !!"})
        }

        //Generate jwt token

        const token = jwt.sign(
            {id : user.id, email : user.email, name : user.name, role : user.role},
            process.env.JWT_SECRET,
            {expiresIn : "1h"}
        );

        res.status(200).json({
            message:"Login Successfully",
            token
        })


    } catch (error) {
        res.status(500).json({"error" : `${error}` });
    }

};

module.exports = { register, login };
