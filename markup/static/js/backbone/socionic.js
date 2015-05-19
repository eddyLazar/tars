// калькулятор соционики

let {
    Model, View, Collection, Router
} = Backbone;

let functions = ['бс', 'чл', 'би', 'чэ', 'чи', 'бэ', 'чс', 'бл'];

let tims_json = [{
    title: 'Дон Кихот',
    group: 'альфа',
    functions: [
        'чи', // базовая
        'бл', // творческая
        'чс', // ролевая
        'бэ', // болевая
        'бс', // суггестивная
        'чэ', // активационная
        'би', // защитная
        'чл' // фоновая
    ]
}, {
    title: 'Гамлет',
    group: 'бета',
    functions: [
        'чэ', // базовая
        'би', // творческая
        'чл', // ролевая
        'бс', // болевая
        'бл', // суггестивная
        'чс', // активационная
        'бэ', // защитная
        'чи' // фоновая
    ]
}, {
    title: 'Драйзер',
    group: 'гамма',
    functions: [
        'бэ', // базовая
        'чс', // творческая
        'бл', // ролевая
        'чи', // болевая
        'чл', // суггестивная
        'би', // активационная
        'чэ', // защитная
        'бс' // фоновая
    ]
}, {
    title: 'Габен',
    group: 'дельта',
    functions: [
        'бс', // базовая
        'чл', // творческая
        'би', // ролевая
        'чэ', // болевая
        'чи', // суггестивная
        'бэ', // активационная
        'чс', // защитная
        'бл' // фоновая
    ]
}, ];


class Tim extends Model {
    defaults() {
        return {
            title: '',
            functions: [
                '', // базовая
                '', // творческая
                '', // ролевая
                '', // болевая
                '', // суггестивная
                '', // активационная
                '', // защитная
                '', // фоновая
            ]
        };

    }

    get title() {
        return this.get('title');
    }

    get functions() {
        return this.get('functions');
    }

    get extra() {
        return this.functions[0].includes('ч');
    }

    valuable(f) {
        let index_of_function = this.functions.indexOf(f) + 1;
        let valuabl_function = new Array(1, 2, 5, 6);
        return valuabl_function.indexOf(index_of_function) != -1;
    }

}


class TimCollection extends Collection {
    constructor(options) {
        // _.defaults(options, {
        //     model: Tim,
        // });
        super(options);
        this.model = Tim;
    }

    extraverts() {
        return this.filter(tim => tim.extra);
    }

    introverts() {
        return this.filter(tim => !tim.extra);
    }
}



class TimsCollectionView extends View {
    constructor(options = {}) {
        _.defaults(options, {
            // These options are assigned to the instance by Backbone
            el: '.tims-list',
            // className: 'document-row',
            events: {
                "click .js-all": "initialize",
                "click .js-extra": "renderExtraverts",
                "click .js-intro": "renderIntroverts",
            },
        });
        super(options);
    }

    initialize() {
        this.listenTo(this.collection, "reset", this.render);
    }

    render() {
        this.$el.empty();
        this.collection.forEach(tim => {
            let tv = (new TimView({
                model: tim
            }));
            this.$el.append(tv.render());
        });
    }

    renderExtraverts() {
        this.renderTims(tims.extraverts());
    }

    renderIntroverts() {
        this.renderTims(tims.introverts());

    }
}

class TimView extends View {
    constructor(options = {}) {
        _.defaults(options, {
            // These options are assigned to the instance by Backbone
            tagName: 'h3',
            className: 'tim'
                // className: 'document-row',
        });
        super(options);
    }

    render() {
        return this.$el.text(this.model.title);
    }

}


class Filter {
    constructor(position){
        this.tims = tims;
    }
}

class functionFilter {
    constructor(name, funcs, position){
        this.p = p;
        this.f = f;
    }
}

filter = {
    name: '',
    funcs: [''],
    position: 123
}
let tims = new TimCollection();


let app = new TimsCollectionView({
    collection: tims
});

tims.reset(tims_json);
