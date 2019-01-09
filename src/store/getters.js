const getters = {
  validate: state => state.app.validate,
  pathIndex: state => state.app.pathIndex,
  username: state => state.user.nickname,
  id: state => state.user.id,
  avatar: state => state.user.avatar,
  role: state => state.user.role,
  menus: state => state.user.menus,
  permissions: state => state.user.permissions,

}
export default getters
