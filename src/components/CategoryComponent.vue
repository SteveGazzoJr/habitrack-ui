<script>
export default {
  name: "CategoryComponent",
  props: ["category"],
};
</script>
<template>
  <span class="category">{{ category }}</span>
</template>
<style>
.category {
  background-color: white;
  padding: 5px;
  border-radius: 4px;
  color: black;
  white-space: nowrap;
  border: 1px solid black;
  transition: 0.1s ease;
  margin-right: 5px;
  padding-bottom: 5px;
}
</style>
