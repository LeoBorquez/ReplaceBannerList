$(document).ready(function(){
	images();
});


function images(){
	
	var imagen = "";	

	$().SPServices({
        operation: "GetListItems",
        async: false,
        listName: "LogoBanner",
        CAMLQuery: "<Query><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></Query>",
        CAMLViewFields: "<ViewFields><FieldRef Name='Title' /><FieldRef Name='FileRef' /></ViewFields>",
        CAMLRowLimit: 1,
        completefunc: function (xData, Status) {
           $(xData.responseXML).SPFilterNode("z:row").each(function () {             
           
            var  rutaImagen = $(this).attr("ows_FileRef");
            var splits = rutaImagen.split(';#')[1];
            imagen = splits;

            });
        }
    });

	var context = $().SPServices.SPGetCurrentSite();
	
	var splitRuta = context.split('/')[2];

	var ruta = "http://" + splitRuta;


	if((typeof imagen != "undefined") && (imagen != "")){
	    	$('.logo').attr("src", ruta +"/"+imagen);
	    	$('.logo').show();
	    }    
	else{
		$('.logo').show();
	}
	
}
