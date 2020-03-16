const schoolModel = require("../model/schooModel")
/**
 * GET request call back method implimentation
 * @param jasonObject - request payload
 * @param jasonObject - response
 */
exports.getSchools = (req, res) => {
    const data = schoolModel.find()
        .select("_id name address count")
        .then(data => {
            res.json({ data })
        })
        .catch(err => console.log(err))

}

exports.addSchool = (req, res) => {
    if(req.body._id === null) {
        delete req.body._id;
    }

    const schoolmodel = new schoolModel(req.body)
    console.log(schoolmodel)
    schoolmodel.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        res.json({
            data: result,
            message: "New school successfuly added"
        })
    })
    console.log(schoolmodel)
}

exports.updateSchool = (req, res) => {

    schoolModel.findByIdAndUpdate(req.body._id, req.body, { upsert: true }, (err, result) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        res.json({
            data: req.body,
            message: "School successfuly updated"

        })
    });
}

exports.deleteSchool = (req, res) => {

    schoolModel.findByIdAndRemove(req.body._id, (err, result) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        res.json({
            data: result,
            message: "School successfuly deleted"

        })
    });
}
