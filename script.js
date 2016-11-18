"use strict";

var $ = jQuery;
$(function(){
	$('button').click(function() {
	$(this).parent().remove();

	})

var itemCount = $('.todo_list li').length;

	function() itemCount {
		console.log(itemCount);
		$('.todo_count').text(itemCount + ' to do');
	}

})