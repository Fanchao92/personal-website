$(document).ready(() => {
	var imgDiv = $('.myProjectImgDiv #proj-img-div');
	var carouselDiv = $('#myModal div#myCarousel');
	var carouselIndDiv = $(carouselDiv).children('ol.carousel-indicators');
	var carouselContent = $(carouselDiv).children('div.carousel-inner');
	var carouselIndList = $(carouselIndDiv).children();
	var carouselItemList = $(carouselContent).children();

	imgDiv.on("click", function(event) {
		var imgId = $(event.target).attr('id');
		var imgIdNumStr = imgId.split('-')[ 1 ];
		var imgIdNum = parseInt(imgIdNumStr);

		for(var idx = 0; idx < imgDiv.children().length; idx++) {
			if(idx == imgIdNum) {
				$(carouselIndList[ idx ]).attr("class", "active");
				$(carouselItemList[ idx ]).attr("class", "item active");
			} else {
				if($(carouselIndList[ idx ]).attr("class")) {
					$(carouselIndList[ idx ]).removeAttr("class");
				}
				$(carouselItemList[ idx ]).attr("class", "item");
			}
		}
	});
});