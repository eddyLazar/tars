// sample for es6 backbone

let {
    Model, View, Collection, Router, LocalStorage
} = Backbone;

class BaseModel extends Model {

    defaults() {
            return {
                functions: [],
            };
        }

}


class BaseCollection extends Collection {
  constructor(options) {
    super(options);
    this.model = BaseModel;
  }
}



class BaseView extends View {
    constructor(options) {
        _.defaults(options, {
            // These options are assigned to the instance by Backbone
            el: 'body',
            // className: 'document-row',
            // events: {
            //
            // },
        });
        super(options);
    }

    render() {
    }
}
