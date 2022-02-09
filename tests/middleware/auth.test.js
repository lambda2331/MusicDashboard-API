const sinon = require('sinon')
const proxyquiry = require('proxyquire')
const authorizationMiddleware = proxyquiry('../../src/middleware/auth', {
    'jsonwebtoken': {
        verify: sinon.spy()
    }
})
const { expect } = require('chai')

const mockRequestAvailablePath = {
    path: '/api/user/login'
}

const mockRequestAuth = {
    path: '/test',
    headers: {}
}

const mockRequestWitToken = {
    path: '/test',
    headers: {
        authorization: 'Bearer AskdlkmaK@MLkmd1'
    }
}

const createResponseMock = (send) => ({
    status: sinon.stub().returns({
        send
    })
})

describe('Authorization middleware', () => {
    let mockNext
    let mockRequest
    let mockResponse

    beforeEach(() => {
        mockNext = sinon.spy()
        mockRequest = {}
        mockResponse = {}
    })

    it('Skip check if it is available path', () => {
        mockRequest = mockRequestAvailablePath

        authorizationMiddleware(mockRequest, mockResponse, mockNext)
        expect(mockNext).calledOnce
    })

    it('Return 403 error if token is missing', () => {
        const sendFunction = sinon.spy()

        mockRequest = mockRequestAuth

        mockResponse = createResponseMock(sendFunction)

        authorizationMiddleware(mockRequest, mockResponse, mockNext)

        expect(mockResponse.status).calledWith(403)
        expect(sendFunction).calledWith({ message: 'Access denied' })
    })

    it('Return 401 if token is wrong or expired', () => {
        const sendFunction = sinon.spy()

        mockRequest = mockRequestWitToken

        mockResponse = createResponseMock(sendFunction)  

        authorizationMiddleware(mockRequest, mockResponse, mockNext)

        expect(mockResponse.status).calledWith(401)
        expect(sendFunction).calledWith({ message: 'Unauthorized' })
    })

    // it('Call next if token is correct', () => {
    //     mockRequest = mockRequestWitToken

    //     authorizationMiddleware(mockRequest, mockResponse, mockNext)

    //     expect(mockNext).calledOnce
    // })
})