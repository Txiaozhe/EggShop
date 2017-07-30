/*
 * MIT License
 *
 * Copyright (c) 2017 SmartestEE Co,Ltd..
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the 'Software'), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/*
 * Revision History:
 *     Initial: 2017/07/29        Tang Xiaoji
 */

'use strict';

const { error, newErrorWithMessage, checkParams } = require('../utils/error');

module.exports = app => {
  class UserController extends app.Controller {
    * register() {
      const { ctx } = this;
      const { username, mobile, password } = ctx.request.body;
      if (!checkParams(username, mobile, password)) {
        ctx.body = newErrorWithMessage(error.ErrInvalidParams);
        return;
      }
      const res = yield ctx.service.user.register(username, mobile, password);
      if (res) {
        ctx.body = newErrorWithMessage(error.ErrSucceed);
      } else {
        ctx.body = newErrorWithMessage(error.ErrMysql);
      }
    }

    * searchUserById() {
      const { ctx } = this;
      const { id } = ctx.request.body;
      if (!checkParams(id)) {
        ctx.body = newErrorWithMessage(error.ErrInvalidParams);
        return;
      }
      const res = yield ctx.service.user.searchUserById(id);
      if (res) {
        ctx.body = newErrorWithMessage(error.ErrSucceed, res);
      } else {
        ctx.body = newErrorWithMessage(error.ErrMysqlfound);
      }
    }

    * getAllUser() {
      const { ctx } = this;
      const res = yield ctx.service.user.getAllUser();
      if (res) {
        ctx.body = newErrorWithMessage(error.ErrSucceed, res);
      } else {
        ctx.body = newErrorWithMessage(error.ErrNotFound);
      }
    }

    * modifyPassword() {
      const { ctx } = this;
      const { id, code, oldp, newp } = ctx.request.body;
      if (!checkParams(id, code, oldp, newp)) {
        ctx.body = newErrorWithMessage(error.ErrInvalidParams);
        return;
      }
      const res = yield ctx.service.user.modifyPassword(id, code, oldp, newp);
      if (res === 1) {
        ctx.body = newErrorWithMessage(error.ErrSucceed);
      } else {
        ctx.body = newErrorWithMessage(error.ErrInvalidParams);
      }
    }

    * deleteUser() {
      const { ctx } = this;
      const { id } = ctx.request.body;
      if (!checkParams(id)) {
        ctx.body = newErrorWithMessage(error.ErrInvalidParams);
        return;
      }
      const res = yield ctx.service.user.deleteUser(id);
      if (res === 1) {
        ctx.body = newErrorWithMessage(error.ErrSucceed);
      } else {
        ctx.body = newErrorWithMessage(error.ErrDelete);
      }
    }
  }
  return UserController;
};
