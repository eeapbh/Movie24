<template>
  <div id="app" class = 'text-white bgblack'>
    <b-navbar class="sticky-top bl" toggleable="lg" type="dark" variant="dark">
      <router-link class="navbar-brand" to="/">Home</router-link>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav v-if="login">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/movies">Movies</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="liked-movies">LikedMovies</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/community">Community</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/profile">Profile</router-link>
            </li>
          </ul>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-navbar-nav v-if="login">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item">
                <router-link class="nav-link" @click.native="logout" to="#">Logout</router-link>
              </li>
            </ul>
          </b-navbar-nav>
          <b-navbar-nav v-else>
            <ul class="navbar-nav mr-auto">
              <li class="nav-item">
                <router-link class="nav-link" to="/signup">Signup</router-link> 
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/login">Login</router-link>
              </li>
            </ul>
          </b-navbar-nav>
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <p></p>
    <router-view @login="login = true" />
    <div class="footerWrap">
      <div class="footer">
        <div class="f1">
          <img src="@/assets/두번째.jpg" alt="">  
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae sint et accusamus non incidunt commodi eius impedit natus illum, 
            doloribus accusantium voluptatibus, repellendus libero asperiores. Ad perspiciatis sint porro doloremque.</p>
        </div>
        <div class="f2">
          <ul>
            <li><a href="https://twitter.com/?lang=ko"><i class="fab fa-twitter"></i></a></li>
            <li><a href="https://www.facebook.com/"><i class="fab fa-facebook-f"></i></a></li>
            <li><a href="https://www.instagram.com/"><i class="fab fa-instagram"></i></a></li>
            <li><a href="https://www.google.co.kr/"><i class="fab fa-google-plus-g"></i></a></li>
          </ul>
        </div>
    </div>
  </div>
  </div>
  
</template>

<script>
export default {
  name: 'App',
  data: function () {
    return {
      login: false,
    }
  },
  methods: {
    logout: function () {
      localStorage.removeItem('jwt')
      this.login = false
      this.$router.push({ name: 'Login' })
    }
  },
  created() {
    const token = localStorage.getItem('jwt')

    if (token) {
      this.login = true
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<style scoped>
  .navbar.navbar-dark.bg-dark{
    background-color: black!important;
 }


 /* -------------------------------------------Footer------------------------------------------- */
 .footerWrap {
    width: 100%;
    height: 180px;
    background: black;
  }

  .footer {
    width: 1240px;
    height: 100%;
    margin: 0 auto;
  }

  .footer::after {
    display: block;
    clear: both;
    content: "";
  }

  .footer>.f1 {
    width: 70%;
    height: 100%;
    background: black;
    float: left;
    text-align: center;
  }
  .f1>img{
    padding-left: 20px;
    width: 50%;
    height: 100px;
    background-size: cover;
   
  }

  .f1>p{
    padding-left: 20px;
    padding-top: 30px;
  }

  .footer>.f2 {
    width: 30%;
    height: 100%;
    background: black;
    float: left;
    position: relative;
  }

  /* .logo {
    background: url(img3/con1.jpg)no-repeat;
    background-size: cover;
    width: 260px;
    height: 80px;
    margin-bottom: 20px;
  } */


  .f2>ul::after {
    display: block;
    clear: both;
    content: "";
  }

  .f2>ul>li {
    width: 25%;
    float: left;   
    border-top: 1px #555 solid;
    border-bottom: 1px #555 solid;
    padding: 20px 0;
    list-style:none;
  }

  .f2>ul>li>a {
    color: #555;
    font-size: 20px;
      
  }

  .f2>ul {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
    padding: 0;
  }

  .f2>ul>li>a:hover {
    color: #fff;
  }
</style>
