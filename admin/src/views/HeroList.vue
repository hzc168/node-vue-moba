<template>
    <div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="_id" label="ID" width="240">
            </el-table-column>
            <el-table-column prop="name" label="名称"> </el-table-column>
            <el-table-column prop="avatar" label="头像">
                <template slot-scope="scope">
                   <img :src="scope.row.avatar" style="height: 3rem;" alt="">
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="200">
                <template slot-scope="scope">
                    <el-button
                        @click="editClick(scope.row)"
                        type="text"
                        size="small"
                        >编辑</el-button
                    >
                    <el-button
                        @click="deleteClick(scope.row)"
                        type="text"
                        size="small"
                        >删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [],
        };
    },
    methods: {
        async fetch() {
            let res = await this.$http.get("/rest/heroes");
            console.log("获取的数据", res);
            if (res.status === 200) {
                this.tableData = res.data;
            }
        },
        editClick(item) {
            console.log("编辑", item);
            this.$router.push("/heroes/add/" + item._id);
        },
        deleteClick(item) {
            console.log("删除", item);
            this.$confirm("确定删除：" + item.name, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    this.$http
                        .delete("/rest/heroes/" + item._id)
                        .then((res) => {
                            if (res.status === 200) {
                                this.$message({
                                    type: "success",
                                    message: "删除成功!",
                                });
                            }
                            this.fetch();
                        });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
    },
    created() {
        this.fetch();
    },
};
</script>

<style>
</style>