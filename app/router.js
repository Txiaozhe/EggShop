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

module.exports = app => {
  const auth = app.middlewares.auth();

  app.get('/', 'home.index');

  app.post('/home', 'home.home');

  // user
  app.post('/user/register', 'user.register');
  app.post('/user/user', 'user.searchUserById');
  app.get('/user/all', 'user.getAllUser');
  app.post('/user/password/modify', app.jwt, 'user.modifyPassword');
  app.post('/user/delete', 'user.deleteUser');
  app.post('/user/login', 'user.login');
  app.post('/user/userinfo/modify', app.jwt, 'user.modifyInfo');
  app.get('/auth', app.jwt, auth, 'user.testAuth');

  // address
  app.post('/address/create', app.jwt, 'address.create');
  app.post('/address/modify', app.jwt, 'address.modify');
  app.post('/address/default', app.jwt, 'address.setDefault');
  app.get('/address/all', app.jwt, 'address.getAll');
  app.post('/address/delete', app.jwt, 'address.delete');
};
