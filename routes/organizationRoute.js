const { createOrganization, createdOrganization, deleteUser } = require("../controller/organizationController")
const { isAuthenticated } = require("../middleware/isAuthenticated")

const router = require("express").Router()

router.route("/organization").post(isAuthenticated , createdOrganization)
router.route("/deleteUser").post(isAuthenticated , deleteUser)



module.exports = router