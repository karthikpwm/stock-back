const router = require('express').Router()

const { catchErrors } = require('../handlers/errorHandler')
const analyticController = require('../controllers/analyticController')

router.get("/", catchErrors(analyticController.getAll))
router.delete("/:analytic_id", catchErrors(analyticController.delete))
// router.get("/:analytic_id", catchErrors(analyticController.findOne))

router.post("/insert", catchErrors(analyticController.addRecord))
router.put("/update", catchErrors(analyticController.update))
// router.put("/:analytic_id", catchErrors(analyticController.updateRecord))

// router.delete("/:analytic_id", catchErrors(analyticController.deleteRecord))

module.exports = router