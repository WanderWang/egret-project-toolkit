class TestCaseEgretIsFunction {

    run() {
        const result = egret.is(new __ClassB(), '__ClassA');
        console.log('testcase : egret.is should be true', result);
    }
}


class __ClassA {
}

class __ClassB extends __ClassA {

}