const router = (req, res) => {
  const args = req.body
  console.log(args)
  res.send('This is the artist events router');
};

export default router;
