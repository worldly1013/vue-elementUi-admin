<template lang="html">
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body">
      <el-upload
      class="upload-demo"
      action="http://dev.fenzhitech.com/wbuild-file/v1/resource/_upload"
      :on-success="successUpload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :limit="3"
      :on-exceed="handleExceed"
      :file-list="fileList"
      >
        <el-button size="small" type="info">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
  </div>
</template>

<script>
import {
  panelTitle
} from 'components'

export default {
  data() {
    return {
      fileList: []
    };
  },
  components: {
    panelTitle
  },
  methods: {
    // 文件上传成功时的钩子
    successUpload(response, file, fileList) {
      console.log('111');
      console.log(response);
      console.log(file);
      console.log(fileList);
    },
    // 文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 点击已上传的文件链接时的钩子
    handlePreview(file) {
      console.log(file);
    },
    // 文件超出个数限制时的钩子
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    // 上传文件之前的钩子
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    }
  }
}
</script>
