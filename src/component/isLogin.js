const isLogin = () => {
    if(!localStorage.getItem('idx')){
      alert("Login Error");
      window.location.replace('/');
    }
  }

export default isLogin;