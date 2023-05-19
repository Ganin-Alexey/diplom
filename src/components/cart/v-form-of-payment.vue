<template scope>  
<div class="container">
    <div class="row g-5">
      <div class="col-md-5 col-lg-4 order-md-last">
        <VCart></VCart>
      </div>

      <div class="col-md-7 col-lg-8">
        <h4 class="mb-3">Данные для отправки ключа(ей)</h4>
        <form class="needs-validation" @submit.prevent="" novalidate>
          <div class="row g-3">
            <div class="col-sm-6">
              <label for="nameUser" class="form-label">Имя</label>
              <input
                id="nameUser"
                v-model="nameUser"
                class="form-control"
                placeholder="Ваше имя"
                required
                type="text"
                name="nameUser"
              >
              <div v-if="!nameUser & validateOn" class="invalid-feedback" style="display: block;">
                Имя обязательна для ввода!
              </div>
            </div>

            <div class="col-sm-6">
              <label for="lastName" class="form-label">Фамилия</label>
              <input
                id="lastName"
                v-model="lastName"
                class="form-control"
                placeholder="Ваша фамилия"
                required
                type="text"
                name="lastName"
              >
              <div v-if="!lastName & validateOn" class="invalid-feedback" style="display: block;">
                Фамилия обязательна для ввода!
              </div>
            </div>

            <div class="col-12">
              <label for="email" class="form-label">Электронная почта</label>
              <input
                id="email"
                class="form-control"
                v-model="email"
                type="email"
                name="email"
                placeholder="you@mail.ru"
              >
              <div v-if="(!email | !emailValid) & validateOn" class="invalid-feedback" style="display: block;">
                Пожалуйста введите корректную электронную почту!
              </div>
            </div>
          </div>


          <hr class="my-4">

          <h4 class="mb-3">Оплата</h4>

          <div class="row gy-3">
            <div class="col-md-6">
              <label for="cardNumber" class="form-label">Номер карты</label>
              <input
                id="cardNumber"
                class="form-control"
                v-model="cardNumber"
                type="text"
                name="cardNumber"
                required
                placeholder="Ваш номер карты"
            >
              <div v-if="(!cardNumber | !cardNumberValid) & validateOn" class="invalid-feedback" style="display: block;">
                Некорректный Номер карты!
              </div>
            </div>

            <div class="col-md-3">
              <label for="cc-expiration" class="form-label">Дата окончания</label>
              <!-- <input type="text" class="form-control" id="cc-expiration" placeholder="" required> -->
              <VueDatePicker v-model="cardDate" :min-date="new Date()" locale="ru" month-picker></VueDatePicker>
              <div v-if="!cardDate & validateOn" class="invalid-feedback" style="display: block;">
                Некорректная дата окончания действия карты!
              </div>
            </div>

            <div class="col-md-3">
              <label for="cardCVV" class="form-label">CVV-код</label>
              <input
                id="cardCVV"
                v-model="cardCVV"
                class="form-control"
                placeholder="CVV-код на обратной стороне карты"
                required
                type="text"
                name="cardCVV"
              >
              <div v-if="(!cardCVV | !cardCVVValid) & validateOn" class="invalid-feedback" style="display: block;">
                Некорректный CVV-код на обратной стороне карты!
              </div>
            </div>
          </div>

          <hr class="my-4">

          <button v-on:click.stop="checkForm()" class="w-100 btn btn-primary btn-lg" type="submit">Оплатить</button>
        </form>
      </div>
    </div>
   
  <footer class="my-5 pt-5 text-muted text-center text-small">
    <p class="mb-1">&copy; 2023 Globus-IT</p>
  </footer>
</div>


</template>
<script>
  import VueDatePicker from '@vuepic/vue-datepicker';
import VCart from './v-cart.vue';
  export default {
    name: "v-form-of-payment",
    components: {
      VueDatePicker,
      VCart,
    },
    props: {
      cart_item_data: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        errors: [],
        nameUser: null,
        lastName: null,
        email: null,
        movie: null,
        cardCVV: null,
        cardDate: {
          month: new Date().getMonth(),
          year: new Date().getFullYear()
        },
        cardNumber: null,
        cardFullName: null,
        emailValid: true,
        cardNumberValid: true,
        cardCVVValid: true,
        validateOn: false,

      }
    },
    computed: {},
    async created () {
      console.log('FORM URL', this.$route);
    },
    methods: {
    checkForm: function () {
      this.validateOn = true;
      this.errors = [];
      console.log('FORM VALIDATW: ', this.nameUser, this.validateOn);
      if (!this.validEmail(this.email)) {
        this.emailValid = false;
        this.errors.push(false);
      } else {
        this.emailValid = true;
      }
      if (!this.validCreditCard(this.cardNumber)) {
        this.cardNumberValid = false;
        this.errors.push(false);
      } else {
        this.cardNumberValid = true;
      }
      if (!this.validCardCVV(this.cardCVV)) {
        this.cardCVVValid = false;
        this.errors.push(false);
      } else {
        this.cardCVVValid = true;
      }

      if (this.errors.length == 0) {
        alert('Оплата произведена успешна, продукт(ы) высланы вам на почту!');
        this.$store.state.cart = [];
        this.$router.push({path: '/'});
      }
    },
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validCreditCard: function (cardNumber) {
      var re = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;  
      return re.test(cardNumber);
    },
    validCardCVV: function (cardCVV) {
      var re = /^[0-9]{3,4}$/;  
      return re.test(cardCVV);
    }
  }
}
</script>

<style lang="scss">
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}
.container {
  max-width: 960px;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
</style>
