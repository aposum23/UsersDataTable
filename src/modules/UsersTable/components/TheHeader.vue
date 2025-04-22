<script setup lang="ts">

</script>

<template>
  <div class="header">
    <h2>Учетные записи</h2>
    <Button
        class="header__button"
        icon="pi pi-plus"
        outlined
    />
  </div>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  flex-direction: row;
  gap: 15px;
  align-items: center;

  &__button {
    width: 30px;
    height: 30px;
  }
}
</style>