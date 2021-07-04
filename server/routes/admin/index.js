module.exports = app => {
    const express = require('express')
    const assert = require('http-assert');
    const jwt = require('jsonwebtoken');
    const AdminUser = require('../../models/AdminUser');
    const router = express.Router({
        mergeParams: true
    });

    const authMiddleware = require('../../middlewares/auth');
    const resourceMiddleware = require('../../middlewares/resource');

    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body);
        res.send(model);
    })


    router.delete('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndDelete(req.params.id)
        res.send(model);
    })

    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
        res.send(model);
    })

    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id);
        res.send(model);
    })

    router.get('/', async (req, res) => {
        console.log("请求")
        const queryOptions = {};
        if (req.Model.modelName == 'Category' || req.Model.modelName == 'Article') {
            queryOptions.populate = 'parent'
        }
        const model = await req.Model.find().setOptions(queryOptions).limit(10);
        res.send(model);
    })


    app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router);


    const multer = require('multer');
    const upload = multer({ dest: __dirname + '/../../uploads' });
    app.use('/admin/api/upload', authMiddleware(), upload.single('file'), (req, res) => {
        const file = req.file;
        file.url = `http://localhost:3000/uploads/${file.filename}`;
        res.send(file);
    })

    app.use('/admin/api/login', async (req, res) => {
        const { username, password } = req.body;
        // 1. 查询用户名
        const user = await AdminUser.findOne({ username }).select('+password');
        assert(user, 422, '用户名不存在');

        // 2. 校验密码
        const isValid = require('bcrypt').compareSync(password, user.password)
        assert(isValid, 422, '密码错误')

        // 3. 返回token
        const token = jwt.sign({ id: user._id }, app.get('secret'))
        res.send({ token });
    })

    // 错误处理函数
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}

