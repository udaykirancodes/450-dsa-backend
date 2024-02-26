async function handleCreateUser(req, res) {
  try {
    return res.json({
      hello: "hello",
    });
  } catch (error) {}
}
module.exports = {
  handleCreateUser,
};
