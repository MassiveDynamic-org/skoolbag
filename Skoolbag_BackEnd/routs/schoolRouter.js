const express = require("express");
const {getSchools,addSchool,updateSchool,deleteSchool} = require("../controller/schoolController")
const {schoolValidator} = require("../helpers")

const router = express.Router()
/**
 * GET Router Method
 * @param string - Request path
 * @param callback - function 
 */
router.get('/api/getSchools',getSchools);
/**
 * POST Router Method
 * @param string - Request path
 * @param callback - function 
 */

router.post('/api/addSchool',schoolValidator,addSchool)
/**
 * UPDATE Router Method
 * @param string - Request path
 * @param callback - function 
 */

router.post('/api/updateSchool',schoolValidator,updateSchool)

/**
 * DELETE Router Method
 * @param string - Request path
 * @param callback - function 
 */

router.post('/api/deleteSchool',deleteSchool)

module.exports = router;