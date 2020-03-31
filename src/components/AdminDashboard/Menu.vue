<template>
  <div class="admin-dashboard__menu">
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
    <div>
      <button type="button" class="btn btn-primary" @click="scan">SCAN</button>
      <small style="padding:0 5px">{{scanInfo}}</small>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      file: "",
      scanInfo: "Scan all songs in music folder and insert to database"
    };
  },

  methods: {
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
    },
    scan() {
      axios
        .get(process.env.VUE_APP_BASE_API + "/scan", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then(res => {
          this.scanInfo = "Done";
        })
        .catch(err => {
          if (err) this.scanInfo = err.response;
        });
    }
  }
};
</script>