const Url = require('../models/Url');
const crypto = require('crypto');

const generateShortCode = () => crypto.randomBytes(3).toString('hex');

exports.createShortUrl = async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL is required' });

  const shortCode = generateShortCode();

  const newUrl = new Url({ url, shortCode });
  await newUrl.save();

  res.status(201).json(newUrl);
};

exports.getOriginalUrl = async (req, res) => {
  const { shortCode } = req.params;
  const urlData = await Url.findOne({ shortCode });

  if (!urlData) return res.status(404).json({ error: 'Short URL not found' });

  urlData.accessCount++;
  await urlData.save();

  res.status(200).json(urlData);
};

exports.updateShortUrl = async (req, res) => {
  const { shortCode } = req.params;
  const { url } = req.body;

  if (!url) return res.status(400).json({ error: 'URL is required' });

  const urlData = await Url.findOneAndUpdate(
    { shortCode },
    { url, updatedAt: new Date() },
    { new: true }
  );

  if (!urlData) return res.status(404).json({ error: 'Short URL not found' });

  res.status(200).json(urlData);
};

exports.deleteShortUrl = async (req, res) => {
  const { shortCode } = req.params;
  const result = await Url.findOneAndDelete({ shortCode });

  if (!result) return res.status(404).json({ error: 'Short URL not found' });

  res.sendStatus(204);
};

exports.getStats = async (req, res) => {
  const { shortCode } = req.params;
  const urlData = await Url.findOne({ shortCode });

  if (!urlData) return res.status(404).json({ error: 'Short URL not found' });

  res.status(200).json(urlData);
};
