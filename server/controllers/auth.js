module.exports = (authService, ApiError) => {
  const controllers = {};

  controllers.register = async (req, res, next) => {
    console.debug(`controllers.register`)
    const { username, email, password } = req.body;
    const token = await authService.registerUser(username, email, password);
    if (token) {
    //   await amqpService.publishRegistration({ email, username });
      res.send({ token: token });
    } else {
      next(ApiError.badRequest({ errors: `Email ${email} already exists` }));
    }
  };

  controllers.login = async (req, res, next) => {
    console.debug(`controllers.login`)
    const { email, password } = req.body;
    const token = await authService.loginUser(email, password);
    if (token) {
      res.send({ token: token });
    } else {
      next(ApiError.badRequest({ errors: `Invalid login credentials` }));
    }
  };

  return controllers;
};
