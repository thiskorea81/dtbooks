<template>
  <div>
    <h1>PDF 업로드</h1>
    <input type="file" @change="handleFileUpload" />
  </div>
</template>

<script>
import { usePdfStore } from '@/stores/pdfStore';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const pdfStore = usePdfStore();
    const router = useRouter();

    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        pdfStore.setPdfData(reader.result)
        router.push('/result')
      };
      reader.readAsDataURL(file);
    };

    return { handleFileUpload };
  },
}
</script>
