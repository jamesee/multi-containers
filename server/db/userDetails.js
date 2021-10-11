
module.exports = (pool, UserDetails) => {
    const db = {}
  

    db.insertUserDetails = async (userDetails) => {
      const res = await pool.query(
        'INSERT INTO User_details (user_id, company, designation, department) VALUES ($1,$2, $3, $4) RETURNING *',
        [userDetails.user_id, userDetails.company, userDetails.designation, userDetails.department]
      )
      return new UserDetails(res.rows[0])
    }
  
    db.updateUserDetails = async (id, userDetails) => {
        const res = await pool.query(
          'UPDATE User_details SET user_id= $2, company=$3, designation=$4, department=$5 WHERE id=$1 RETURNING *',
          [id, userDetails.user_id, userDetails.company, userDetails.designation, userDetails.department]
        )
        return new UserDetails(res.rows[0])
      }

    db.findUserDetailsByUserId = async (user_id) => {

        const res = await pool.query(
          'SELECT * FROM User_details WHERE user_id = $1',
          [user_id]
        )

        return res.rowCount ? new UserDetails(res.rows[0]) : null
      }
    return db
  }