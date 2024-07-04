<template>
  <div>
    <h1>PDF 업로드</h1>
    <input type="file" @change="handleFileUpload" />
  </div>
</template>

<script>
import { usePdfStore } from '@/stores/pdfStore'
import { useRouter } from 'vue-router'
import { getPdfData } from '@/utils/pdfUtils'

export default {
  setup() {
    const pdfStore = usePdfStore()
    const router = useRouter()

    const handleFileUpload = async (event) => {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.onload = async () => {
        const pdfDataUrl = reader.result
        console.log('PDF Data URL:', pdfDataUrl); // 로그 추가
        const pdfData = await getPdfData(pdfDataUrl)
        console.log('Extracted PDF Data:', pdfData); // 로그 추가
        pdfStore.setPdfData(pdfData)
        router.push('/result')
      }
      reader.readAsDataURL(file)
    }

    return { handleFileUpload }
  }
}
</script>
