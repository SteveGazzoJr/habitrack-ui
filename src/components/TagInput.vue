<template>
  <div class="tag-input">
    <input @keydown.enter="addTag(newTag)" v-model="newTag" type="text" />
    <ul class="tags">
      <li v-for="tag in tags" :key="tag" class="tag">
        {{ tag }}
      </li>
    </ul>
  </div>
</template>
<script>
import { ref } from "vue";
import { useDataStore } from "./stores/dataStore";

export default {
  name: "TagInput",
  setup() {
    const dataStore = ref(useDataStore());
    const tags = ref([]);
    const newTag = ref("");
    const addTag = (tag) => {
      if (tag == "" || tags.value.includes(tag)) {
        newTag.value = "";
        return;
      }
      tags.value.push(tag);
      dataStore.value.setTags(tags);
      newTag.value = ""; // reset newTag
      console.log("dataStore tags from taginuput");
      console.log(dataStore.value.getTags);
    };
    return { tags, newTag, addTag, dataStore };
  },
};
</script>
<style scoped>
ul {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 7px;
  margin: 0;
  padding: 0;
}
.tag {
  background-color: white;
  padding: 5px;
  border-radius: 4px;
  color: black;
  white-space: nowrap;
  border: 1px solid black;
  transition: 0.1s ease background;
}
input {
  width: 90%;
  padding: 10px;
}
</style>
