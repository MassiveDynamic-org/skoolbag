exports.schoolValidator = (req,res,next) => {
    req.check('name',"name is required").notEmpty();
    req.check('name',"Name field lenth is incorrect").isLength({
        min:5,
        max:100
    })
    req.check('address',"Address is required").notEmpty();
    req.check('address',"Address field lenth is incorrect").isLength({
        min:5,
        max:100
    })
    req.check('count',"Count is required").notEmpty();
    req.check('count',"Student count is not valide").isNumeric()

    const errors = req.validationErrors();

    if(errors){
        const errormsg = errors.map((error)=> error.msg)[0];
        return res.status(400).json({error:errormsg})
    }
    next()
}