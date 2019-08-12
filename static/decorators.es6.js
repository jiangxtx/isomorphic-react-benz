/**
 * @file decorators.es6.js es6中Decorator包装器介绍
 */

class Demo1 {
    @fn1_wrap
    fn1() {
        console.log('>>>fn1:');
    }
}

function fn1_wrap(target, name, descriptor) {
    console.log('target..', target)
    console.log('name..', name)

    target.love = 'flag111';
    target.fn22 = function () {
        console.log('>>>>fn22')
    };
    target.fn1 = function () {
        console.log('>>++fn1 new')
    };
    descriptor.value = function () {
        console.log('descriptor fn1 new')
    }
}

const demo1 = new Demo1();
demo1.fn1();
demo1.fn22();
console.log('Demo...', Demo1.love)
