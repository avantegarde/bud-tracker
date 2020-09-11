<template>
  <div id="app">
    <Nav />
    <div v-if="crops" class="row justify-content-center journal-list">
        <crop-item v-for="(crop, index) in crops" v-bind:crop="crop" v-bind:index="index" :key="index"></crop-item>
        <!-- START: Add Crop Modal --->
        <div class="journal-item">
          <button class="text-icon new-crop morph rounded" v-b-modal.add-crop>+ <span>New Crop</span></button>
          <modal-create-crop />
        </div>
        <!-- END: Add Crop Modal --->
    </div>
    <div v-else class="journal-list loading">
      Loading...
    </div>
    
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'
import CropItem from '@/components/CropItem.vue'
import ModalCreateCrop from '@/components/ModalCreateCrop.vue'
import { db } from '@/util/./db'

export default {
  name: 'App',
  data() {
    return {
      crops: [],
    }
  },
  firestore: {
    crops: db.collection('crops'),
  },
  components: {
    Nav,
    CropItem,
    ModalCreateCrop
  }
}
</script>
