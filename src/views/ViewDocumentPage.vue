<template>
  <div class="font-bold space-y-3 text-xl text-gray-600">
    <h1>Document Id: {{ document?.id }}</h1>
    <h1>Document Name: {{ document?.name }}</h1>
    <h1>Document Expired At: {{ document?.expires_at && dateToLocalString(document.expires_at) }}</h1>
    <button class="w-64 flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-400" @click="onArchiveDocument">Archive Document</button>
    <div v-if="errorMessage" class="font-bold space-y-3 text-xl text-orange-600">
      {{ errorMessage }}
    </div>
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

const onArchiveDocument = async () => {
  try {
    if (!document.value) return

    await documentsClient.archiveDocument(document.value.id)

    // TODO: use modal to confirm archive success
    alert('Archive success!')
  } catch (e) {
    errorMessage.value = "Something went wrong, please contact our customer support."
  }
}

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
