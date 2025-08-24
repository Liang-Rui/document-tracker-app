<template>
  <main>
    <div class="space-y-16 py-16 xl:space-y-20">
      <div>
        <div class="px-4 sm:px-6 lg:px-8">
          <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
              <h1 class="text-base font-semibold leading-6 text-gray-900">
                Documents Expiring Soon
              </h1>
              <p class="mt-2 text-sm text-gray-700">
                A list of documents that will expire within the next 7 days
              </p>
            </div>
          </div>

          <div class="mt-6 flow-root">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div
                class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
              >
                <table class="min-w-full divide-y divide-gray-300">
                  <thead class="text-left">
                    <tr>
                      <th>Name</th>
                      <th>Expire Date</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200">
                    <tr v-for="(doc, index) in expiringDocs" :key="index">
                      <td>{{ doc.name }}</td>
                      <td>{{ dateToLocalString(doc.expires_at) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="sm:flex sm:items-center mt-8">
            <div class="sm:flex-auto">
              <h1 class="text-base font-semibold leading-6 text-gray-900">
                Documents
              </h1>
              <p class="mt-2 text-sm text-gray-700">
                A list of documents
              </p>
            </div>
          </div>

          <div class="mt-6 flow-root">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div
                class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
              >
                <table class="min-w-full divide-y divide-gray-300">
                  <thead class="text-left">
                    <tr>
                      <th>Name</th>
                      <th>Expire Date</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200">
                    <tr v-for="(doc, index) in listedDocs" :key="index">
                      <td>{{ doc.name }}</td>
                      <td>{{ dateToLocalString(doc.expires_at) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="sm:flex sm:items-center mt-8">
            <div class="sm:flex-auto">
              <h1 class="text-base font-semibold leading-6 text-gray-900">
                Expired Documents
              </h1>
              <p class="mt-2 text-sm text-gray-700">
                A list of documents expired
              </p>
            </div>
          </div>

          <div class="mt-6 flow-root">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div
                class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
              >
                <table class="min-w-full divide-y divide-gray-300">
                  <thead class="text-left">
                    <tr>
                      <th>Name</th>
                      <th>Expire Date</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200">
                    <tr v-for="(doc, index) in expiredDocs" :key="index">
                      <td>{{ doc.name }}</td>
                      <td>{{ dateToLocalString(doc.expires_at) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';
import { documentsClient } from '../client';
import { dateToLocalString } from '../utils/dateToLocalString';
import type { Document } from '../client';

const EXPIRE_SOON_TIME = 7 * 24 * 60 * 60 * 1000

const documents = ref<Document[]>([])

const expiringDocs = computed((): Document[] => {
  return documents.value.filter(d =>  {
    const timeDiff = new Date(d.expires_at).getTime() - new Date().getTime()
    return timeDiff > 0 && timeDiff <= EXPIRE_SOON_TIME
  })
})

const expiredDocs = computed((): Document[] => {
  return documents.value.filter(d =>  {
    const timeDiff = new Date(d.expires_at).getTime() - new Date().getTime()
    return timeDiff < 0 
  })
})

const listedDocs = computed((): Document[] => {
  return documents.value.filter(d =>  {
    const timeDiff = new Date(d.expires_at).getTime() - new Date().getTime()
    return timeDiff > EXPIRE_SOON_TIME 
  })
})



onBeforeMount(async () => {
  const { data } = await documentsClient.getDocuments()

  documents.value = data.data ?? []
})
</script>
<style scoped>
td,th {
  @apply py-2;
}
</style>
