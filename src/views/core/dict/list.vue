<template>
  <div class="app-container">
    <div style="margin-bottom: 10px;">
      <el-button
        type="primary"
        size="mini"
        icon="el-icon-download"
        @click="dialogVisible = true"
      >
        Import Excel
      </el-button>

      <el-button
        type="primary"
        size="mini"
        icon="el-icon-upload2"
        @click="exportData"
      >
        Export Excel
      </el-button>
    </div>

    <el-dialog
      title="Info Dict Import"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form>
        <el-form-item label="Please select your Excel file">
          <el-upload
            :auto-upload="true"
            :multiple="false"
            :limit="1"
            :on-exceed="fileUploadExceed"
            :on-success="fileUploadSuccess"
            :on-error="fileUploadError"
            :action="BASE_API + '/admin/core/dict/import'"
            name="file"
            accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          >
            <el-button size="small" type="primary">Upload</el-button>
          </el-upload>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">
          Cancel
        </el-button>
      </div>
    </el-dialog>

    <el-table :data="list" border row-key="id" lazy :load="load">
      <el-table-column label="Name" align="left" prop="name" />
      <el-table-column label="Code" prop="dictCode" />
      <el-table-column label="Value" align="left" prop="value" />
    </el-table>
  </div>
</template>

<script>
import dictApi from '@/api/core/dict'
export default {
  data() {
    return {
      dialogVisible: false,
      BASE_API: process.env.VUE_APP_BASE_API,
      list: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    load(tree, treeNode, resolve) {
      dictApi.listByParentId(tree.id).then(response => {
        resolve(response.data.list)
      })
    },
    fetchData() {
      dictApi.listByParentId(1).then(response => {
        this.list = response.data.list
      })
    },
    fileUploadExceed() {
      this.$$message.warning('One File Limited')
    },
    fileUploadSuccess(response) {
      if (response.code === 0) {
        this.$message('Import Successful')
        this.dialogVisible = false
      } else {
        this.$message.error(response.message)
      }
    },
    fileUploadError() {
      this.$message.error('Network Error')
    },

    exportData() {
      window.location.href = this.BASE_API + '/admin/core/dict/export'
    }
  }
}
</script>
