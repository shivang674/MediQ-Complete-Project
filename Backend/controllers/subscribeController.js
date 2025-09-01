const Subscriber = require('../models/Subscriber');

const subscribeNewsletter = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const existingSubscriber = await Subscriber.findOne({ email });

    if (existingSubscriber) {
      return res.status(400).json({ message: 'This email is already subscribed.' });
    }

    await Subscriber.create({ email });

    res.status(201).json({ message: 'Thank you for subscribing!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
};

module.exports = { subscribeNewsletter };
