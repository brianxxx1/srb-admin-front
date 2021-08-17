<template>
  <div class="app-container">
    <!-- 表格 -->
    <el-table :data="list" border stripe>
      <el-table-column type="index" width="50" />
      <el-table-column prop="borrowAmount" label="Borrow Amount" />
      <el-table-column prop="integralStart" label="Start" />
      <el-table-column prop="integralEnd" label="End" />
      <el-table-column label="Operation">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="removeById(scope.row.id)"
          >
            Delete
          </el-button>
          <router-link
            :to="'/core/integral-grade/edit/' + scope.row.id"
            style="margin-right:5px;"
          >
            <el-button type="primary" size="mini" icon="el-icon-edit">
              Edit
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import integralGradeApi from '@/api/core/integral-grade'

export default {
  data() {
    return { list: [] }
  },
  created() {
    this.fetechData()
  },
  methods: {
    fetechData() {
      integralGradeApi.list().then(Response => {
        this.list = Response.data.list
      })
    },

    removeById(id) {
      this.$confirm(
        'The record you chose will be deleted, confirmed?',
        'Warning',
        {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Back',
          type: 'warning'
        }
      )
        .then(() => {
          return integralGradeApi.deleteById(id)
        })
        .then(Response => {
          this.$message({
            showClose: true,
            message: Response.message,
            type: 'success'
          })
          this.fetechData()
        })
        .catch(error => {
          if (error === 'cancel') {
            this.$message({
              type: 'info',
              message: 'Delete canceled'
            })
          }
        })
    }
  }
}
</script>
