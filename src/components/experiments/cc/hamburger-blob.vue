<template>
  <div class="hamburger-blob">
    <span class="hamburger-blob_line"></span>
    <span class="hamburger-blob_line"></span>
    <span class="hamburger-blob_line"></span>
  </div>
</template>

<script>
export default {
  name: 'Test'
}
</script>

<style scoped lang="scss">
$className: '.hamburger-blob';
$dimensions: 100px;
$heightModifier: 10;
$spacing: 25px;

#{$className} {
  position: relative;
  width: $dimensions;
  height: $dimensions;
  background-color: white;
  margin: auto;

  &_line {
    position: absolute;
    top: 0;
    left:0;
    right:0;
    bottom: 0;
    display: block;
    width: $dimensions;
    height: $dimensions/$heightModifier;
    margin: auto;
    background-color: black;

    &:nth-child(1) {
      transform: translateY(-$spacing);
    }

    &:nth-child(2) {
      
    }

    &:nth-child(3) {
     transform: translateY($spacing); 
    }
  }
}
</style>
