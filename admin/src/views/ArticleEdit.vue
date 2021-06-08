<template>
    <div>
        <h2>{{ this.id ? "编辑" : "新增" }}文章</h2>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="上级分类">
                <el-select v-model="form.parent" placeholder="请选择上级分类">
                    <el-option
                        v-for="item in parents"
                        :label="item.name"
                        :value="item._id"
                        :key="item._id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="名称">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="详情">
                <vue-editor
                    useCustomImageHandler
                    @image-added="handleImageAdded"
                    v-model="form.body"
                ></vue-editor>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="saveClick">保存</el-button>
                <el-button @click="cancelClick">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
    props: {
        id: {},
    },
    components: {
        VueEditor,
    },
    data() {
        return {
            form: {
                title: "",
            },
            parents: [],
        };
    },
    methods: {
        async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
            var formData = new FormData();
            formData.append("file", file);

            const res = await this.$http.post("/upload", formData);
            Editor.insertEmbed(cursorLocation, "image", res.data.url);
            resetUploader();
        },

        async saveClick() {
            let res;
            if (this.id) {
                res = await this.$http.put(
                    "/rest/articles/" + this.id,
                    this.form
                );
            } else {
                res = await this.$http.post("/rest/articles", this.form);
            }
            console.log("保存成功", res);
            if (res.status === 200) {
                this.$message({
                    type: "success",
                    message: "操作成功",
                });
                this.$router.push("/articles/list");
            }
        },
        cancelClick() {
            this.$router.push("/articles/list");
        },
        async fetchData() {
            if (!this.id) return;
            let res = await this.$http.get("/rest/articles/" + this.id);
            if (res.status === 200) {
                console.log("查询成功", res);
                this.form = res.data;
                // this.form.parent = res.data.parent;
            }
        },
        async fetchParents() {
            let res = await this.$http.get("/rest/categories");
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
</style>