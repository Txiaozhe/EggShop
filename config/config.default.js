'use strict';

module.exports = appInfo => {
  const config = {};

  // should change to your own
  config.keys = appInfo.name + '_1501055229355_649';

  config.security = {
    ignore: '/api/',
    csrf: {
      ignoreJSON: true
    }
  };

  return config;
};
