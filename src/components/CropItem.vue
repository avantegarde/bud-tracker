<template>
  <div class="journal-item morph rounded">
    <h1 class="title">{{ crop.name }}</h1>
    <p><strong>Age:</strong> {{ getDisplayAge(crop.startDate, 'weeks') }}</p>
    <p><strong>FD:</strong> {{ getDisplayAge(crop.startDate, 'days') }}</p>

    <div>
      <b-button variant="danger" v-b-modal="crop.id"><b-icon-trash></b-icon-trash></b-button>
      <b-button variant="success"><b-icon-check></b-icon-check></b-button>
      <b-button><b-icon-file-text></b-icon-file-text></b-button>
      <modal-delete-crop :crop="crop" />
    </div>
    
    <!-- <h1>Shiskaberry #2</h1>
    <p><strong>Age:</strong> {{ getDisplayAge('2020-07-17', 'weeks') }}</p>
    <p><strong>FD:</strong> {{ getDisplayAge('2020-07-17', 'days') }}</p> -->
  </div>
</template>

<script>
import ModalDeleteCrop from '@/components/ModalDeleteCrop.vue'

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
  },
  components: {
    ModalDeleteCrop
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