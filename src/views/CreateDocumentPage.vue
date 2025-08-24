<template>
  <div class="space-y-4">
    <form @submit.prevent="onUpload" class="space-y-4">
      <div>
        <label>Document</label>
        <input type="file" required @change="onChooseFile"/>
      </div>

      <div>
        <label>Expire date</label>
        <input type="date" required v-model="expireDate" :min="new Date().toLocaleDateString('en-CA')"/>
      </div>

      <div class="w-48">
        <button type="submit" 
          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-400"
          :disabled="loading || !document || !expireDate"
          >Upload documents</button>
      </div>
    </form>
    <div>
      <p class="text-red-500 -mt-2">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { documentsClient } from '../client';
const document = ref<File | null>(null)
const expireDate = ref()
const errorMessage = ref<string>()
const loading = ref<boolean>(false)

const onChooseFile = (e: Event) => {
  errorMessage.value = ''
  const input = e.target as HTMLInputElement
  document.value = input.files?.[0] ?? null
}

const onUpload = async () => {
  errorMessage.value = ''
  loading.value = false

  if (!document.value) {
    errorMessage.value = 'Please choose a document'
    return
  }

  if (!expireDate.value) {
    errorMessage.value = 'Please select an expiry date'
    return
  }

  const form = new FormData()
  form.append('document', document.value)
  form.append('expires_at', expireDate.value)

  try {
    loading.value = true
    await documentsClient.createDocument(form)

    // TODO: Improve success state using a modal
    alert('Upload success!')
  } catch (e) {
    errorMessage.value = 'Failed to upload the document, please contact our customer support.'
  } finally {
    loading.value = false
  }
}
</script>
<style scoped>
label {
  @apply block mb-1 font-bold text-gray-500;
}

</style>
