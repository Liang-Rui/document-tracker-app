<template>
  <div v-if="document" class="font-bold space-y-3 text-xl text-gray-600">
    <h1>Document Id: {{ document?.id }}</h1>
    <h1>Document Name: {{ document?.name }}</h1>
    <h1>Document Expired At: {{ document?.expires_at && dateToLocalString(document.expires_at) }}</h1>
  </div>
  <div v-else class="font-bold space-y-3 text-xl text-orange-600">
    {{ errorMessage }}
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
import { documentsClient } from '../client';
import { type Document } from '../client';
import { dateToLocalString } from '../utils/dateToLocalString';

const props = defineProps<{ documentId: string }>();

const document = ref<Document>()
const errorMessage = ref()

onBeforeMount(async () => {
  try {
    const { data } = await documentsClient.getDocument(Number(props.documentId))
    if (!data.data) return

    document.value = data.data
  } catch (e) {
    errorMessage.value = 'Document not found, please contact our customer support.'
  }
})
</script>
