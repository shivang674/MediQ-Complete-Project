const Order = require('../models/Order');
const Prescription = require('../models/Prescription');

const createOrder = async (req, res) => {
  const { tests } = req.body;
  if (!req.file) {
    return res.status(400).json({ message: 'Prescription file is required' });
  }
  try {
    const prescription = await Prescription.create({
      user: req.user.id,
      url: req.file.path,
      key: req.file.filename,
    });
    const order = await Order.create({
      user: req.user.id,
      prescription: prescription._id,
      tests: tests ? tests.split(',').map(test => test.trim()) : [],
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error while creating order' });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('prescription', 'url')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching orders' });
  }
};

module.exports = { createOrder, getUserOrders };