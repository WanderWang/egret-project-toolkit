// class Main {

//     constructor() {
//         new aa.A();
//         new aa.B();
//     }
// }

module aa {

    export class Main1 {

        static a: number = 0;

        constructor() {
            // new A();
            // new B();
            new C();
        }
    }
}


// class Main {

//     constructor() {
//         console.log('hello')
//     }
// }
new aa.Main1();

// new Main();

console.log('helloworld')