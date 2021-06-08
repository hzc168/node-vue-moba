<template>
    <div>
        <h2>{{ this.id ? "编辑" : "新增" }}物品</h2>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="图标">
                <el-upload
                    class="avatar-uploader"
                    :multiple="false"
                    :action="uploadUrl"
                    :headers="getAuthHeaders()"
                    :on-success="uploadSuccess"
                >
                    <img v-if="form.icon" :src="form.icon" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
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
                name: "",
            },
            parents: [],
        };
    },
    methods: {
        uploadSuccess(res) {
            console.log("上传成功", res);
            this.$set(this.form, "icon", res.url);
        },

        async saveClick() {
            let res;
            if (this.id) {
                res = await this.$http.put("/rest/items/" + this.id, this.form);
            } else {
                res = await this.$http.post("/rest/items", this.form);
            }
            if (res.status === 200) {
                this.$message({
                    type: "success",
                    message: "操作成功",
                });
                this.$router.push("/items/list");
            }
        },
        cancelClick() {
            this.$router.push("/items/list");
        },
        async fetchData() {
            if (!this.id) return;
            let res = await this.$http.get("/rest/items/" + this.id);
            if (res.status === 200) {
                console.log("查询成功", res);
                this.form = res.data;
                // this.form.parent = res.data.parent;
            }
        },
        async fetchParents() {
            let res = await this.$http.get("/rest/items");
            if (res.status === 200) {
                console.log("查询成功", res);
                this.parents = res.data;
            }
        },
    },
    created() {
        this.fetchData();
        this.fetchParents();
    },
};
</script>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>