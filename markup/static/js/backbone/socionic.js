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

let app, filtered_collection;

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

    get group() {
        return this.get('group');
    }

    get functions() {
        return this.get('functions');
    }

    get extra() {
        if (this.functions[0].indexOf('ч') != -1){
            return 'extra';
        }else{
            return 'intro';
        }

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

class FilterView extends View {
    constructor(options = {}) {

        _.defaults(options, {
            // These options are assigned to the instance by Backbone
            tag: 'div',
            className: 'filter-group',
            events: {
                "click .filterValue": "filterCollection"
            }

        });
        super(options);
        this.filter_field = options.filter_field;
        // this.filter_field = options.filter_field;
        // this.filter = options.filter;
    }
    initialize() {
        this.listenToOnce(this.collection, "reset", this.render);
    }
    render() {
        let that = this;
        this.field_possible_values.forEach(field => {
                that.$el.append(`<a href="#" class="filterValue" data-value='${field}'>${field}</a><br>`);
            }
        );
        $('.filters').append(this.$el);
        $('.filters').append('<hr>');
    }

    get field_possible_values() {
        console.log(_.pluck(this.collection, this.filter_field));
        return _.uniq(this.collection.pluck(this.filter_field));

    }

    filterCollection(e) {
        let name = this.filter_field
        let value = $(e.currentTarget).data('value');

        this.collection.filterItems(function(item) {
                console.log(item.get(name));
                console.log(value);
                return (item[name] == value);
                // return false;
            }

        );
    }

}


let tims = new TimCollection();

let extra_filter = function(item) {
    return item.extra;
}

let filterFunction2 = function(item) {
    return item.get('group') == 'альфа';
}


function FilteredCollection(original, filterFn) {

    let filtered;

    // Instantiate new collection
    filtered = new original.constructor();

    // Remove events associated with original
    // filtered._callbacks = {};

    filtered.filterItems = function(filter) {
        let items;
        items = original.filter(filter);
        filtered._currentFilter = filterFn;
        filtered.reset(items)
        return filtered;
    };

    // Refilter when original collection is modified
    original.on('reset', function() {
        filtered.filterItems(filtered._currentFilter);
    });
    // console.log(filtered.filterItems(filterFn));
    return filtered.filterItems(filterFn);
};



// filtered_collection = FilteredCollection(tims, extra_filter);
// filtered_collection = FilteredCollection(filtered_collection, filterFunction2);
filtered_collection = FilteredCollection(tims, function() {
    return true;
});
new FilterView({
    filter_field: 'group',
    collection: filtered_collection
})

new FilterView({
    filter_field: 'title',
    collection: filtered_collection
})

new FilterView({
    filter_field: 'extra',
    collection: filtered_collection
})


app = new TimsCollectionView({
    collection: filtered_collection
});

tims.reset(tims_json);


// filtered_collection.filterItems(function() {
//   return false;
// })
