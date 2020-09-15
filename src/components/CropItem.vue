<template>
  <div class="journal-item morph rounded" :class="crop.harvested?'harvested':''">
    <h1 class="title">{{ crop.name }}</h1>
    <div v-if="crop.harvested === 'yes'">
      <h5 class="harvested"><b-icon-check></b-icon-check> Harvested!</h5>
      <ul>
        <li><strong>Age:</strong> {{ getFinalAge(crop.startDate, crop.harvestDate, 'weeks') }}</li>
        <li><strong>FD:</strong> {{ getFinalAge(crop.startDate, crop.harvestDate, 'days') }}</li>
        <li><strong>Total Weight:</strong> {{ crop.totalWeight }}g</li>
      </ul>
    </div>
    <div v-else>
      <ul>
        <li><strong>Age:</strong> {{ getDisplayAge(crop.startDate, 'weeks') }}</li>
        <li><strong>FD:</strong> {{ getDisplayAge(crop.startDate, 'days') }}</li>
      </ul>
    </div>

    <div class="edit-crop-wrap">
      <b-button v-b-modal="crop.id" :crop="crop" class="edit-crop morph inset" ><b-icon-file-text></b-icon-file-text></b-button>
      <modal-edit-crop :crop="crop" />
    </div>
  </div>
</template>

<script>
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
    ModalEditCrop
  }
}
</script>