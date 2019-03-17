module.exports = {
    onEvent: 'initialize',
    fn: async function initializeResponses() {
        maroon.app.use((req, res, next) => {
            res.success = (...data) => {
                maroon.out.trace('Called res.success with data:', ...data)
                let response = {
                    status: 'success',
                    data: getResponseData(data)
                }
                res.status(200).send(response)
            }
            res.fail = (statusCode, message, ...data) => {
                maroon.out.trace(`Called res.fail with status code ${statusCode} and message '${message}'`)
                let response = {
                    status: 'fail',
                    message,
                    data: getResponseData(data)
                }
                res.status(statusCode).send(response)
            }
            res.error = (statusCode, message, ...data) => {
                if (typeof statusCode === 'string') {
                    message = statusCode
                    statusCode = 500
                }
                maroon.out.trace(`Called res.error with status code ${statusCode} and message '${message}'`)
                let response = {
                    status: 'error',
                    message,
                    data: getResponseData(data)
                }
                res.status(statusCode).send(response)
            }
            next()
        })
    }
}

function getResponseData(data) {
    if (typeof data === 'undefined') {
        return {}
    }
    else {
        if (data.length > 1) {
            return { ...data }
        }
        else {
            return data[0]
        }
    }
}
