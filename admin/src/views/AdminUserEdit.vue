<template>
    <div>
        <h2>{{ this.id ? "编辑" : "新增" }}分类</h2>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="用户名">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="saveClick">保存</el-button>
                <el-button @click="cancelClick">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    props: {
        id: {},
    },
    data() {
        return {
            form: {
                username: "",
            },
        };
    },
    methods: {
        async saveClick() {
            let res;
            if (this.id) {
                res = await this.$http.put(
                    "/rest/adminUsers/" + this.id,
                    this.form
                );
            } else {
                res = await this.$http.post("/rest/adminUsers", this.form);
            }
            console.log("保存成功", res);
            if (res.status === 200) {
                this.$message({
                    type: "success",
                    message: "操作成功",
                });
                this.$router.push("/admin_users/list");
            }
        },
        cancelClick() {
            this.$router.push("/admin_users/list");
        },
        async fetchData() {
            if (!this.id) return;
            let res = await this.$http.get("/rest/adminUsers/" + this.id);
            if (res.status === 200) {
                console.log("查询成功", res);
                this.form = res.data;
            }
        },
    },
    created() {
        this.fetchData();
    },
};
</script>

<style>
</style>