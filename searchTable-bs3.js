/*
  Title: searchTable.js
  Author: David Faunce
  Purpose: Create a search feature that links a simple HTML <input type="text"> element to an HTML table
  Date: November 15th, 2019
  Version: 1.0.0
  
  Prerequisites: 
    - jQuery (v2.2 or higher)
    - Bootstrap v3.3 - v3.4 (Not v4.0 or higher)
*/
$(function() {

  $.fn.searchTable = function(options) {
  
    // Default options
    var settings = $.extend({
      tableID: "",                                   //The ID of the table you wish to search
      hasSearchIcon: true,                           //Will the Search box have a search icon to the left of the text input?
      hasClearIcon: true,                            //Will the Search feature contain a "clear search" icon and button?
      searchIconParentClass: "",                     //Any additional classes you wish to insert into the <span> that houses the <span> for the search icon
      searchIconClass: "glyphicon glyphicon-search", //The class to identify the icon for search -- this is default to glyphicon-search
      clearIconClass: "glyphicon glyphicon-remove",  //The class to identify the icon for clear -- this is default to glyphicon-remove
      clearIconParentClass: ""                       //Any additional classes you with to insert into the <span> that houses the <span> for the clear icon 
    }, options );

    //Identify the Text Search Input object
    var $txt = $("#" + this.attr("id"));
    
    
    //Wrap the search Textbox in div.input-group tag
    $txt.wrap('<div class="input-group df-searchTable" style="width:100%;"></div>');

    //Get the parent div.input-group
    var $inputGroup = $txt.parent(".input-group.df-searchTable");
    
    //Prepend the search icon
    if (settings.hasSearchIcon) {
      $inputGroup.prepend('<span class="input-group-addon"><span class="' + settings.searchIconClass + '"></span></span>');
    }
    
    //Append the clear search box
    if (settings.hasClearIcon) {
      $inputGroup.append('<span class="input-group-addon" title="Clear Search"><span class="' + settings.clearIconClass + '"></span></span>');
    }
    
    //Identify the table we want to to search
    var $tbl = $("#" + settings.tableID);
       
    //Create a function to clear the search results
    //Sets the search input to empty and shows all table records
    function clear() {
      $txt.val("");
      $tbl.children("tbody").find("tr").show();
    }
    
    if (settings.hasClearIcon) {
      //Identify the clear button
      var $btnClear = $inputGroup.find("span.input-group-addon:last-child");  
      $btnClear.on("click", clear);
    }
    
    
    //Create a function to search the table
    function search() {
      //Get the user input text -> convert to lower case
      var txt = $.trim($txt.val()).toLowerCase();

      //If the text is empty then complete clear the search and exit the function
      if (txt.length == 0) {
        console.log("clear");
        clear();
        return;
      }
      
      //Create an array of the user input keywords (delimited by a space)
      //We will ensure each keyword exists in the record
      var arr = txt.split(" ");
      
      //Variable b will determine if the record meets all keyword criteria
      var b = 0;      
      
      //Create an empty tr variable to represent the full text of the record in question
      var tr;
      
      //Search through each <tr> in the tbody of the table
      $tbl.children("tbody").find("tr").each(function() {
      
        //Set the initial check value to 1
        b = 1;
        
        //Get the record text => convert to lower-case
        tr = $.trim($(this).text()).toLowerCase();
        
        //Loop through the keywords and check to see if tr contains ALL keywords in question.        
        for (var i = 0; i < arr.length; i++) {
          //If any keyword does NOT match the record, b will be 0 and will remain 0 until the next record is searched
          b *= (tr.indexOf(arr[i]) >= 0) ? 1 : 0;
        }      
        
        //If b is NOT 0 then the record meets all search criteria - show it, else hide it
        if (b > 0) {
          $(this).show();
        }
        else {
          $(this).hide();
        }
      });      
    }    
    $txt.on("keyup", search);
    
  }

/*
  //Example
  $("#txt-search").searchTable({
    tableID: "example"
  });
*/

});
