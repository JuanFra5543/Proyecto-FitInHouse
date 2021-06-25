<template>
  <div class="p-10">
    <div class="grid grid-cols-2 grid-rows-2 gap-2">
      <menuComponent class="row-start-1 row-end-3" />
      <planAlimComponent />
      <consejosComponent />
    </div>
  </div>
</template>

<script>
import MenuComponent from '@/components/MenuComponent'
import PlanAlimComponent from '@/components/PlanAlimComponent'
import ConsejosComponent from '@/components/ConsejosComponent'

export default {
  components: { MenuComponent, PlanAlimComponent, ConsejosComponent },
}
</script>
