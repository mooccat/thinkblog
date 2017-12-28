module.exports = [
  ['/admin', '/index/admin', 'get'],
  ['/api/sort/:id?', '/sort', 'rest'],
  ['/api/article/:id?', '/article', 'rest'],
  ['/api/comment/:id?', '/comment', 'rest'],
  ['/api/tag/:_id?', '/tag/:_id', 'rest'],
  ['/api/admin/register', '/user/registerAdmin', 'post'],
  ['/api/admin/login', '/user/loginAdmin', 'post'],
  ['/api/user/delete', '/user/delete', 'delete'],
  ['/api/user/update', '/user/update', 'put'],
  ['/api/user/:id?', '/user/get/:_id', 'get'],

  ['/api/user/login', '/user/login', 'post'],
  ['/api/user/register', '/user/registe', 'post']
];
