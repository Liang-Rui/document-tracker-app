<template>
    <div>
        <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
                <h1 class="text-xl font-semibold leading-6 text-gray-500">
                {{ title }}
                </h1>
                <p class="mt-2 text-sm text-gray-700">
                {{ description }}
                </p>
            </div>
        </div>

        <div class="mt-2 flow-root">
            <div class="-my-2 overflow-x-auto lg:-mx-8">
                <div
                class="inline-block min-w-full py-2 align-middle lg:px-8"
                >
                <table class="min-w-full divide-y divide-gray-300 text-left">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th class="text-right">Expire Date</th>
                        <th class="text-right" v-if="archivedTable">Archived Date</th>
                    </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                    <tr v-for="(doc, index) in documents" :key="index" class="hover:bg-gray-100 cursor-pointer" @click="onRetrieveDocument(doc)">
                        <td>
                            {{ doc.name }}
                        </td>
                        <td class="text-right">
                            {{ dateToLocalString(doc.expires_at) }}
                        </td>
                        <td class="text-right" v-if="archivedTable">
                            {{ doc.archived_at && dateToLocalString(doc.archived_at) }}
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { dateToLocalString } from '../utils/dateToLocalString';
import { type Document } from '../client';
import { router } from '../router';

defineProps<{
    title: string
    description?: string
    documents: Document[]
    archivedTable?: boolean
}>()

const onRetrieveDocument = async (document: Document) => {
    router.push(`documents/${document.id}`)
}
</script>
<style scoped>
td,th {
  @apply py-2 w-1/3;
}
</style>
