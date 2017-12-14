module.exports = [
  ['/api/sort/:id?', '/sort', 'rest'],
  ['/api/article/:id?', '/article', 'rest'],
  ['/api/comment/:id?', '/comment', 'rest'],
  ['/api/tag/:_id?', '/tag/:_id', 'rest'],
  ['/api/user/loginup', '/user/loginup', 'post'],
  ['/api/admin/login', '/user/loginAdmin', 'post'],
  ['/api/user/delete', '/user/delete', 'delete'],
  ['/api/user/update', '/user/update', 'put'],
  ['/api/user/:id?', '/user/get/:_id', 'get']
];
