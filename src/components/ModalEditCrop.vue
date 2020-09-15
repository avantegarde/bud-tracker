<template>
  <div>
    <b-modal :id="crop.id" title="Edit Crop" scrollable hide-footer>
      <b-alert :show="alertSuccess" variant="success" @dismissed="alertSuccess=0" @dismiss-count-down="successCountDown" fade>
      Changes Saved.
      </b-alert>
      <b-alert :show="alertError" variant="danger" @dismissed="alertError=0" @dismiss-count-down="errorCountDown" fade>
      Error saving crop.
      </b-alert>

      <form @submit.prevent="editCrop(crop.id, name, startDate, flowerWeeks, harvested, harvestDate, totalWeight)">
        <label>Name:</label>
        <input type="text" v-model="name" placeholder="Strain Name" class="input" required>
        <br>
        <label>Start Date:</label>
        <input type="date" v-model="startDate" placeholder="startDate" class="input" required>
        <br>
        <label>Est. Weeks:</label>
        <input type="number" v-model="flowerWeeks" placeholder="# Flower Weeks" class="input" required>
        <br>
        <label>Harvested:</label>
        <b-form-radio-group inline v-model="harvested" name="harvested" class="harvested-radio">
          <b-form-radio value="yes">Yes</b-form-radio>
          <b-form-radio value="no">No</b-form-radio>
        </b-form-radio-group>
        <br>
        <b-form-group v-if="harvested === 'yes'">
          <label>Harvest Date:</label>
          <input type="date" v-model="harvestDate" placeholder="harvestDate" class="input">
          <br>
          <label>Total Weight:</label>
          <input type="number" v-model="totalWeight" placeholder="Total Weight" class="input">
        </b-form-group>
        <b-button type="submit" class="button">Save</b-button>
      </form>
      <hr>

      <div class="notes" v-if="crop.notes">
        <h4>Notes:</h4>
        <div v-for="(note, index) in crop.notes" :key="index" class="note">
          <h6 class="date">{{note.date}}</h6>
          <div class="content">
            {{note.note}}
          </div>
        </div>
        <hr>
        <b-button v-b-toggle.new-note>
          <span class="when-opened">Close</span> <span class="when-closed">Add</span> New Note
        </b-button>
        <b-collapse id="new-note">
          <!-- Content here -->
          <form @submit.prevent="addNote(crop.id, crop.notes, newNote)">
            <input type="date" v-model="newNote.date" placeholder="Note Date" class="input" required>
            <br>
            <textarea v-model="newNote.note" placeholder="Notes" class="input" required></textarea>
            <br>
            <b-button type="submit" variant="success">Add Note</b-button>
          </form>
        </b-collapse>
      </div>
      <hr>
      <div>
        <b-button v-b-toggle.delete-crop>
          <span class="when-opened">Cancel</span> <span class="when-closed"><b-icon-trash></b-icon-trash></span>
        </b-button>
        <b-collapse id="delete-crop">
          <p>Are you sure you want to delete the crop: <strong>"{{crop.name}}"</strong>?</p>
          <b-button variant="danger" @click="deleteCrop(crop.id)">Delete Crop</b-button>
        </b-collapse>
      </div>
    </b-modal>
  </div>
</template>
<script>
import { db } from '@/util/./db'

export default {
  props: ['crop'],
  data () {
    return {
      name: this.crop.name,
      startDate: this.crop.startDate,
      harvestDate: this.crop.harvestDate?this.crop.harvestDate:'',
      flowerWeeks: this.crop.flowerWeeks?this.crop.flowerWeeks:'',
      harvested: this.crop.harvested?this.crop.harvested:'no',
      totalWeight: this.crop.totalWeight?this.crop.totalWeight:'',
      newNote: {
        date: this.today(),
        note: ''
      },
      alertSuccess: 0,
      alertError: 0,
      dismissSecs: 3,
      dismissCountDown: 0
    }
  },
  methods: {
    editCrop(id, name, startDate, flowerWeeks, harvested, harvestDate, totalWeight) {
      let data = {
        name: name,
        startDate: startDate,
        flowerWeeks: flowerWeeks,
        harvested: harvested,
        harvestDate: harvestDate,
        totalWeight: totalWeight,
      }
      db.collection("crops").doc(id).set(data, { merge: true }).then(() => {
        //console.log("Document successfully written!");
        this.showSuccessAlert();
      }).catch((error) => {
        //console.error("Error writing document: ", error);
        this.showErrorAlert(error);
      });
    },
    addNote (id, notes, newNote) {
      notes.push(newNote)
      let data = {
        notes: notes
      }
      db.collection("crops").doc(id).set(data, { merge: true }).then(() => {
        // Clear form values
        this.newNote.note = ''
        console.log("Document successfully written!");
      }).catch((error) => {
        console.error("Error writing document: ", error);
      });
    },
    today(){
      var today = new Date();
      var date = today.getFullYear()+'-'+("0" + (today.getMonth() + 1)).slice(-2)+'-'+("0" + today.getDate()).slice(-2);
      return date;
    },
    deleteCrop (id) {
      db.collection("crops").doc(id).delete().then(() => {
          console.log("Document successfully deleted!");
          this.hideModal(id);
      }).catch(function(error) {
          console.error("Error removing document: ", error);
      });
    },
    showModal(id) {
      this.$bvModal.show(id);
    },
    hideModal(id) {
      this.$bvModal.hide(id);
    },
    successCountDown(alertSuccess) {
      this.alertSuccess = alertSuccess
    },
    showSuccessAlert() {
      this.alertSuccess = this.dismissSecs
    },
    errorCountDown(alertError) {
      this.alertError = alertError
    },
    showErrorAlert() {
      this.alertError = this.dismissSecs
    }
  }
}
</script>
<style scoped>
.collapsed > .when-opened,
:not(.collapsed) > .when-closed {
  display: none;
}
</style>