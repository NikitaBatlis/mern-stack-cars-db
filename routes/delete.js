module.exports = function(app) {
  const car = require('../controllers/car.controller.js');
  app.delete('/api/cars/delete', car.deleteByID);
}
