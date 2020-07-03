class TestCaseEgretIsFunction {

    run() {
        const result1 = egret.is(new __ClassB(), '__ClassA');
        console.log('testcase : egret.is should be true', result1);
        const result2 = egret.is(new __ClassB(), '__InterfaceA');
        console.log('testcase : egret.is should be true', result2);
    }
}

interface __InterfaceA {

}


class __ClassA implements __InterfaceA {
}

class __ClassB extends __ClassA {

}