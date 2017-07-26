'use strict';

module.exports = app => {
  class HomeController extends app.Controller {
    * index() {
      this.ctx.body = 'hi, egg';
    }

    * home() {
      var {ctx} = this;
      ctx.body = {
        name: ctx.request.body.name
      }
    }
  }
  return HomeController;
};
