import { expect } from 'chai'
import { json } from 'express'
import { initializeTestDb, insertTestUser } from './helpers/test.js'

const base_url = 'http://localhost:3001'

describe('GET Tasks', () => {

    before(async() => {
        await initializeTestDb();
    })

    it ('should return all tasks', async() => {

        const response = await fetch(base_url)
        const data = await response.json()

        expect(response.status).to.equal(200)
        expect(data).to.be.an('array').that.is.not.empty
        expect(data[0]).to.include.all.keys('id', 'description')

    })
})

describe('POST Task', () => {

    before(async() => {
        await initializeTestDb();
    })

    it ('should post a task', async() => {
        const response = await fetch(base_url + '/create', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({description: 'Task from unit test'})
        })
        const data = await response.json()
        expect(response.status).to.equal(200)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('id')
    })

    it ('should not post a task without description', async() => {
        const response = await fetch(base_url + '/create', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'description': null})
        })
        const data = await response.json()
        expect(response.status).to.equal(500)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('error')
    })
})

describe ('DELETE Task', () => {

    before(async() => {
        await initializeTestDb();
    })

    it ('should delete a task', async() => {
        const response = await fetch(base_url + '/delete/1', {
            method: 'delete'
        })
        const data = await response.json()
        expect(response.status).to.equal(200)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('id')
    })

    it ('should not deleta task with SQL injection', async() => {
        const response = await fetch(base_url + '/delete/id=0 or id > 0', {
            method: 'delete'
        })
        const data = await response.json()
        expect(response.status).to.equal(500)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('error')
    })
})

describe('POST register', () => {

    before(async() => {
        await initializeTestDb();
    })
    const email = 'register@foo.com'
    const password = 'register123'
    it ('should register with valid email and password', async() => {
        const response = await fetch(base_url + '/user/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'email': email, 'password': password})
        })
        const data = await response.json()
        expect(response.status).to.equal(201, data.error)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('id', 'email')
    })
})

describe('POST login', () => {

    const email = 'login@foo.com'
    const password = 'login123'

    before(async() => {
        await initializeTestDb();
        await insertTestUser(email, password)
    })

    it ('should login with valid email and password', async() => {
        const response = await fetch(base_url + '/user/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'email': email, 'password': password})
        })
        const data = await response.json()
        expect(response.status).to.equal(200, data.error)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('id', 'email', 'token')
    })
})