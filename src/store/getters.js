const getters = {
  userid: state => state.user.userid,
  name: state => state.user.name,
  // !!将强制转换为布尔值，若存在且不为空(已登录)则返回true，反之返回false
  isLoggedIn: state => !!state.user.userid
}
export default getters
