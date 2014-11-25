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
isloggedin=false;
$cid=0;
$key=null;
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
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
		//alert("runnme..2");
		//$('#output').html("he..lo");
		
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
		/*
		if(isloggedin==false){
			showLogin();
		}else{
			showMenu();
		}
		*/
		showLogin();
		
		
		 
		 

    }
};


function showLogin(){
		$.mobile.pageContainer.pagecontainer("change", "#main", {
			transition: "slide",
			reverse: false,
			changeHash: false
			});

			

}

$(document).on('click', '#ext-link', function(e){
    if (typeof navigator !== "undefined" && navigator.app) {
        // Mobile device.
        navigator.app.loadUrl('http://aries-epic.com/', {openExternal: true});
    } else {
        // Possible web browser
        window.open("http://aries-epic.com/", "_blank");
    }
});


function doLogin(){
	$user=$('#username').val();
	$pass=$('#password').val();
	//alert($user+$pass);
	$.mobile.loading('show');//show the loading screen
		$.ajax({
            type : 'GET',          
            url : 'http://ncplservices.com/login.php?cid='+$user+'&pswd='+$pass,         
            success : function(data) {  
				//alert(data);               
				$.mobile.loading('hide');
				if(data=="true"){
					isloggedin=true;
					$cid=$user;
					$.mobile.pageContainer.pagecontainer("change", "#home", {
						transition: "slide",
						reverse: false,
						changeHash: false
						});
					showMenu();
				}
            },
            error : function(xhr, type) {
				alert("error")
				$.mobile.loading('hide');
            }
      }); 

}

function showMenu(){

	$.mobile.loading('show');//show the loading screen
		$.ajax({
            type : 'GET',          
            url : 'http://ncplservices.com/category.php',         
            success : function(data) {  
				//alert('Success');
                x=eval(data);
				for (key in x) {
				$('#main').append('<p><a onclick="changepage(this)" class="ui-btn ui-shadow ui-corner-all">'+x[key].category+'</a></p>');
				}
				$.mobile.loading('hide');
            },
            error : function(xhr, type) {
                $('#popupw').html('<h1>Unable to connect to the server</h1>');
				$( "#popupw" ).popup( "open");
				$.mobile.loading('hide');
            }
      }); 
}


function changepage($t){
	$cat=$($t).text();
	//$('#productinfo').html("Loading..."+$cat);
	$.mobile.loading('show')
		
	$.ajax({
            type : 'GET',          
            url : 'http://ncplservices.com/productbyid.php?id='+$cat+'&pgno=1', 
            success : function(data) {  
				//alert('Success');
				$('#productinfo').html("");
                x=eval(data);
				for (key in x) {
				$('#productinfo').append('<li><a href="javascript:showpop(\''+key+'\')"><img src="http://ncplservices.com/marketing/'+x[key].image+'" height="100px"><h2>'+x[key].itemname+'</h2><p>'+x[key].itemtype+'</p></a></li>');
				}
				

			
			$.mobile.pageContainer.pagecontainer("change", "#datainfo", {
			transition: "slide",
			reverse: false,
			changeHash: false
			});
			$( "#productinfo" ).listview( "refresh" );




            },
            error : function(xhr, type) {
				//alert(type)
                $('#productinfo').append('server error occurred');
            }
      }); 
	  
}


function showpop(key){
	$key=key;
	$('#totinf').html('<img src="http://ncplservices.com/marketing/'+x[key].image+'" width="100%">');
	
	$('#totinf3').html(x[key].category);
	$('#totinf3').append("<br>"+x[key].productcode);
	$('#totinf3').append("<br>Price:"+x[key].mrp);
	//$( "#popup2" ).popup( "open");
	$.mobile.pageContainer.pagecontainer("change", "#full", {
			transition: "slide",
			reverse: false,
			changeHash: false
			});
}


function placeOrder(){
	//$itemc,$item,$qty,$rate
	//alert(x[key].productcode);
	$qty=$('#number-pattern').val();
	//alert($qty);
	var formData = {cid:$cid,pcode:x[key].productcode,item:x[key].itemname,qty:$qty,rate:x[key].mrp};
	alert(formData);
	$.ajax({
            type : 'POST',    
			data : formData,
            url : 'http://www.ncplservices.com/corder.php', 
            success : function(data) {  
				
				alert(data);
            },
            error : function(xhr, type) {
				alert("Error")
                
            }
      }); 
	  

}


