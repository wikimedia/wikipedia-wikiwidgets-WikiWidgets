/**
 * WikiWidgets initialisation script
 *
 * Written by Luis Felipe Schenone in 2016
 *
 * WikiWidgets is available under the GNU General Public License (http://www.gnu.org/licenses/gpl.html)
 */
WikiWidgets = {

	messages: {
		'de': {
			'wikiwidget-preview-tooltip': 'Zum Laden des WikiWidget klick hier',
		},
		'en': {
			'wikiwidget-preview-tooltip': 'Click to load the WikiWidget',
		},
		'es': {
			'wikiwidget-preview-tooltip': 'Click para cargar el WikiWidget',
		},
		'fr': {
			'wikiwidget-preview-tooltip': 'Click pour charger la WikiWidget',
		},
		'it': {
			'wikiwidget-preview-tooltip': 'Click per caricare il WikiWidget',
		},
		'pt': {
			'wikiwidget-preview-tooltip': 'Clique para carregar o WikiWidget',
		},
	},

	init: function () {
		// Set the language
		var lang = mw.config.get( 'wgUserLanguage' );
		if ( ! ( lang in WikiWidgets.messages ) ) {
			lang = 'en'; // Fallback to English
		}
		mw.messages.set( WikiWidgets.messages[ lang ] );

		// Load the previews
		$( '.WikiWidget' ).each( function () {
			var wrapper = $( this ),
				wikiwidget = wrapper.data( 'wikiwidget' ),
				preview = wrapper.data( 'preview' );

			if ( preview ) {

				var image = $( '<img>' ).attr({
					'src': preview,
					'title': mw.message( 'wikiwidget-preview-tooltip' )
				}).addClass( 'WikiWidgetPreview' ).css( 'cursor', 'pointer' );

				image.click( function () {
					WikiWidgets.load( wikiwidget );
				});

				wrapper.html( image );

			} else {
				WikiWidgets.load( wikiwidget );
			}
		});
	},

	load: function ( wikiwidget ) {
		if ( /^[^&<>=%#]*$/.test( wikiwidget ) ) {
			wikiwidget = encodeURIComponent( wikiwidget );
			mw.loader.load( '//commons.wikimedia.org/w/index.php?title=MediaWiki:WikiWidget-' + wikiwidget + '.js&action=raw&ctype=text/javascript' );
			mw.loader.load( '//commons.wikimedia.org/w/index.php?title=MediaWiki:WikiWidget-' + wikiwidget + '.css&action=raw&ctype=text/css', 'text/css' );
		}
	}
}

jQuery( WikiWidgets.init );