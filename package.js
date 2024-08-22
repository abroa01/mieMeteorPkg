Package.describe({
    name: 'abroa01:mieapi-meteor',
    version: '0.0.2',
    summary: 'Meteor package for MIE API integration',
    git: 'https://github.com/abroa01/mieapi_meteor_app.git',
  });
  
  Package.onUse(function(api) {
    api.versionsFrom('2.7.3');
    api.use([
      'ecmascript@0.15.1',
      'accounts-base@2.2.3 || 3.0.0',
      'check@1.3.1',
      'meteor@2.0.0 || 2.0.1',
      'mongo@2.0.0 || 2.0.1',
      'session@1.2.0',
      'accounts-password@2.3.1 || 3.0.1'
    ]);
    
    api.addFiles('lib/logger.js');
    api.mainModule('client/main.js', 'client');
    api.mainModule('server/main.js', 'server');
    api.export('MieApi');
  });
  
  Npm.depends({
    'mieapi': '1.0.6',
    'bcrypt': '5.1.1',
    '@logtail/node': '0.4.21',
    '@logtail/winston': '0.4.21',
    'winston': '3.13.1'
  });
  