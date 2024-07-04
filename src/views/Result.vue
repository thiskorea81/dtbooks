<template>
  <div>
    <h1>PDF 미리보기</h1>
    <embed :src="pdfData" type="application/pdf" width="100%" height="600px" />
  </div>
</template>

<script>
import { usePdfStore } from '@/stores/pdfStore'

export default {
  setup() {
    const pdfStore = usePdfStore()
    const pdfData = pdfStore.pdfData

    return { pdfData }
  }
}
</script>
