const express = require('express');
const tourController = require('./../controller/tourController');



const router = express.Router();

//manggil middle ware chek id di tourcontroller
// router.param('id', tourController.checkId);
router.route('/top-5-cheap').get(tourController.aliasTopTours, tourController.getAllTours);
router.route('/')
.get(tourController.getAllTours)
.post(tourController.createTour);

router.route('/:id')
.get(tourController.getOneTour)
.patch(tourController.updateTour)
.delete(tourController.deleteTour);

module.exports = router;