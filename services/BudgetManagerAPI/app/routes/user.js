const passport = require('passport'),
      config = require('@config'),
      models = require('@BudgetManager/app/setup');

module.exports = (app) => {
  const api = app.BudgetManagerAPI.app.api.user;

  app.route('/api/v1/admin')
     .post(api.createAdmin(models.User))

  app.route('/api/v1/user')
     .get(passport.authenticate('jwt', config.session), api.users(models.User, app.get('budgetsecret')));

  app.route('/api/v1/user')
     .post(api.create(models.User));
}