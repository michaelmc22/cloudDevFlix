//The URIs of the REST endpoint
IUPS = "https://prod-20.centralus.logic.azure.com:443/workflows/1dbcfaa6dda64211ab457c765af30b97/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=opAtWU2lvf8PxCn9GfjAJXHtaESiIf2A1pss4EfbwBk";
RAI = "https://prod-09.centralus.logic.azure.com:443/workflows/a4784be0b90740119a5cdf4b5f76dd40/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=H0B4saAWkVzuXqqOkG_eNaXhUyIOZdr1WC7QekjJu4E";


BLOB_ACCOUNT = "https://videoblobserv.blob.core.windows.net";

//Handlers for button clicks
$(document).ready(function() {

 
  $("#retUsers").click(function(){

      //Run the get asset list function
      getUsers();

  }); 

  $("#enterForm").click(function(){

      //Run the get asset list function
      signIn();

  }); 

 

   //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewAsset();
    
  }); 
});

//A function to submit a new asset to the REST endpoint 
function submitNewAsset(){
  //Create a form data object
   submitData = new FormData();
   //Get form variables and append them to the form data object
   submitData.append('userName', $('#userNameSignUp').val());
   submitData.append('pass', $("#passSignUp")[0].files[0]);
  
   //Post the form data to the endpoint, note the need to set the content type header
   $.ajax({
   url: IUPS,
   data: submitData,
   cache: false,
   enctype: 'multipart/form-data',
   contentType: false,
   processData: false,
   type: 'POST',
   success: function(data){
  
   }
   });
  }

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getUsers(){
  //Replace the current HTML in that div with a loading message
   $('#ImageList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');
   $.getJSON(RAI, function( data ) {
   //Create an array to hold all the retrieved assets
   var items = [];
  
   //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
   $.each( data, function( key, val ) {
   items.push( "<hr />");
   items.push("<embed src='"+BLOB_ACCOUNT + val["filePath"] +"' width='500'" + "' height='500'" + "<track " + "label='English " + "kind='captions " + "srclang='en '" + "default />" + "<br />");
   items.push( "Uploaded by: " + val["userName"] + " (user id: "+val["userID"]+")<br />");
   items.push( "<hr />");
   });
   //Clear the assetlist div
   $('#ImageList').empty();
   //Append the contents of the items array to the ImageList Div
   $( "<ul/>", {
   "class": "my-new-list",
   html: items.join( "" )
   }).appendTo( "#ImageList" );
   });
  }

  function deleteAsset(id){
    $.ajax({
    type: "DELETE",
    //Note the need to concatenate the
    url: DIAURI0 + id + DIAURI1,
    }).done(function( data ) {
    //On success, update the assetlist.
    alert("deleted successfully")
    });
    }

    //A function to get a list of all the assets and write them to the Div with the AssetList Div
function signIn(){
    //Replace the current HTML in that div with a loading message
     $('#userList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');
     $.getJSON(RAI, function( data ) {
     //Create an array to hold all the retrieved assets
     var items = [];
    
     //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
     $.each( data, function( key, val ) {
     items.push( "<hr />");
     items.push( "Username: " + val["userName"] + " (User id: "+val["userID"]+")<br />");
     items.push( "Pass: " + val["pass"] + "<br />");
     items.push( "<hr />");
     });
     //Clear the assetlist div
     $('#ImageList').empty();
     //Append the contents of the items array to the ImageList Div
     $( "<ul/>", {
     "class": "my-new-list",
     html: items.join( "" )
     }).appendTo( "#ImageList" );
     });
    }
  

