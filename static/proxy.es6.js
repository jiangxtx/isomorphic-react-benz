/**
 * @file proxy.es6.js
 * @author shaoling(shaoling@pinduoudo.com)
 */

const handler = {
    get: (target, name) => {
        // console.log('get arg len: ', arguments.length)
        return name in target ? target[name] : 'default name'
    },
    set: (target, name, value) => {
        if (name === 'age') {
            if (typeof value !== 'number') {
                throw Error('age should be number.')
            }
            if (value < 1 || value > 100) {
                throw Error('age should between 1~100')
            }
            return target[name] = value
        }
        console.log(`set ${name} as: ${value}`)
    },
    getOwnPropertyDescriptor: function (target, props) {
        console.log('getOwnPropDescp: ', props)
        if (props === 'name') {
            return {
                configurable: true,
                enumerable: true,
                value: 'own-jack'
            }
        }
        return target[props]
    }
}

const p = new Proxy({ name: 'jack' }, handler)

p.a = 'a-name'
p.age = 26
console.log(p.a)
console.log(p.c)
console.log('age: ', p.age)
console.log('name: ', p.name)
console.log('own-propDescp name: ', Object.getOwnPropertyDescriptor(p, 'name'))
