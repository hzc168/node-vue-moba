<template>
    <div>
        <h2>{{ this.id ? "编辑" : "新增" }}广告</h2>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button size="small" @click="form.items.push({})">
                    <i class="el-icon-plus"></i> 添加广告
                </el-button>
                <el-row>
                    <el-col v-for="(item, i) in form.items" :key="i">
                        <el-form-item label="跳转链接（URL）">
                            <el-input v-model="item.url"></el-input>
                        </el-form-item>
                        <el-form-item label="图片">
                            <el-upload
                                class="avatar-uploader"
                                :action="uploadUrl"
                                :headers="getAuthHeaders()"
                                :show-file-list="false"
                                :on-success="
                                    (res) => $set(item, 'image', res.url)
                                "
                            >
                                <img
                                    v-if="item.image"
                                    :src="item.image"
                                    class="avatar"
                                    style="width: auto; min-width: 5rem"
                                />
                                <i
                                    v-else
                                    class="el-icon-plus avatar-uploader-icon"
                                ></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                size="small"
                                type="danger"
                                @click="form.items.splice(i, 1)"
                                >删除</el-button
                            >
                        </el-form-item>
                    </el-col>
                </el-row>
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
                items: [],
            },
        };
    },
    methods: {
        async saveClick() {
            let res;
            if (this.id) {
                res = await this.$http.put("/rest/ads/" + this.id, this.form);
            } else {
                res = await this.$http.post("/rest/ads", this.form);
            }
            console.log("保存成功", res);
            if (res.status === 200) {
                this.$message({
                    type: "success",
                    message: "操作成功",
                });
                this.$router.push("/ads/list");
            }
        },
        cancelClick() {
            this.$router.push("/ads/list");
        },
        async fetchData() {
            if (!this.id) return;
            let res = await this.$http.get("/rest/ads/" + this.id);
            if (res.status === 200) {
                console.log("查询成功", res);
                this.form = Object.assign({}, this.form, res.data);
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