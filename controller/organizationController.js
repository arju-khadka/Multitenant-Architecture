const { QueryTypes } = require("sequelize")
const { sequelize } = require("../model")


exports.createdOrganization = async(req,res)=>{
    const {name,address,email,number} = req.body
    const OrganizationNUmber = Math.floor(1000+ Math.random() * 9000)

    await sequalize.query(`CREATE TABLE organization(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        address VARCHAR(255),
        email VARCHAR(255),
        number VARCHAR(255)
    )`,{
        type : QueryTypes.CREATE
    })
    await sequelize.query(`INSERT INTO organization_${OrganizationNUmber}(name,address,email,number)VALUES(?,?,?,?)`,{
        type : QueryTypes.INSERT,
        replacements : [name,address,email,number]
    })

    res.status(200).json({
        message : "Organization created successfully"
    })
}