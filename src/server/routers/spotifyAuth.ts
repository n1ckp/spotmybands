const router = (req, res) => {
  const args = req.body;
  console.log(args);
  res.send("This is the spotify auth router");
};

export default router;
