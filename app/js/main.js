$(document).ready(function(){
	
	function resize_block() {
		var width = $(window).width();
		var resize_block = $('section.advantages [class*=col]:last-child');
		var resize_block_two = $('section.additional-services [class*=col]:first-child');
		resize_block.css('height', 'unset');
		resize_block_two.css('height', 'unset');
		var paddings = (width < 992) ? 50 : 84;
		var newSize = resize_block.height() + (resize_block.height() / 2 + paddings);
		var newSize_two = resize_block_two.height() + (resize_block_two.height() / 2 + paddings);
		resize_block.height(newSize);
		resize_block_two.height(newSize);
	}

	resize_block();
	$(window).resize(function(){
		resize_block();
	});

	$('.toggler').on('click', function() {
		if($('.header .menu').hasClass('mobile_hide')) {
			
			$('.header .menu').addClass('mobile_show');
			$('.header .menu').fadeIn('slow');
			$('.header .menu').removeClass('mobile_hide');
		} else {
			$('.header .menu').removeClass('mobile_show');
			$('.header .menu').addClass('mobile_hide');
			$('.header .menu').fadeOut('slow');
		}
	});

$('#linksModal').on('show.bs.modal', function (event) {

	var button = $(event.relatedTarget).closest('.track') // Button that triggered the modal

	var yandexMusicData = button.data('links_yandexmusic'); // Extract info from data-* attributes
	var spotifyData = button.data('links_spotify');
	var appleMusicData = button.data('links_applemusic');
	var iTunesData = button.data('links_itunes');
	var googlePlayData = button.data('links_googleplay');
	console.log(yandexMusicData);
	// If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
	// Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
	var modal = $(this);

	var yandexMusicInput = $('.link_yandexMusic .form-control');
	var spotifyInput = $('.link_spotify .form-control');
	var appleMusicInput = $('.link_appleMusic .form-control');
	var iTunesInput = $('.link_iTunes .form-control');
	var googlePlayInput = $('.link_googlePlay .form-control');

	modal.find(yandexMusicInput).val(yandexMusicData);
	modal.find(spotifyInput).val(spotifyData);
	modal.find(appleMusicInput).val(appleMusicData);
	modal.find(iTunesInput).val(iTunesData);
	modal.find(googlePlayInput).val(googlePlayData);

});

	var clipboard = new Clipboard('.btn_clipboard');

	clipboard.on('success', function(e) {
		$('.toast').toast('show');
	    console.info('Action:', e.action);
	    console.info('Text:', e.text);
	    console.info('Trigger:', e.trigger);

	    e.clearSelection();
	});

	clipboard.on('error', function(e) {
	    console.error('Action:', e.action);
	    console.error('Trigger:', e.trigger);
	});

	$('.toast').toast({
		delay: 1500
	});

	bsCustomFileInput.init();

	$('input[name="RadioTypeRequisites"').on('change', function(){

		var nameIpCol = $('input[name="nameIp"]').closest('[class*="col"]');
		var nameBankCol = $('input[name="nameBank"]').closest('[class*="col"]');
		var snilsCol = $('input[name="snils"]').closest('[class*="col"]');

		if($(this).val() == 'fizlico') {

			if(!nameIpCol.hasClass('d-none')) {
				nameIpCol.addClass('d-none')
			}

		//	if(nameBankCol.hasClass('d-none')) {
		//		nameBankCol.removeClass('d-none')
		//	}

			if(snilsCol.hasClass('d-none')) {
				snilsCol.removeClass('d-none')
			}

		}

		if($(this).val() == 'ip') {

			if(nameIpCol.hasClass('d-none')) {
				nameIpCol.removeClass('d-none')
			}

			if(!snilsCol.hasClass('d-none')) {
				snilsCol.addClass('d-none')
			}

		}

	});


	$('#TrackInfoModal').on('show.bs.modal', function (event) {

		var button = $(event.relatedTarget).closest('.track') // Button that triggered the modal

		var nameTrack = button.data('name_track'); // Extract info from data-* attributes
		var authorText = button.data('author_text');
		var authorMusic = button.data('author_music');
		var coverImg = button.data('cover_img');
		console.log(nameTrack);
		// If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
		// Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
		var modal = $(this);

		modal.find($('.name-track > td:last-child')).text(nameTrack);
		modal.find($('.author-text > td:last-child')).text(authorText);
		modal.find($('.author-music > td:last-child')).text(authorMusic);
		modal.find($('.cover-img > td:last-child > img')).attr('src', coverImg);

	});

});
