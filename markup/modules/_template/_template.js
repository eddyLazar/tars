// // es 6 sandbox
// //
//
// let {
//     Model, View, Collection, Router, LocalStorage
// } = Backbone;
//
// class Person extends Model {
//     constructor(options) {
//         super(options);
//     }
//
//     defaults() {
//             return {
//                 title: 'title',
//                 completed: false
//             };
//         }
//         // constructor() {
//         //
//         // }
//     set name(name) {
//         this.set('name', name)
//     }
//     get name() {
//             return this.get('name')
//         }
//         // get name(){
//         //     return `Hello ${this.first_name}, how are you?`
//         // }
// }
// class SugarView extends View {
//     constructor(options) {
//         super(options);
//     }
// }
//
// class AppView extends View {
//     constructor(options) {
//         _.defaults(options, {
//             // These options are assigned to the instance by Backbone
//             el: 'body',
//             // className: 'document-row',
//             // events: {
//             //     "click .icon": "open",
//             // },
//         });
//         super(options);
//     }
//
//     render(text) {
//         this.$el.text(text);
//     }
//
//     toggleColor(color="white") {
//         this.$el.css('background',color);
//
//     }
// }
//
//
//
// // p.name = 'eddy';
// let m = new Person();
// let v = new AppView({
//     model: m
// });
// // m.set('name', 'eddy')
// m.name = 'eddy boy';
// console.log(m.name);
