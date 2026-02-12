const { QueryTypes } = require("sequelize")
const { sequelize } = require("../model")


exports.createdOrganization = async (req, res) => {
    const { name, address, email, number } = req.body
    const userId = req.userId
    const OrganizationNumber = Math.floor(1000 + Math.random() * 9000)

    await sequalize.query(`CREATE TABLE IF NOT EXISTS organization_${OrganizationNumber}(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        address VARCHAR(255),
        email VARCHAR(255),
        number VARCHAR(255),
        userId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
    )`, {
        type: QueryTypes.CREATE
    })

    await sequelize.query(`CREATE TABLE IF NOT EXISTS userHistory_${userId}(OrganizationNumber)(
         OrganizationNumber INT

    )`)

    await sequelize.query(`INSERT INTO organization_${OrganizationNumber}(name,address,email,number,userId)VALUES(?,?,?,?,?)`, {
        type: QueryTypes.INSERT,
        replacements: [name, address, email, number, userId]
    })

    await sequelize.query(`INSERT INTO userHistory_${userId}(OrganizationNumber) VALUES(?)`,{
        type : QueryTypes.INSERT,
        replacements : [OrganizationNumber]
    })

    res.status(200).json({
        message: "Organization created successfully",
        orgNo: OrganizationNumber
    })
}

exports.deleteUser = async(req,res)=>{
    const userId = req.userId
    const userOrganizations = await sequelize.query(`SELECT organization FROM userHistory_${userId}`,{
        type : QueryTypes.SELECT
    })
    await sequelize.query(`DELETE FROM users WHERE id=?  `,{
        replacements : [userId],
        type : QueryTypes.DELETE
    })

    for (var i = 0; i< userOrganizations.length ; i++ ){
        await sequelize.query(`DROP TABLE organization_${userOrganizations[i],OrganizationNumber}`,{
            type : QueryTypes.DELETE,

        })
    }
    res.status(200).json({
        message : "All organizations deleted"
    })
}