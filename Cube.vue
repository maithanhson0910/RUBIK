<template>
  <div class="cube">
    <div class="face front"></div>
    <div class="face back"></div>
    <div class="face right"></div>
    <div class="face left"></div>
    <div class="face top"></div>
    <div class="face bottom"></div>
  </div>
</template>

<script>
export default {
  name: 'Cube',
};
</script>

<style scoped>
.cube {
    position: relative;
    width: 200px;
    height: 200px;
    transform-style: preserve-3d;
    transform: rotateX(-30deg) rotateY(-45deg);
    animation: rotate 10s infinite linear;
}

.face {
    position: absolute;
    width: 200px;
    height: 200px;
    background-color: rgba(255, 255, 255, 0.9);
    border: 2px solid #000;
    opacity: 0.9;
}

.front  { transform: rotateY(  0deg) translateZ(100px); }
.back   { transform: rotateY(180deg) translateZ(100px); }
.right  { transform: rotateY( 90deg) translateZ(100px); }
.left   { transform: rotateY(-90deg) translateZ(100px); }
.top    { transform: rotateX( 90deg) translateZ(100px); }
.bottom { transform: rotateX(-90deg) translateZ(100px); }

@keyframes rotate {
    from { transform: rotateX(-30deg) rotateY(-45deg); }
    to { transform: rotateX(-30deg) rotateY(315deg); }
}
</style>
