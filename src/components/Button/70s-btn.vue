<template>
  <div class="button">
    <div class="icon">
      <i class="fa fa-floppy-o"></i>
    </div>
  </div>
</template>
<style scoped>
.button {
  font-size: 1.5rem;
  border: 2px solid white;
  border-radius: 100px;
  width: 40px;
  height: 40px;
  padding: 5px;
  margin: 10% auto;
  transition: 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.icon {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
}

.button:hover {
  width: 125px;
  background-color: white;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2);
  color: blue;
  transition: 0.3s;
}

.button:active {
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  transition: 0.05s;
}
</style>