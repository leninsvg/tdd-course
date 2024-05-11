/**
 * {
 *   "userId": 1,
 *   "id": 1,
 *   "title": "delectus aut autem",
 *   "body": "Cuerpo del post"
 * }
 */
const postHandlers = require('./index');
describe('Endpoints', () => {
    describe('posts', () => {
        it('Should return an array of posts', async () => {
            const mockUsers = [
                {
                    "userId": 1,
                },
                {
                    "userId": 2
                }];
            const post = {"userId": 1};
            const req = {
                body: post
            }
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
                sendStatus: jest.fn(),
            }
            const axios = {
                get: jest.fn().mockReturnValue(Promise.resolve({data: mockUsers})),
                post: jest.fn().mockReturnValue(Promise.resolve({data: {id: 1001}})),
            }
            await postHandlers({axios}).post(req, res);
            expect(res.status.mock.calls).toEqual([[201]]);
            expect(res.send.mock.calls).toEqual([[{id: 1001}]]);
            expect(axios.get.mock.calls).toEqual([['https://jsonplaceholder.typicode.com/users']]);
            expect(axios.post.mock.calls).toEqual([['https://jsonplaceholder.typicode.com/users', post]]);
        })
        it('Should return validate invalid record', async () => {
            const mockUsers = [
                {
                    "userId": 1,
                },
                {
                    "userId": 2
                }];
            const post = {"userId": 3};
            const req = {
                body: post
            }
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
                sendStatus: jest.fn(),
            }
            const axios = {
                get: jest.fn().mockReturnValue(Promise.resolve({data: mockUsers})),
                post: jest.fn().mockReturnValue(Promise.resolve({data: {id: 1000}})),
            }
            await postHandlers({axios}).post(req, res);
            expect(res.sendStatus.mock.calls).toEqual([[500]]);
            expect(axios.post.mock.calls).toEqual([]);
        })
    })
})