<template>
  <div id="app">
    <Nav :user="user" />
    <div v-if="user.loggedIn">
      <div v-if="crops" class="justify-content-center journal-list">
          <crop-item v-for="(crop, index) in crops" v-bind:crop="crop" v-bind:index="index" :key="crop.id"></crop-item>
          <!-- START: Add Crop Modal --->
          <div class="journal-item morph rounded">
            <button class="text-icon new-crop" v-b-modal.add-crop>
              <span class="plus">+</span>
              <span class="text">New Crop</span>
            </button>
            <modal-create-crop />
          </div>
          <!-- END: Add Crop Modal --->
      </div>
      <div v-else class="journal-list loading">
        Loading...
      </div>
    </div>
    <div v-else class="journal-list loading">
      <Login :user="user" />
    </div>
    
  </div>
</template>

<script>
//import _ from 'lodash';
import Nav from '@/components/Nav.vue'
import Login from '@/components/Login.vue'
import CropItem from '@/components/CropItem.vue'
import ModalCreateCrop from '@/components/ModalCreateCrop.vue'
import { db } from '@/util/./db'

export default {
  name: 'App',
  data() {
    return {
      user: {
        loggedIn: false,
        data: null
      },
      crops: [],
    }
  },
  firestore: {
    crops: db.collection('crops').orderBy('startDate', 'desc')
  },
  /*computed: {
    orderedCrops: function () {
      return _.orderBy(this.crops, 'startDate', 'desc')
    }
  },*/
  mounted: function(){
    this.user.loggedIn = (localStorage.getItem("budBuddyLoginStatus") === 'true');
  },
  methods: {
    catchUserStatus(userStatus){
      this.user.loggedIn = userStatus;
    },
  },
  components: {
    Nav,
    Login,
    CropItem,
    ModalCreateCrop
  }
}
</script>
