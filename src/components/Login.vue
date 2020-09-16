<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Login</div>
          <div class="card-body">
            <div v-if="user.loggedIn">
              <div v-if="user.loggedIn" class="alert alert-success" role="alert">You are already logged in!</div>
            </div>
            <div v-else>
                <div v-if="error" class="alert alert-danger">{{error}}</div>
                <form action="#" @submit.prevent="submit">
                  <div class="form-group row">
                    <label for="email" class="col-md-4 col-form-label text-md-right">Email</label>

                    <div class="col-md-6">
                      <input
                        id="email"
                        type="email"
                        class="form-control"
                        name="email"
                        value
                        required
                        autofocus
                        v-model="form.email"
                      />
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                    <div class="col-md-6">
                      <input
                        id="password"
                        type="password"
                        class="form-control"
                        name="password"
                        required
                        v-model="form.password"
                      />
                    </div>
                  </div>

                  <div class="form-group row mb-0">
                    <div class="col-md-4 offset-md-4">
                      <button type="submit" class="btn btn-success">Login</button>
                    </div>
                  </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import 'firebase/auth';

export default {
  props:['user'],
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      error: null,
    };
  },
  methods: {
    submit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          data
          this.user.loggedIn = true;
          localStorage.setItem("budBuddyLoginStatus", JSON.stringify(this.user.loggedIn));
          this.emitUserStatus(this.user.loggedIn);
        })
        .catch(err => {
          this.error = err.message;
        });
    },
    emitUserStatus(loggedInStatus){
      this.$emit('catchUserStatus', {
        loggedIn: loggedInStatus
      })
    }
  },
};
</script>