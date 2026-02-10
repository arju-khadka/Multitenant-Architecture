const { createOrganization, createdOrganization } = require("../controller/organizationController")

const router = require("express").Router()

router.route("/organization").post(createdOrganization)



module.exports = router