/// <reference path="../external/knockout-2.3.0.d.ts" />

class SimpleListModel {
    public items: KnockoutObservableArray<string>;
    public itemToAdd: KnockoutObservable<string>;
    public addItem: () => void;

    constructor(items) {
        this.items = ko.observableArray(items);
        this.itemToAdd = ko.observable("");
        this.addItem = () => {
            if (this.itemToAdd() != "") {
                this.items.push(this.itemToAdd()); // Adds the item. Writing to the "items" observableArray causes any associated UI to update.
                this.itemToAdd(""); // Clears the text box, because it's bound to the "itemToAdd" observable
            }
        }
    }
}

ko.applyBindings(new SimpleListModel(["Alpha", "Beta", "Gamma"]));
