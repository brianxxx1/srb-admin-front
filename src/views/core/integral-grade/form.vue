<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="Borrow Amount">
        <el-input-number v-model="integralGrade.borrowAmount" :min="0" />
      </el-form-item>
      <el-form-item label="Credit Start">
        <el-input-number v-model="integralGrade.integralStart" :min="0" />
      </el-form-item>
      <el-form-item label="Credit End">
        <el-input-number v-model="integralGrade.integralEnd" :min="0" />
      </el-form-item>
      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate()"
        >
          Save
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import integralGradeApi from '@/api/core/integral-grade'
export default {
  data() {
    return {
      saveBtnDisabled: false,
      integralGrade: {}
    }
  },
  created() {
    if (this.$route.params.id) {
      this.fetchById(this.$route.params.id)
    }
  },
  methods: {
    fetchById(id) {
      integralGradeApi.getById(id).then(Response => {
        this.integralGrade = Response.data.record
      })
    },

    saveOrUpdate() {
      this.saveBtnDisabled = true
      if (this.$route.params.id) {
        this.update(this.integralGrade)
      } else {
        this.save()
      }
      this.$router.push('/core/integral-grade/list')
    },
    save() {
      integralGradeApi.save(this.integralGrade).then(Response => {
        this.$message({
          showClose: true,
          message: Response.message,
          type: 'success'
        })
      })
    },
    update(integralGrade) {
      integralGradeApi.updateById(integralGrade).then(Response => {
        this.$message({
          showClose: true,
          message: Response.message,
          type: 'success'
        })
      })
    }
  }
}
</script>
