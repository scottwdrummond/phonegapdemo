/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


var currentSection = "";
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('online', this.onOnline, false);
        document.addEventListener('offline', this.onOffline, false);
        document.addEventListener('backbutton', this.onBackButton, false);
        document.addEventListener('menubutton', this.onMenuButton, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },

    onOnline: function() {
        app.receivedEvent('online');
    },

    onOffline: function() {
        app.receivedEvent('offline');
    },

    onBackButton: function() {
        app.receivedEvent('backbutton');
    },

    onMenuButton: function() {
        app.receivedEvent('menubutton');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {


        var statusElement = document.getElementById('status').querySelector('.ls');


        if (id == "online") {

            statusElement.innerHTML = "Online";
        } else  if (id == "offline") {

            statusElement.innerHTML = "Offline";
        } else  if (id == "menubutton") {
            currentSection="menu";
            $("#detailstab").css("opacity",0).css("left","100%");
            $("#coursestab").css("opacity",0).css("left","100%");
            $("#taskstab").css("opacity",0).css("left","100%");
            showMenu();

        } else  if (id == "backbutton") {

            //statusElement.innerHTML = "Go back";
            if (currentSection == "details") {
                $("#detailstab").css("opacity",0).css("left","100%");
                showMenu();
            }
            if (currentSection == "courses") {
                $("#coursestab").css("opacity",0).css("left","100%");
                showMenu();

            }
            if (currentSection == "tasks") {
                $("#taskstab").css("opacity",0).css("left","100%");
                showMenu();
            }
            currentSection = "menu";

        } else {

            var parentElement = document.getElementById(id);
            var listeningElement = parentElement.querySelector('.listening');
            var receivedElement = parentElement.querySelector('.received');
            var bob = parentElement.querySelector('.ls');

            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');

            this.getData();

        }

        console.log('Received Event: ' + id);

    },



    getData: function()
    {
        var jqxhr = $.get( "dummy.html", function(data) {
           // alert( "success" );
            $("#content").html(data);
            localStorage.terramarDetails = data;
            $("#CourseFilter").change(filtertasks);
            filterDropdown();
            filtertasks();

        })
        .fail(function() {
            $("#deviceready .received").html("Sync Failed")
            $("#content").html(localStorage.terramarDetails);
        })
        .always(function() {
            //alert( "finished" );
            setTimeout(app.displayContent, 1500 );
        });


    },


    displayContent: function()
    {
        $("#deviceready").fadeOut("fast");
        $("#menu").fadeIn("fast");
      //  $("#content").show();

        initMenu();
    }


};

 function details2()
{
    currentSection = "details";
    //alert("details button clicked 2");

    hideMenu();
    $("#detailstab").css("left","20%");
    $("#detailstab").animate({
        opacity: 1,
        left: "0%"
    }, 500, function() {
        // Animation complete.
    });
};

function courses2()
{
    currentSection = "courses";
    //alert("courses button clicked 2");

    hideMenu();
    $("#coursestab").css("left","20%");
    $("#coursestab").animate({
        opacity: 1,
        left: "0%"
    }, 500, function() {
        // Animation complete.
    });
};

function tasks2()
{
    currentSection = "tasks";
    //alert("tasks button clicked 2");

    hideMenu();
    $("#taskstab").css("left","20%");
    $("#taskstab").animate({
        opacity: 1,
        left: "0%"
    }, 500, function() {
        // Animation complete.
    });
};


function showMenu() {
    $("#menu").show();
    $(".app").show();
}

function hideMenu() {
    $("#menu").hide();
    $(".app").hide();
}

function initMenu() {
    currentSection="menu";
    $("#detailstab").css("opacity",0).css("left","100%");
    $("#coursestab").css("opacity",0).css("left","100%");
    $("#taskstab").css("opacity",0).css("left","100%");
    $("#content").show();
    showMenu();
}


function filterDropdown() {
    var arr = $('table tr').map(function (el, i) {
        return $(this).attr("data-task");
    });
    var arr2 = $.makeArray(arr);
    arr2 = jQuery.unique(arr2);

    var opts = $("#CourseFilter option");
    opts.each(function (index) {
        var val = ($(this).val());
        if ($.inArray(val, arr2)===-1) {
            $(this).remove();
        }
    });
}

function filtertasks() {
    $("table#tasks>tbody>tr[data-task]").hide();
    var coursefilter = $("#CourseFilter").val();
    var tds = $("table#tasks>tbody>tr[data-task='" + coursefilter + "']");

    tds.show();
    tds.each(function(index) {
        var bgc = (index % 2 < 1) ? "#DDDDDD" : "#FFFFFF";
        $(this).css("backgroundColor", bgc);
    });

                //$( "table" ).table( ).data('table').destroy();
                $( "table" ).table( ).init();
}

