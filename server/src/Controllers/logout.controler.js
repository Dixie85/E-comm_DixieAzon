import db from "../../database.js";

//Loout a user
export const userLogout = async (req, res, next) => {
  const userEmail = req.user;
  
  db.run(
    `UPDATE UserData set 
    refreshToken = COALESCE(?,refreshToken) 
    WHERE email = ?`,
    ['', userEmail],
    function (err, result) {
      if (err) {
        console.log(err);
        return res.json({ message: err });
      }
      return res.status(200).json({message: 'success'});
    }
  );
};
