<template>
    <div>
        <h2>{{ this.id ? "编辑" : "新增" }}英雄</h2>
        <el-form ref="form" :model="form" label-width="80px">
            <el-tabs value="basic" type="border-card">
                <el-tab-pane label="基础信息" name="basic">
                    <el-form-item label="名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="称号">
                        <el-input v-model="form.title"></el-input>
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-select
                            v-model="form.categories"
                            placeholder="请选择分类"
                            multiple
                        >
                            <el-option
                                v-for="item in categories"
                                :label="item.name"
                                :value="item._id"
                                :key="item._id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="难度">
                        <el-rate
                            :max="10"
                            v-model="form.scores.difficult"
                            show-score
                            style="padding-top: 10px"
                        ></el-rate>
                    </el-form-item>
                    <el-form-item label="技能">
                        <el-rate
                            :max="10"
                            v-model="form.scores.skills"
                            show-score
                            style="padding-top: 10px"
                        ></el-rate>
                    </el-form-item>
                    <el-form-item label="攻击">
                        <el-rate
                            :max="10"
                            v-model="form.scores.attack"
                            show-score
                            style="padding-top: 10px"
                        ></el-rate>
                    </el-form-item>
                    <el-form-item label="生存">
                        <el-rate
                            :max="10"
                            v-model="form.scores.survive"
                            show-score
                            style="padding-top: 10px"
                        ></el-rate>
                    </el-form-item>
                    <el-form-item label="顺风出装">
                        <el-select
                            v-model="form.items1"
                            placeholder="请选择分类"
                            multiple
                        >
                            <el-option
                                v-for="item in items"
                                :label="item.name"
                                :value="item._id"
                                :key="item._id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="逆风出装">
                        <el-select
                            v-model="form.items2"
                            placeholder="请选择分类"
                            multiple
                        >
                            <el-option
                                v-for="item in items"
                                :label="item.name"
                                :value="item._id"
                                :key="item._id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="使用技巧">
                        <el-input
                            type="textarea"
                            v-model="form.usageTips"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="对抗技巧">
                        <el-input
                            type="textarea"
                            v-model="form.battleTips"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="团战思路">
                        <el-input
                            type="textarea"
                            v-model="form.teamTips"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="头像">
                        <el-upload
                            class="avatar-uploader"
                            :multiple="false"
                            :action="uploadUrl"
                            :headers="getAuthHeaders()"
                            :on-success="uploadSuccess"
                        >
                            <img
                                v-if="form.avatar"
                                :src="form.avatar"
                                class="avatar"
                            />
                            <i
                                v-else
                                class="el-icon-plus avatar-uploader-icon"
                            ></i>
                        </el-upload>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="技能" name="skills">
                    <el-button size="small" @click="form.skills.push({})">
                        <i class="el-icon-plus"></i> 添加技能
                    </el-button>
                    <el-row type="flex" style="flex-wrap: wrap">
                        <el-col
                            :md="12"
                            v-for="(item, i) in form.skills"
                            :key="i"
                        >
                            <el-form-item label="名称">
                                <el-input v-model="item.name"></el-input>
                            </el-form-item>
                            <el-form-item label="图标">
                                <el-upload
                                    class="avatar-uploader"
                                    :action="uploadUrl"
                                    :headers="getAuthHeaders()"
                                    :show-file-list="false"
                                    :on-success="
                                        (res) => $set(item, 'icon', res.url)
                                    "
                                >
                                    <img
                                        v-if="item.icon"
                                        :src="item.icon"
                                        class="avatar"
                                    />
                                    <i
                                        v-else
                                        class="
                                            el-icon-plus
                                            avatar-uploader-icon
                                        "
                                    ></i>
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="冷却值">
                                <el-input v-model="item.delay"></el-input>
                            </el-form-item>
                            <el-form-item label="消耗">
                                <el-input v-model="item.cost"></el-input>
                            </el-form-item>
                            <el-form-item label="描述">
                                <el-input
                                    v-model="item.description"
                                    type="textarea"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="小提示">
                                <el-input
                                    v-model="item.tips"
                                    type="textarea"
                                ></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button
                                    size="small"
                                    type="danger"
                                    @click="form.skills.splice(i, 1)"
                                    >删除</el-button
                                >
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
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
                title: "",
                scores: {
                    difficult: 0,
                    skills: 0,
                    attack: 0,
                    survive: 0,
                },
                item1: [],
                item2: [],
            },
            parents: [],
            categories: [],
            items: [],
        };
    },
    methods: {
        async fetchCategories() {
            let res = await this.$http.get("/rest/categories");
            if (res.status === 200) {
                this.categories = res.data;
            }
        },

        async fetchItems() {
            let res = await this.$http.get("/rest/items");
            if (res.status === 200) {
                this.items = res.data;
            }
        },

        uploadSuccess(res) {
            console.log("上传成功", res);
            this.$set(this.form, "avatar", res.url);
        },

        async saveClick() {
            let res;
            if (this.id) {
                res = await this.$http.put(
                    "/rest/heroes/" + this.id,
                    this.form
                );
            } else {
                res = await this.$http.post("/rest/heroes", this.form);
            }
            if (res.status === 200) {
                this.$message({
                    type: "success",
                    message: "操作成功",
                });
                this.$router.push("/heroes/list");
            }
        },
        cancelClick() {
            this.$router.push("/heroes/list");
        },
        async fetchData() {
            if (!this.id) return;
            let res = await this.$http.get("/rest/heroes/" + this.id);
            if (res.status === 200) {
                console.log("查询成功", res);
                // this.form = res.data;
                this.form = Object.assign({}, this.form, res.data);
                // this.form.parent = res.data.parent;
            }
        },
        async fetchParents() {
            let res = await this.$http.get("/rest/heroes");
            if (res.status === 200) {
                console.log("查询成功", res);
                this.parents = res.data;
            }
        },
    },
    created() {
        this.fetchData();
        this.fetchParents();

        this.fetchCategories();
        this.fetchItems();
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
    width: 5rem;
    height: 5rem;
    line-height: 5rem;
    text-align: center;
}
.avatar {
    width: 5rem;
    height: 5rem;
    display: block;
}
</style>