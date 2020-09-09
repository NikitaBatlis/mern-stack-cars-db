module.exports = function(app) {
  const car = require('../controllers/car.controller.js');
  app.put('/api/cars/update', car.updateByID);
}
