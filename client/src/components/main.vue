<template>
  <div class="main w">
    <!-- 头部 -->
    <div class="header">
      <div class="left">
        <span class="title">GLXT</span>
      </div>
      <div class="right">
        <ul>
          <li>
            <el-input placeholder="请输入学号" prefix-icon="el-icon-search" v-model="selectBystuid"></el-input>
            <el-button size="small" type="primary" @click="selectStu">查询</el-button>
          </li>
          <li>
            <el-button size="small" @click="tableButton">数据</el-button>
          </li>
          <li>
            <el-button size="small" @click="addButton">录入</el-button>
          </li>
        </ul>
      </div>
    </div>

    <div class="table">
      <!-- 用户列表 -->
      <el-table :data="stuData" border style="width: 100%" v-loading="loading" v-show="tableShow">
        <el-table-column fixed prop="stuId" label="学号" align="center"></el-table-column>
        <el-table-column prop="stuName" label="姓名" align="center"></el-table-column>
        <el-table-column prop="banJi" label="班级" align="center"></el-table-column>
        <el-table-column prop="xueYuan" label="学院" align="center"></el-table-column>
        <el-table-column prop="telphone" label="联系方式" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
        <el-table-column prop="timeIn" label="入学时间" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="updateStu(scope.$index, stuData)"
              type="text"
              size="small"
            >修改</el-button>
            <el-button
              type="text"
              size="small"
              @click.native.prevent="removeRow(scope.$index, stuData)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        v-show="paginationShow"
      ></el-pagination>

      <!-- 查询列表 -->
      <el-table :data="selectData" border style="width: 100%" v-show="selectShow">
        <el-table-column fixed prop="stuId" label="学号" align="center"></el-table-column>
        <el-table-column prop="stuName" label="姓名" align="center"></el-table-column>
        <el-table-column prop="banJi" label="班级" align="center"></el-table-column>
        <el-table-column prop="xueYuan" label="学院" align="center"></el-table-column>
        <el-table-column prop="telphone" label="联系方式" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
        <el-table-column prop="timeIn" label="入学时间" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="updateStu(scope.$index, selectData)"
              type="text"
              size="small"
            >修改</el-button>
            <el-button
              type="text"
              size="small"
              @click.native.prevent="removeRow(scope.$index, selectData)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 录入 -->
      <el-form
        :model="addForm"
        ref="addForm"
        label-width="100px"
        v-show="addShow"
        class="addForm"
        :rules="addRules"
      >
        <el-form-item label="学号" prop="stuId">
          <el-input v-model="addForm.stuId"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="stuName">
          <el-input v-model="addForm.stuName"></el-input>
        </el-form-item>
        <el-form-item label="学院">
          <el-select v-model="addForm.xueYuan" placeholder="请选择学院">
            <el-option label="大数据" value="大数据"></el-option>
            <el-option label="计算机" value="计算机"></el-option>
            <el-option label="管理" value="管理"></el-option>
            <el-option label="艺术" value="艺术"></el-option>
            <el-option label="财经" value="财经"></el-option>
            <el-option label="外语" value="外语"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级">
          <el-select v-model="addForm.banJi" placeholder="请选择班级">
            <el-option label="软件工程" value="软件工程"></el-option>
            <el-option label="计算机与科学" value="计算机与科学"></el-option>
            <el-option label="英语" value="英语"></el-option>
            <el-option label="电气" value="电气"></el-option>
            <el-option label="视觉传达" value="视觉传达"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入学时间" prop="timeIn">
          <el-input v-model="addForm.timeIn"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="telphone">
          <el-input v-model="addForm.telphone"></el-input>
        </el-form-item>
        <el-form-item class="form-button">
          <el-button type="primary" @click="submitaddForm('addForm')">保存</el-button>
          <el-button @click="resetaddForm('addForm')">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 修改 -->
      <el-form
        :model="updateForm"
        ref="updateForm"
        label-width="80px"
        :rules="addRules"
        class="updateForm"
        v-show="updateShow"
      >
        <el-form-item label="姓名" prop="stuName">
          <el-input v-model="updateForm.stuName"></el-input>
        </el-form-item>
        <el-form-item label="班级">
          <el-select v-model="updateForm.banJi" placeholder="请选择班级">
            <el-option label="软件工程" value="软件工程"></el-option>
            <el-option label="计算机与科学" value="计算机与科学"></el-option>
            <el-option label="英语" value="英语"></el-option>
            <el-option label="电气" value="电气"></el-option>
            <el-option label="视觉传达" value="视觉传达"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学院">
          <el-select v-model="updateForm.xueYuan" placeholder="请选择学院">
            <el-option label="大数据" value="大数据"></el-option>
            <el-option label="计算机" value="计算机"></el-option>
            <el-option label="管理" value="管理"></el-option>
            <el-option label="艺术" value="艺术"></el-option>
            <el-option label="财经" value="财经"></el-option>
            <el-option label="外语" value="外语"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="updateForm.email"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="telphone">
          <el-input v-model="updateForm.telphone"></el-input>
        </el-form-item>
        <el-form-item class="form-button">
          <el-button type="primary" @click="submitupdateForm('updateForm')">修改</el-button>
          <el-button @click="resetaddForm('updateForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    function checkPhone(rule, value, callback) {
      const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/;
      if (!value) {
        return callback(new Error("电话号码不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (phoneReg.test(value)) {
            callback();
          } else {
            callback(new Error("电话号码格式不正确"));
          }
        }
      }, 100);
    }
    function checkEmail(rule, value, callback) {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的邮箱格式"));
        }
      }, 100);
    }
    return {
      // 查询input
      selectBystuid: "",

      // 获取到列表数据
      stuData: [],
      // 查询到的数据
      selectData: [],
      // 录入 用户输入数据
      addForm: {},
      // 修改 用户输入数据
      updateForm: {
        stuName: "",
        banJi: "",
        xueYuan: "",
        email: "",
        telphone: "",
        stuId: ""
      },

      // 分页
      pageSize: 5,
      total: 0,
      currentPage: 1,

      //加载
      loading: false,

      //是否隐藏
      tableShow: true,
      paginationShow: true,
      selectShow: false,
      addShow: false,
      updateShow: false,

      //接口url
      url: "http://localhost:3000",

      //录入表单rules
      addRules: {
        stuId: [
          {
            required: true,
            message: "请输入学号",
            trigger: "blur"
          },
          {
            min: 6,
            max: 6,
            message: "长度为 6 个字符",
            trigger: "blur"
          }
        ],
        stuName: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          },
          {
            min: 2,
            max: 3,
            message: "长度为 2-3 个字符",
            trigger: "blur"
          }
        ],
        banJi: [
          {
            required: true,
            message: "请输入班级",
            trigger: "blur"
          },
          {
            min: 2,
            max: 8,
            message: "长度为 2-8 个字符",
            trigger: "blur"
          }
        ],
        xueYuan: [
          {
            required: true,
            message: "请输入学院",
            trigger: "blur"
          },
          {
            min: 2,
            max: 8,
            message: "长度为 2-8 个字符",
            trigger: "blur"
          }
        ],
        timeIn: [
          {
            required: true,
            message: "请输入入学时间（例如:201809）",
            trigger: "blur"
          },
          {
            min: 6,
            max: 6,
            message: "长度为 6 个字符（例如:201809）",
            trigger: "blur"
          }
        ],
        telphone: [
          {
            required: true,
            message: "请输入联系方式",
            trigger: "blur"
          },
          {
            validator: checkPhone,
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur"
          },
          {
            validator: checkEmail,
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    this.loadTable();
  },
  methods: {
    /**
     * <数据>按钮
     */
    tableButton() {
      this.tableShow = true;
      this.paginationShow = true;
      this.selectShow = false;
      this.addShow = false;
      this.updateShow = false;
    },
    /**
     * <录入>按钮
     */
    addButton() {
      this.addShow = true;
      this.tableShow = false;
      this.paginationShow = false;
      this.selectShow = false;
      this.updateShow = false;
    },
    /**
     * 修改表单
     */
    updateStu(index, rows) {
      this.updateForm.stuId = rows[index].stuId;
      this.updateForm.stuName = rows[index].stuName;
      this.updateForm.banJi = rows[index].banJi;
      this.updateForm.xueYuan = rows[index].xueYuan;
      this.updateForm.email = rows[index].email;
      this.updateForm.telphone = rows[index].telphone;

      this.updateShow = true;
      this.tableShow = false;
      this.paginationShow = false;
      this.addShow = false;
      this.selectShow = false;
    },

    /**
     * 获取数据
     */
    async loadTable() {
      this.loading = true;
      await this.$axios
        .post(this.url + "/students/getStudata", {
          currentPage: this.currentPage,
          pageSize: this.pageSize
        })
        .then(res => {
          this.loading = false;
          this.stuData = res.data.students;
          this.total = res.data.pagination.total;
          // console.log(res);
        });
    },
    /**
     * 分页
     */
    //当改变每页显示条数的选择器时会触发的事件
    handleSizeChange(size) {
      this.pageSize = size;
      // console.log(this.pageSize);
      this.loadTable();
    },
    //当改变当前页数的时候触发的事件
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      // console.log(this.currentPage); //点击第几页
      this.loadTable();
    },

    /**
     * 删除
     */
    removeRow(index, rows) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var that = this;
          this.$axios
            .get(that.url + "/students/delBystuid", {
              params: { stuId: rows[index].stuId }
            })
            .then(
              res => {
                that.tableShow = true;
                that.paginationShow = true;
                that.selectShow = false;
                that.selectData = [];
                that.loadTable();
              },
              err => {
                console.log(err);
              }
            );
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    /**
     *修改
     */
    submitupdateForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("此操作将修改该学生信息, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              var that = this;
              this.$axios
                .post(that.url + "/students/updateStu", {
                  params: {
                    stu: that.updateForm
                  }
                })
                .then(
                  res => {
                    if (res.data.status == 200) {
                      this.tableShow = true;
                      this.paginationShow = true;
                      this.updateShow = false;
                      that.loadTable();
                    } else if (res.data.status == 404) {
                      this.$message.error("已存在信息，手机号、邮箱已被使用");
                    }
                  },
                  err => {
                    console.log(err);
                  }
                );
            })
            .catch(() => {});
        } else {
          console.log("表单有误");
          return false;
        }
      });
    },

    /**
     * 查询数据
     */
    async selectStu() {
      if (this.selectBystuid == "") {
        this.$message({
          message: "请输入学号",
          type: "warning"
        });
      } else {
        this.selectData = [];
        this.tableShow = false;
        this.paginationShow = false;
        this.addShow = false;
        this.selectShow = true;
        this.updateShow = false;

        await this.$axios
          .get(this.url + "/students/getStubystuId", {
            params: {
              stuId: this.selectBystuid
            }
          })
          .then(
            res => {
              if (res.data.result !== null) {
                this.selectData.unshift(res.data.result);
              }
              this.selectBystuid = "";
            },
            err => {
              console.log(err);
            }
          );
      }
    },

    /**
     * 保存录入
     */
    submitaddForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("此操作将新增信息, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(
            () => {
              var that = this;
              this.$axios
                .post(that.url + "/students/addNewstu", {
                  stu: that.addForm
                })
                .then(res => {
                  if (res.data.status == 200) {
                    that.addShow = false;
                    that.tableShow = true;
                    that.paginationShow = true;
                    that.loadTable();
                    that.addForm = {};
                  } else if (res.data.status == 404) {
                    this.$message.error(
                      "已存在信息，学号、手机号、邮箱已被使用"
                    );
                    that.addForm = {};
                  }
                });
            },
            err => {}
          );
        } else {
          console.log("表单有误");
          return false;
        }
      });
    },

    /**
     * 重置(录入表单 修改表单)
     */
    resetaddForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
</style>
