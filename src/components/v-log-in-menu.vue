<template>
<transition name="modal">
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <form>
          <!-- <img class="mb-4" src="../assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"> -->
          <div class="container">
            <button type="button" v-on:click.stop="this.$store.state.logInMenu = false;" class="btn-close p-3" aria-label="Закрыть окно"></button>
            <h1 v-if="toRegister" class="h3 mb-3 fw-normal">Регистрация</h1>
            <h1 v-else class="h3 mb-3 fw-normal">Вход в аккаунт</h1>
           
          </div>
         
          <div v-if="toRegister"  class="container">
            <form class="needs-validation" @submit.prevent="" novalidate>
              <div class="row g-3">
                <div class="form-floating">
                  <input
                    id="nameUser"
                    v-model="nameUser"
                    class="form-control"
                    placeholder="YES"
                    required
                    type="text"
                    name="nameUser"
                  >
                  <label for="nameUser" class="form-label">Имя</label>
                  <div v-if="!nameUser & validateOn" class="invalid-feedback" style="display: block;">
                    Имя обязательна для ввода!
                  </div>
                </div>
    
                <div class="form-floating">
                  <input
                    id="lastName"
                    v-model="lastName"
                    class="form-control"
                    placeholder="YES"
                    required
                    type="text"
                    name="lastName"
                  >
                  <label for="lastName" class="form-label">Фамилия</label>
                  <div v-if="!lastName & validateOn" class="invalid-feedback" style="display: block;">
                    Фамилия обязательна для ввода!
                  </div>
                </div>
    
                <div class="col-12 form-floating">
                  
                  <input
                    id="email"
                    class="form-control"
                    v-model="email"
                    type="email"
                    name="email"
                    placeholder="YES"
                  >
                  <label for="email" class="form-label">Электронная почта</label>
                  <div v-if="(!email | !emailValid) & validateOn" class="invalid-feedback" style="display: block;">
                    Пожалуйста введите корректную электронную почту!
                  </div>
                </div>
                <div class="col-12 form-floating">
                  <input
                  id="password1"
                  class="form-control"
                  v-model="password1"
                  type="password"
                  name="password1"
                  placeholder="YES"
                  >
                  <label for="password1" class="form-label">Пароль</label>
                  <div v-if="(!password1 | !password1Valid) & validateOn" class="invalid-feedback" style="display: block;">
                    Пожалуйста проверьте пароль, они должны совпадать!
                  </div>
                </div>
                <div class="col-12 form-floating">
                  <input
                  id="floatingPassword"
                  class="form-control"
                  v-model="password2"
                  type="password"
                  name="password2"
                  placeholder="YES"
                  >
                  <label for="email" class="form-label">Пароль ещё раз</label>
                  <div v-if="(!password2 | !password2Valid) & validateOn" class="invalid-feedback" style="display: block;">
                    Пожалуйста проверьте пароль, они должны совпадать!
                  </div>
                </div>
              </div>
              <div class="checkbox mb-2"></div>
              <button class="w-100 btn btn-lg btn-primary" type="submit" v-on:click.stop="checkForm()">Зарегистрироваться</button>
            </form>
          </div>
          <div v-else class="container">
            <form class="needs-validation" @submit.prevent="" novalidate>
                <div class="col-12 form-floating">
                  <input
                    id="emailSignIn"
                    class="form-control"
                    v-model="emailSignIn"
                    type="emailSignIn"
                    name="emailSignIn"
                    placeholder="YES"
                  >
                  <label for="emailSignIn" class="form-label">Электронная почта</label>
                  <div v-if="(!emailSignIn | !emailSignInValid) & validateOn" class="invalid-feedback" style="display: block;">
                    Пожалуйста введите корректную электронную почту!
                  </div>
                </div>
                <div class="checkbox mb-3">
                </div>
                <div class="col-12 form-floating">
                  <input
                  id="passwordSignIn"
                  class="form-control"
                  v-model="passwordSignIn"
                  type="password"
                  name="passwordSignIn"
                  placeholder="YES"
                  >
                  <label for="passwordSignIn" class="form-label">Пароль</label>
                  <div v-if="(!passwordSignIn | !passwordSignInValid) & validateOn" class="invalid-feedback" style="display: block;">
                    Пожалуйста введите верный пароль!
                  </div>
                </div>
                <div class="checkbox mb-2"></div>
                <button  class="w-100 btn btn-lg btn-primary" type="submit" v-on:click.stop="checkForm();">Войти</button>
            </form>
          </div>

          <div class="checkbox mb-3">
          </div>
          <a v-if="toRegister" @click="toRegister = false; validateOn=false" href="javascript:void(0)">Войти в аккаунт</a>
          <a v-else  @click="toRegister = true; validateOn=false"  href="javascript:void(0)">Зарегистрироваться</a>
          <p class="mt-5 mb-3 text-muted">&copy; Globus-IT 2023</p>
        </form>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
  import {mapActions} from 'vuex'
export default {
  name: 'log-in-menu',
  props: {
    msg: String
  },
  ...mapActions([
      'GET_USER_FROM_API',
      'SET_SIGN_OUT'
      ]),
  data() {
      return {
        toRegister: false,
        errors: [],
        nameUser: null,
        lastName: null,
        email: null,
        emailValid: true,
        emailSignIn: null,
        emailSignInValid: true,
        validateOn: false,

        password1: null,
        password1Valid: true,

        password2: null,
        password2Valid: true,

        passwordSignIn: null,
        passwordSignInValid: true,
      }
  },
  mounted() {
  },
  methods: {
    checkForm: function () {
      this.validateOn = true;
      this.errors = [];
      console.log('FORM VALIDATW: ', this.nameUser, this.validateOn);
      if (this.toRegister) { 
        // Регистрация
        if (!this.validEmail(this.email)) {
          this.emailValid = false;
          this.errors.push(false);
        } else {
          this.emailValid = true;
        }
        if (!this.password1 | !this.password2 | this.password2 != this.password1) {
          this.password1Valid = false;
          this.password2Valid = false;
          this.errors.push(false);
        } else {
          this.password1Valid = true;
          this.password2Valid = true;
        }
      } else {
        // Вход
        if (!this.validEmail(this.emailSignIn)) {
          this.emailSignInValid = false;
          this.errors.push(false);
        } else {
          this.emailSignInValid = true;
        }    
        if (!this.passwordSignIn) {
          this.passwordSignInValid = false;
          this.errors.push(false);
        } else {
          this.passwordSignInValid = true;
        }
      }


      if (this.errors.length == 0) {
        // let user = this.logIn()
        let user =  this.$store.dispatch({
        type: 'GET_USER_FROM_API',
          // myprop: 'msg'
        }).then(function(value){
            console.log(`Из промиса получены данные: ${value}`);
        })
        // let user = this.GET_USER_FROM_API();
        console.log('USEEEEEEEEEEEEEEEEEEEEEER', user);
        alert(user);
        alert('Оплата произведена успешна, продукт(ы) высланы вам на почту!');
        this.$store.state.cart = [];
        this.$router.push({path: '/'});
      }
    },
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
  }
}
</script>
<style scoped>
html,
body {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}

.modal {
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  background-color: rgba(0,0,0,.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.modal div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 300px;
  height: 300px;
  padding: 5px;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>
