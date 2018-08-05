$( document).ready(function() {
	$("#test").hide();

	$("#add").click(function() {
		$("#test").show();

	})
	$("#remove").click(function() {
		$(".icons").css("display","inline");
		removeItem();


	})
	$("#submit").submit(function(e) {
		var text = "<li>" + $("#test").val() + "<i class=' icons fa fa-close'></i> </li>";
		$("#list").append(text);
		$("#test").val("");
		$("#test").hide();
		

		e.preventDefault();

	})

	function removeItem() {
		$('li').click(function(){
			$(this).remove();
			$(".icons").css("display","none");

		})

	}
		
});