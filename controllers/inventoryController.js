const inventoryModel = require('../models/inventoryModel');
const utilities = require('../utilities/index');

exports.buildDetailView = async function (req, res, next) {
  const inv_id = req.params.inv_id;
  try {
    const data = await inventoryModel.getVehicleById(inv_id);
    if (!data) {
      return res.status(404).render('error/404');
    }

    const html = utilities.buildVehicleDetailHTML(data);
    res.render('inventory/vehicleDetail', {
      title: `${data.inv_make} ${data.inv_model}`,
      content: html
    });
  } catch (error) {
    next(error);
  }
};
