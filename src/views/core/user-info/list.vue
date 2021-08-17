<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="Phone Number">
        <el-input v-model="searchObj.mobile" placeholder="Phone Number" />
      </el-form-item>
      <el-form-item label="User Type">
        <el-select
          v-model="searchObj.userType"
          placeholder="Please Choose"
          clearable
        >
          <el-option label="Invester" value="1" />
          <el-option label="Borrower" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="Status">
        <el-select
          v-model="searchObj.status"
          placeholder="Please Choose"
          clearable
        >
          <el-option label="Normal" value="1" />
          <el-option label="Locked" value="0" />
        </el-select>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="fetchData()">
        Search
      </el-button>
      <el-button type="default" @click="resetData()">Reset</el-button>
    </el-form>
    <el-table :data="list" border stripe>
      <el-table-column label="#" width="50">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="Type" width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.userType === 1" type="success" size="mini">
            Invester
          </el-tag>
          <el-tag
            v-else-if="scope.row.userType === 2"
            type="warning"
            size="mini"
          >
            Borrower
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="mobile" label="Phone" />
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="idCard" label="ID" />
      <el-table-column prop="integral" label="Credit" />
      <el-table-column prop="createTime" label="Register Time" width="100" />
      <el-table-column label="Binding" width="90">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.bindStatus === 0" type="warning" size="mini">
            No
          </el-tag>
          <el-tag
            v-else-if="scope.row.bindStatus === 1"
            type="success"
            size="mini"
          >
            Binded
          </el-tag>
          <el-tag v-else type="danger" size="mini">Failed</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Status" width="90">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 0" type="danger" size="mini">
            Locked
          </el-tag>
          <el-tag v-else type="success" size="mini">
            Normal
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status == 1"
            type="danger"
            size="mini"
            @click="lock(scope.row.id, 0)"
          >
            Lock
          </el-button>
          <el-button
            v-else
            type="primary"
            size="mini"
            @click="lock(scope.row.id, 1)"
          >
            Unlock
          </el-button>

          <el-button
            type="primary"
            size="mini"
            @click="showLoginRecord(scope.row.id)"
          >
            Record
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="Login Record" :visible.sync="dialogTableVisible">
      <el-table :data="loginRecordList" border stripe>
        <el-table-column type="index" />
        <el-table-column prop="ip" label="IP" />
        <el-table-column prop="createTime" label="Login Time" />
      </el-table>
    </el-dialog>
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[1, 2, 3]"
      style="padding: 30px 0; "
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="changePageSize"
      @current-change="changeCurrentPage"
    />
  </div>
</template>

<script>
import userInfoApi from '@/api/core/user-info'
export default {
  data() {
    return {
      dialogTableVisible: false,
      list: null,
      total: 0,
      page: 1,
      limit: 1,
      searchObj: {},
      loginRecordList: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      userInfoApi
        .getPageList(this.page, this.limit, this.searchObj)
        .then(reponse => {
          this.list = reponse.data.pageModel.records
          this.total = reponse.data.pageModel.total
        })
    },
    changePageSize(size) {
      this.limit = size
      this.fetchData()
    },
    changeCurrentPage(page) {
      this.page = page
      this.fetchData()
    },
    lock(id, status) {
      userInfoApi.lock(id, status).then(response => {
        this.$message.success(response.message)
        this.fetchData()
      })
    },
    resetData() {
      this.searchObj = {}
      this.fetchData()
    },
    showLoginRecord(id) {
      userInfoApi.getTop50(id).then(response => {
        this.loginRecordList = response.data.list
        this.dialogTableVisible = true
      })
    }
  }
}
</script>
