<template>
  <div class="profile container">
    <div class="row">
      <h1 class="title">Profile</h1>
    </div>
    <p>Name: {{ this.$store.state.user_store.username }}</p>
    <p>Role: {{ this.$store.state.user_store.role }}</p>
    <button type="button" class="btn btn-primary" @click="logout">Logout</button>
    <div>
      Upload song:
      <input
        type="file"
        accept=".mp3"
        id="file"
        ref="file"
        v-on:change="handleFileUpload()"
      />
      <button type="button" class="btn btn-primary" @click="submit">Submit</button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push({ name: "login" });
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    submit() {
      let formData = new FormData();
      formData.append("file", this.file);
      axios
        .post(process.env.VUE_APP_BASE_API + "/song/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then(res => {
          this.$notify({
            group: "foo",
            title: "Upload song",
            text: res.data.name + " is uploaded",
            duration: 3000
          });
        })
        .catch(err => {
          this.$notify({
            group: "foo",
            title: "Upload song",
            text: err.response.data,
            duration: 3000
          });
        });
    }
  },
  data() {
    return {
      file: ""
    };
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
