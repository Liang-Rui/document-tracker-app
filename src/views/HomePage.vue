<template>
  <main>
    <div class="space-y-16 py-16 xl:space-y-20">
      <div>
        <div class="px-4 sm:px-6 lg:px-8 space-y-12">
          <DocumentTable
            title="Documents Expiring Soon"
            description="Documents will be expiring within the next 7 days"
            :documents="expiringDocs"
          />

          <DocumentTable
            title="Documents"
            :documents="listedDocs"
          />

          <DocumentTable
            title="Expired Documents"
            :documents="expiredDocs"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';
import { documentsClient } from '../client';
import type { Document } from '../client';
import DocumentTable from '../components/DocumentTable.vue';

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
