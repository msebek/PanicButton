/// <reference path="../external/knockout-2.3.0.d.ts" />
/// <reference path="../external/jquery-1.10.2.d.ts" />

class ReviewModel {
    public available: KnockoutObservableArray<PanicContracts.HelpRequest>;
    public refresh: () => void;
    public getHelpRequests: () => void;
    public approveRequest: (HelpRequest : PanicContracts.HelpRequest) => void;


    constructor() {
        var self = this;
        this.available = ko.observableArray([]);

        this.getHelpRequests = () => {
            console.log("Retreiving all help requests called!");

            // JQuery Node: If you have 201 status code, make sure { dataType: "text" }
            $.ajax({
                type: "GET",
                dataType: "json",
                url: "http://" + window.location.host + "/requests",
                success: function (data : Object, textStatus : String, jqXHR : any) {
                    console.log("Success");
                    $.map(data, (elementOfArray, indexInArray) => {
                        self.available.push(<PanicContracts.HelpRequest>elementOfArray);
                    });
                    
                },
                
                error: function (xhr, ajaxOptions, thrownError) {
                    alert("Something is dumb");
                },
            });
        }

        // Populate the help requests.
        this.getHelpRequests();

        this.approveRequest = (HelpRequest : PanicContracts.HelpRequest) => {
            // Grab the request id.

            $.ajax({
                type: "PATCH", 
                dataType: "text", 
                url: "http://" + window.location.host + "/requests",
            });
        }        

    }

}




ko.applyBindings(new ReviewModel());
