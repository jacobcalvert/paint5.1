var erase = false;
jQuery(document).ready(function(){
    var global_x, global_y;
    var down = false;

    $(document).mousemove(function(e){
      var canvas = document.getElementById("mainCanvas");
      var x = e.pageX - canvas.offsetLeft;
      var y = e.pageY - canvas.offsetTop;
      if(x<0){x=0;}if(x>650){x=650;}global_x = x;
      if(y<0){y=0;}if(y>650){y=650;}global_y = y;
      if(down==true && erase==false){
              //drawing
              var pen_size =document.getElementById("pen_width").value;
              var pen_color=document.getElementById("pen_color").value;
              var ctx = canvas.getContext("2d");
              ctx.fillStyle = pen_color;
              ctx.fillRect(x,y,pen_size,pen_size);
      }
      else if(down==true && erase==true){
        //erasing
        var canvas = document.getElementById("mainCanvas");
        var ctx = canvas.getContext("2d");
        var bg_color=document.getElementById("bg_color").value;
        ctx.fillStyle = bg_color;
        console.log(bg_color + " shoould be erasing");
        ctx.fillRect(x,y,pen_size,pen_size);
        }



      $('#position_box').html('Position:</br>'+ x +', '+ y);
   });
   $("#mainCanvas").mousedown(function (){
    down = true;
    }).mouseup(function(){
   down = false;
   });

})
function clearCanvas(){
    var canvas = document.getElementById("mainCanvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,canvas.width,canvas.height);

}
function updateCanvasBackground(){
    var canvas = document.getElementById("mainCanvas");
    var bg_color=document.getElementById("bg_color").value;
    canvas.style.backgroundColor = bg_color;
}
function eraseDrawToggle(){
    var btn = document.getElementById("erase_draw_toggle");
    if(btn.value=="Erase"){


        erase = true;
        console.log(erase)
        btn.value ="Draw";
    }
    else{
        btn.value="Erase";

        erase = false;


    }

}
function saveCanvas(){
       var img    = canvasToImage(document.getElementById("mainCanvas"),document.getElementById("bg_color").value);
       document.getElementById("save_box").innerHTML="<center>Right click and save the image.</br><img src="+img+" /><br/><a href='javascript:showCanvas()'>Close</a></center>";
        $( "#save_box" ).fadeIn();
        $( "#container" ).hide();
}
function showCanvas(){
    $( "#save_box" ).hide();
    $( "#container" ).fadeIn();

}
function canvasToImage(canvas,backgroundColor)
        {
        	//cache height and width
        	var w = canvas.width;
        	var h = canvas.height;
        	context = canvas.getContext("2d");
        	var data;

        	if(backgroundColor)
        	{
        		//get the current ImageData for the canvas.
        		data = context.getImageData(0, 0, w, h);

        		//store the current globalCompositeOperation
        		var compositeOperation = context.globalCompositeOperation;

        		//set to draw behind current content
        		context.globalCompositeOperation = "destination-over";

        		//set background color
        		context.fillStyle = backgroundColor;

        		//draw background / rect on entire canvas
        		context.fillRect(0,0,w,h);
        	}

        	//get the image data from the canvas
        	var imageData = canvas.toDataURL("image/png");

        	if(backgroundColor)
        	{
        		//clear the canvas
        		context.clearRect (0,0,w,h);

        		//restore it with original / cached ImageData
        		context.putImageData(data, 0,0);

        		//reset the globalCompositeOperation to what it was
        		context.globalCompositeOperation = compositeOperation;
        	}

        	//return the Base64 encoded data url string
        	return imageData;
        }
