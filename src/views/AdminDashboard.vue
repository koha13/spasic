<template>
  <div class="admin-dashboard container">
    <Menu />
    <TableContent />
  </div>
</template>
<script>
import Menu from "@/components/AdminDashboard/Menu";
import TableContent from "@/components/AdminDashboard/TableContent";
export default {
  components: {
    Menu,
    TableContent
  }
};
</script>
<style scoped>
.admin-dashboard {
  margin-top: 85px;
  max-width: 70%;
  margin-bottom: 80px;
  color: var(--color-text);
}
@media only screen and (max-width: 768px) {
  .admin-dashboard {
    max-width: 100%;
  }
}
</style>
