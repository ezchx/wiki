$.ajaxSetup({
  async: false
});

$(document).ready(function() {
  
  
  $("#tags").on("input", function(){
    runMenu();
    if ($("#tags").val() === "") {$("#search_results").html("");}
  });
  
  $("#search_button").on("click", function(){
    runList();
  });
  
  $("#search_it").on("click", function(){
    runList();
  });
  
  
  $('#tags').bind('keypress', function(e) {
	  if(e.keyCode==13){
      $(".ui-menu-item").hide();
		  runList();
  	}
  });
  
  $("#rand").on("click", function(){
    window.open('http://en.wikipedia.org/wiki/Special:Randompage');
  });
 
  
  function runMenu() {
    ss = $("#tags").val();
    url = "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&callback=?&srsearch=" + ss;
    $.getJSON(url, function(json) {
        
      var availableTags = [
        json.query.search[0].title,
        json.query.search[1].title,
        json.query.search[2].title,
        json.query.search[3].title,
        json.query.search[4].title,
        json.query.search[5].title
      ];
      
      $( "#tags" ).autocomplete({
        source: availableTags,
      });
    });
  }
  
  
  
  function runList() {
    
    var html = "";
    var ss = $("#tags").val();
    if (ss.length === 0) {$("#search_results").html("");}
  
    url = "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&callback=?&srsearch=" + ss;
    $.getJSON(url, function(json) {

      for (var i = 0; i < json.query.search.length; i++) {
        
        var title = json.query.search[i].title;
        var snippet = json.query.search[i].snippet;
      
        html += '<div class="col-md-offset-3">';
        html += '  <div class="pad row">';
        html += '    <div class="col-md-8 dodo">';
        html += '      <div class="row">';
        html += '        <div class="col-md-12 story" id="title"><a href="http://en.wikipedia.org/wiki/' + title +'" target="_blank">' + title + '</a></div>';
        html += '        <div class="col-md-12 story double_line" id="desc">' + snippet + '</div>';
        html += '      </div>';
        html += '    </div>';
        html += '  </div>';
        html += '</div>';
      
      }
      
      $("#search_results").html(html);
    });

    ss = "";

  }
        
});