module.exports = function (app) {
  app.use((req, res, next) => {
    res.setHeader("Access-Controll-Allow-Origin", "*");
    res.setHeader("Access-Controll-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader(
      "Access-Controll-Allow-Headers",
      "Content-Type, Authorization"
    );
    next();
  });
};
