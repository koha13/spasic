<template>
  <div class="profile container">
    <div class="row">
      <h1 class="title">Profile</h1>
    </div>
    <p>Name: {{this.$store.state.user_store.username}}</p>
    <p>Role: {{this.$store.state.user_store.role}}</p>
    <button type="button" class="btn btn-primary" @click="logout">Logout</button>
  </div>
</template>
<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push({ name: "login" });
    }
  }
};
</script>
<style scoped>
.profile {
  margin-top: 80px;
  margin-bottom: 80px;
  color: var(--color-text);
}
.title {
  font-weight: bold;
  font-size: 20px;
  padding: 10px 0;
}
button {
  margin: 10px 0;
}
</style>