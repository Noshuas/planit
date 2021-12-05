export default function handler(req, res) {
  const { email } = req.query;
  res.status(200).send([])
}