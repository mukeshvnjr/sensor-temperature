const router = require('express').Router();

// router.get('/', (req, res) => {
//   res.status(200).json({ message: 'Connected!' });
// });
 
router.use('/temp', require('../TemperatureRoutes/temperature-routes'));
// router.use('/', require('../TemperatureRoutes/mailCron-router'));
router.use('/', require('../TemperatureRoutes/mailcron-router'));

module.exports = router;