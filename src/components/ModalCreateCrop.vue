<template>
  <div>
    <b-modal id="add-crop" title="Add a New Crop" hide-footer>
      <form @submit.prevent="addCrop(name, startDate, flowerWeeks, notes)">
        <label>Name:</label>
        <input type="text" v-model="name" placeholder="Strain Name" class="input" required>
        <br>
        <label>Start Date:</label>
        <input type="date" v-model="startDate" placeholder="startDate" class="input" required>
        <br>
        <label>Est. Weeks:</label>
        <input type="number" v-model="flowerWeeks" placeholder="# Flower Weeks" class="input" required>
        <hr>
        <h5>Notes:</h5>
        <input type="date" v-model="notes.date" placeholder="Note Date" class="input">
        <br>
        <textarea v-model="notes.note" placeholder="Notes" class="input"></textarea>
        <hr>
        <b-button type="submit" variant="success">Add New Crop</b-button>
      </form>
    </b-modal>
  </div>
</template>
<script>
import { db } from '@/util/./db'

export default {
  data () {
    return {
      name: '',
      startDate: '',
      flowerWeeks: '',
      harvested: '',
      totalWeight: '',
      totalDays: '',
      notes: {
        date: this.today(),
        note: ''
      },
    }
  },
  methods: {
    addCrop (name, startDate, flowerWeeks, notes) {
      const createdAt = new Date()
      let doc = {
        createdAt: createdAt,
        name: name,
        startDate: startDate,
        flowerWeeks: flowerWeeks,
        notes: notes.note?[notes]:[],
        harvested: 'false',
        harvestDate: '',
        totalWeight: '',
      }
      db.collection("crops").add(doc).then(() => {
        // Clear form values
        this.name = ''
        this.startDate = ''
        this.flowerWeeks = ''
        this.harvested = ''
        this.totalWeight = ''
        this.totalDays = ''
        this.notes = {
          date: this.today(),
          note: ''
        }
        console.log("Document successfully written!");
        this.hideModal('add-crop');
      }).catch((error) => {
        console.error("Error writing document: ", error);
      });
    },
    today(){
      var today = new Date();
      var date = today.getFullYear()+'-'+("0" + (today.getMonth() + 1)).slice(-2)+'-'+("0" + today.getDate()).slice(-2);
      return date;
    },
    showModal(id) {
      this.$bvModal.show(id);
    },
    hideModal(id) {
      this.$bvModal.hide(id);
    },
  }
}
</script>