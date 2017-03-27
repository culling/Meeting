function updateQuote(){
    $(".quoteText").html('<div style="text-align : center;" ><div class="loader" style="display: inline-block;"></div></div>');
    $(".quoteAuthor").html('');
    var url = "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1"
    $.ajaxSetup({ cache: false });
    $.getJSON(url,
     function(returnValue){
        var returnValueFirst = returnValue[0];
        console.log(returnValueFirst);
        $(".quoteText").html(returnValueFirst.content);
        $(".quoteAuthor").html(returnValueFirst.title);
    });
};


console.log("js is running");
  $(document).ready(function() {
    updateQuote();
  });

    