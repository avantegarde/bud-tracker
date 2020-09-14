<template>
  <div class="journal-item morph rounded">
    <h1 class="title">{{ crop.name }}</h1>
    <div v-if="crop.harvested === 'yes'">
      <h5><b-icon-check></b-icon-check> Harvested!</h5>
      <p><strong>Age:</strong> {{ getFinalAge(crop.startDate, crop.harvestDate, 'weeks') }}</p>
      <p><strong>FD:</strong> {{ getFinalAge(crop.startDate, crop.harvestDate, 'days') }}</p>
      <p><strong>Total Weight:</strong> {{ crop.totalWeight }}g</p>
    </div>
    <div v-else>
      <p><strong>Age:</strong> {{ getDisplayAge(crop.startDate, 'weeks') }}</p>
      <p><strong>FD:</strong> {{ getDisplayAge(crop.startDate, 'days') }}</p>
    </div>

    <div>
      <b-button v-b-modal="crop.id" :crop="crop" ><b-icon-file-text></b-icon-file-text></b-button>
      <modal-edit-crop :crop="crop" />
      <!-- <b-button variant="danger" v-b-modal="crop.id"><b-icon-trash></b-icon-trash></b-button> -->
      <!-- <modal-delete-crop :crop="crop" /> -->
    </div>
  </div>
</template>

<script>
//import ModalDeleteCrop from '@/components/ModalDeleteCrop.vue'
import ModalEditCrop from '@/components/ModalEditCrop.vue'

export default {
  props: ['crop', 'index'],
  methods: {
    getDisplayAge(d, format){
      var currDay = this.$moment(new Date());
      var date = this.$moment(d);
      var display = '';
      if(format === 'days') {
        display = currDay.diff(date, 'days');
      } else if (format === 'weeks') {
        display = currDay.diff(date, 'weeks', true);
        display = Math.floor(currDay.diff(date, 'weeks')) + " weeks, " + currDay.diff(date, 'days')%7 + " days";
      } else {
        display = currDay.diff(date, 'days');
      }
      return display;
    },
    getFinalAge(start, end, format){
      var startDate = this.$moment(start);
      var endDate = this.$moment(end);
      var display = '';
      if(format === 'days') {
        display = endDate.diff(startDate, 'days');
      } else if (format === 'weeks') {
        display = endDate.diff(startDate, 'weeks', true);
        display = Math.floor(endDate.diff(startDate, 'weeks')) + " weeks, " + endDate.diff(startDate, 'days')%7 + " days";
      } else {
        display = endDate.diff(startDate, 'days');
      }
      return display;
    },
  },
  components: {
    //ModalDeleteCrop,
    ModalEditCrop
  }
}
</script>
<style scoped>
.journal-item > a {
  display: block;
}
.journal-item .title {
  display: block;
  width: 100%;
  font-size: 20px;
  line-height: 22px;
}
</style>