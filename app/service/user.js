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

const {
  tables,
  getOne,
  getAll,
  modify,
  deleteOne,
  getConn,
} = require('../utils/mysqlKit');

module.exports = app => {
  class User extends app.Service {
    * register(nickname, mobile, password) {
      const conn = yield getConn(app);
      try {
        yield conn.insert(tables.user, { nickname, mobile, password });
        yield conn.insert(tables.userInfo, { nickname, mobile });
        yield conn.commit();
      } catch (e) {
        yield conn.rollback();
        return false;
      }

      return true;
    }

    * searchUserById(id) {
      return yield getOne(app, tables.user, { id });
    }

    * getAllUser() {
      return yield getAll(app, tables.user);
    }

    * modifyPassword(id, code, oldp, newp) {
      const sqlOldPass = yield getOne(app, tables.user, { id });
      if (sqlOldPass.password !== oldp) {
        return 'password or code err';
      }
      const res = yield modify(app, tables.user, {
        id,
        password: newp,
      });

      return res.affectedRows;
    }

    * deleteUser(id) {
      const res = yield deleteOne(app, tables.user, { id });
      return res.affectedRows;
    }

    * login(mobile, password) {
      const res = yield getOne(app, tables.user, { mobile });
      return res.password === password;
    }
  }
  return User;
};
