import { parse } from 'bindingx-parser'

const WeexBinding = weex.requireModule('bindingx')
const Bindingx = Object.create(null)

Bindingx.install = (Vue, options) => {
    Vue.prototype.$bindingx = {
         bind(options, callback) {
            if (!options) {
                throw new Error('should pass options for binding')
            }

            options.exitExpression = formatExpression(options.exitExpression)

            if (options.props) {
                options.props.forEach((prop) => {
                    prop.expression = formatExpression(prop.expression)
                })
            }

            return WeexBinding.bind(options, options && options.eventType === 'timing' ? fixCallback(callback) : callback)
        },

        unbind (options) {
            return WeexBinding.unbind(options)
        },

        unbindAll () {
            return WeexBinding.unbindAll()
        },

        getComputedStyle (el) {
            return WeexBinding.getComputedStyle(el)
        }
    }
}



const formatExpression = (expression) => {
    if (expression === undefined) return
    try {
        expression = JSON.parse(expression)
    } catch (err) {

    }
    let resultExpression = {}
    if (typeof expression === 'string') {
        resultExpression.origin = expression
    } else if (expression) {
        resultExpression.origin = expression.origin
        resultExpression.transformed = expression.transformed
    }
    if (!resultExpression.transformed && !resultExpression.origin) return
    resultExpression.transformed = resultExpression.transformed || parse(resultExpression.origin)
    return resultExpression
}

const fixCallback = (callback) => {
    return function(params = {}) {
        if (typeof callback === 'function') {
            return callback({
                state: params.state === 'end' ? 'exit' : params.state,
                t: params.t !== undefined ? params.t : params.deltaT
            })
        }
    }
}

Vue.use(Bindingx)
