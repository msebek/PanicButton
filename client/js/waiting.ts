/// <reference path="../external/knockout-2.3.0.d.ts" />
/// <reference path="../external/jquery-1.10.2.d.ts" />

enum States {
    waitingOnUser,
    requestSent,
    waitingForAssistance
}

class Support {
    public javascript : String = "JavaScript";
    public html: String = "HTML";
    public css: String = "CSS";
}

class waitingModel {
    public teamName: KnockoutObservable<string>;
    public location: KnockoutObservable<string>;
    public topic: KnockoutObservable<string>;
    public description: KnockoutObservable<string>;
    public sendRequest: () => void;

    constructor() {
        this.teamName = ko.observable("Your team!");
        this.location = ko.observable("Gates 3K");
        this.topic = ko.observable("JavaScript");
        this.description = ko.observable("Help me pls.");

        this.sendRequest = () => {
            // Dispatch request
            console.log("send request called!");
            var grrrr = {
                "requestingTeamName": this.teamName(),
                "location": this.location(),
                "topic": this.topic()
            };

            console.log(grrrr);
            // JQuery Node: If you have 201 status code, make sure { dataType: "text" }
            $.ajax({
                type: "POST",
                dataType: "text",
                data: grrrr,
                url: "http://" + window.location.host + "/requests",
                success: function (data : Object, textStatus : String, jqXHR : any) {
                    console.log("Success");
                    console.log(data);
                    console.log(textStatus);
                    console.log(jqXHR);
                    alert("Success!");
                    // Grab the Location header
                    var resourceLocation = jqXHR.getResponseHeader("Location");
                    var string_id = resourceLocation.substring(10);
                    // Redirect to page requestWaitPage
                    location.href = "waitingPage.html?id=" + string_id
                },
                
                error: function (xhr, ajaxOptions, thrownError) {
                    alert("This is dumb. 201 status code broke everything");
                },
            });
        }


    }
}

ko.applyBindings(new waitingModel());
