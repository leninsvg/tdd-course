module.exports = ({axios}) => ({
    post:async (req, res) => {
        const {data: users} = await axios.get('https://jsonplaceholder.typicode.com/users');
        const existUser = users.some(user => user.userId === req.body.id);
        if(!existUser) {
            return res.sendStatus(500);
        }
        console.log(users);
        const {data} = await axios.post('https://jsonplaceholder.typicode.com/users', req.body);
        res.status(201).send(data)
    }
})