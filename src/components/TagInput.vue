<template>
  <div class="tag-input">
    <input @keydown.enter="addTag(newTag)" v-model="newTag" type="text" />
    <ul class="tags">
      <li v-for="tag in tags" :key="tag" class="tag" @click="clearTag(tag)">
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
    const tagBoxValue = ref("");
    const addTag = (tag) => {
      let isBadTag = false;
      if (tag == "") {
        isBadTag = true;
      }
      if (tags.value != null && tags.value.includes(tag)) {
        isBadTag = true;
      }
      if (isBadTag) {
        tagBoxValue.value = "";
        return;
      }
      tags.value.push(tag);
      dataStore.value.setTags(tags);
      tagBoxValue.value = ""; // reset newTag
    };
    const clearTag = (tag) => {
      tags.value = tags.value.filter((e) => {
        console.log(e);
        console.log(e !== tag);
        return e !== tag;
      });
      console.log(tags.value.length);
      dataStore.value.setTags(tags);
    };
    return { tags, newTag: tagBoxValue, addTag, dataStore, clearTag };
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
