<template>
  <div>

    <px-header />

    <router-view/>
    
  </div>
</template>

<script>
import PxHeader from '@/components/PxHeader'
import {mapActions,mapGetters} from 'vuex';

export default {

  components: { PxHeader },

  methods: {
    ...mapActions(["leerToken"]),
  },
  computed:{
    ...mapGetters(['isActive']),
  },
  created(){
    this.leerToken();
  }
}
</script>