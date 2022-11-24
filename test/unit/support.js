QUnit.module( "support", { afterEach: moduleTeardown } );

var computedSupport = getComputedSupport( jQuery.support );

function getComputedSupport( support ) {
	var prop,
		result = {};

	for ( prop in support ) {
		if ( typeof support[ prop ] === "function" ) {
			result[ prop ] = support[ prop ]();
		} else {
			result[ prop ] = support[ prop ];
		}
	}

	return result;
}

if ( includesModule( "css" ) ) {
	testIframe(
		"body background is not lost if set prior to loading jQuery (trac-9239)",
		"support/bodyBackground.html",
		function( assert, jQuery, window, document, color, support ) {
			assert.expect( 2 );
			var okValue = {
				"#000000": true,
				"rgb(0, 0, 0)": true
			};
			assert.ok( okValue[ color ], "color was not reset (" + color + ")" );

			assert.deepEqual( jQuery.extend( {}, support ), computedSupport,
				"Same support properties" );
		}
	);
}

// This test checks CSP only for browsers with "Content-Security-Policy" header support
// i.e. no old WebKit or old Firefox
testIframe(
	"Check CSP (https://developer.mozilla.org/en-US/docs/Security/CSP) restrictions",
	"mock.php?action=cspFrame",
	function( assert, jQuery, window, document, support ) {
		var done = assert.async();

		assert.expect( 2 );
		assert.deepEqual( jQuery.extend( {}, support ), computedSupport,
			"No violations of CSP polices" );

		supportjQuery.get( baseURL + "support/csp.log" ).done( function( data ) {
			assert.equal( data, "", "No log request should be sent" );
			supportjQuery.get( baseURL + "mock.php?action=cspClean" ).done( done );
		} );
	}
);

( function() {
	var browserKey, expected,
		userAgent = window.navigator.userAgent,
		expectedMap = {
			edge: {
				ajax: true,
				boxSizingReliable: true,
				checkClone: true,
				checkOn: true,
				clearCloneStyle: true,
				cssSupportsSelector: false,
				cors: true,
				createHTMLDocument: true,
				disconnectedMatch: true,
				focusin: false,
				getById: true,
				noCloneChecked: true,
				option: true,
				optSelected: true,
				pixelBoxStyles: true,
				pixelPosition: true,
				radioValue: true,
				reliableMarginLeft: true,
				reliableTrDimensions: false,
				scope: false,
				scrollboxSize: true,
				sortDetached: true,
				sortStable: true
			},
			ie_10_11: {
				ajax: true,
				boxSizingReliable: false,
				checkClone: true,
				checkOn: true,
				clearCloneStyle: false,
				cssSupportsSelector: false,
				cors: true,
				createHTMLDocument: true,
				disconnectedMatch: true,
				focusin: true,
				getById: true,
				noCloneChecked: false,
				option: true,
				optSelected: false,
				pixelBoxStyles: true,
				pixelPosition: true,
				radioValue: false,
				reliableMarginLeft: true,
				reliableTrDimensions: false,
				scope: false,
				scrollboxSize: true,
				sortDetached: true,
				sortStable: true
			},
			ie_9: {
				ajax: true,
				boxSizingReliable: false,
				checkClone: true,
				checkOn: true,
				clearCloneStyle: false,
				cssSupportsSelector: false,
				cors: false,
				createHTMLDocument: true,
				disconnectedMatch: false,
				focusin: true,
				getById: false,
				noCloneChecked: false,
				option: false,
				optSelected: false,
				pixelBoxStyles: true,
				pixelPosition: true,
				radioValue: false,
				reliableMarginLeft: true,
				reliableTrDimensions: false,
				scope: false,
				scrollboxSize: false,
				sortDetached: true,
				sortStable: true
			},
			chrome: {
				ajax: true,
				boxSizingReliable: true,
				checkClone: true,
				checkOn: true,
				clearCloneStyle: true,
				cssSupportsSelector: false,
				cors: true,
				createHTMLDocument: true,
				disconnectedMatch: true,
				focusin: false,
				getById: true,
				noCloneChecked: true,
				option: true,
				optSelected: true,
				pixelBoxStyles: true,
				pixelPosition: true,
				radioValue: true,
				reliableMarginLeft: true,
				reliableTrDimensions: true,
				scope: true,
				scrollboxSize: true,
				sortDetached: true,
				sortStable: true
			},
			safari: {
				ajax: true,
				boxSizingReliable: true,
				checkClone: true,
				checkOn: true,
				clearCloneStyle: true,
				cssSupportsSelector: false,
				cors: true,
				createHTMLDocument: true,
				disconnectedMatch: true,
				focusin: false,
				getById: true,
				noCloneChecked: true,
				option: true,
				optSelected: true,
				pixelBoxStyles: true,
				pixelPosition: true,
				radioValue: true,
				reliableMarginLeft: true,
				reliableTrDimensions: true,
				scope: true,
				scrollboxSize: true,
				sortDetached: true,
				sortStable: true
			},
			safari_9_10: {
				ajax: true,
				boxSizingReliable: true,
				checkClone: true,
				checkOn: true,
				clearCloneStyle: true,
				cssSupportsSelector: false,
				cors: true,
				createHTMLDocument: true,
				disconnectedMatch: true,
				focusin: false,
				getById: true,
				noCloneChecked: true,
				option: true,
				optSelected: true,
				pixelBoxStyles: false,
				pixelPosition: false,
				radioValue: true,
				reliableMarginLeft: true,
				reliableTrDimensions: true,
				scope: true,
				scrollboxSize: true,
				sortDetached: true,
				sortStable: true
			},
			firefox: {
				ajax: true,
				boxSizingReliable: true,
				checkClone: true,
				checkOn: true,
				clearCloneStyle: true,
				cssSupportsSelector: true,
				cors: true,
				createHTMLDocument: true,
				disconnectedMatch: true,
				focusin: false,
				getById: true,
				noCloneChecked: true,
				option: true,
				optSelected: true,
				pixelBoxStyles: true,
				pixelPosition: true,
				radioValue: true,
				reliableMarginLeft: true,
				reliableTrDimensions: false,
				scope: true,
				scrollboxSize: true,
				sortDetached: true,
				sortStable: true
			},
			firefox_102: {
				ajax: true,
				boxSizingReliable: true,
				checkClone: true,
				checkOn: true,
				clearCloneStyle: true,
				cssSupportsSelector: false,
				cors: true,
				createHTMLDocument: true,
				disconnectedMatch: true,
				focusin: false,
				getById: true,
				noCloneChecked: true,
				option: true,
				optSelected: true,
				pixelBoxStyles: true,
				pixelPosition: true,
				radioValue: true,
				reliableMarginLeft: true,
				reliableTrDimensions: false,
				scope: true,
				scrollboxSize: true,
				sortDetached: true,
				sortStable: true
			},
			firefox_60: {
				ajax: true,
				boxSizingReliable: true,
				checkClone: true,
				checkOn: true,
				clearCloneStyle: true,
				cssSupportsSelector: false,
				cors: true,
				createHTMLDocument: true,
				disconnectedMatch: true,
				focusin: false,
				getById: true,
				noCloneChecked: true,
				option: true,
				optSelected: true,
				pixelBoxStyles: true,
				pixelPosition: true,
				radioValue: true,
				reliableMarginLeft: false,
				reliableTrDimensions: true,
				scope: true,
				scrollboxSize: true,
				sortDetached: true,
				sortStable: true
			},
			ios: {
				ajax: true,
				boxSizingReliable: true,
				checkClone: true,
				checkOn: true,
				clearCloneStyle: true,
				cssSupportsSelector: false,
				cors: true,
				createHTMLDocument: true,
				disconnectedMatch: true,
				focusin: false,
				getById: true,
				noCloneChecked: true,
				option: true,
				optSelected: true,
				pixelBoxStyles: true,
				pixelPosition: true,
				radioValue: true,
				reliableMarginLeft: true,
				reliableTrDimensions: true,
				scope: true,
				scrollboxSize: true,
				sortDetached: true,
				sortStable: true
			},
			ios_9_10: {
				ajax: true,
				boxSizingReliable: true,
				checkClone: true,
				checkOn: true,
				clearCloneStyle: true,
				cssSupportsSelector: false,
				cors: true,
				createHTMLDocument: true,
				disconnectedMatch: true,
				focusin: false,
				getById: true,
				noCloneChecked: true,
				option: true,
				optSelected: true,
				pixelBoxStyles: false,
				pixelPosition: false,
				radioValue: true,
				reliableMarginLeft: true,
				reliableTrDimensions: true,
				scope: true,
				scrollboxSize: true,
				sortDetached: true,
				sortStable: true
			},
			ios_8: {
				ajax: true,
				boxSizingReliable: true,
				checkClone: true,
				checkOn: true,
				clearCloneStyle: true,
				cssSupportsSelector: false,
				cors: true,
				createHTMLDocument: false,
				disconnectedMatch: true,
				focusin: false,
				getById: true,
				noCloneChecked: true,
				option: true,
				optSelected: true,
				pixelBoxStyles: false,
				pixelPosition: false,
				radioValue: true,
				reliableMarginLeft: true,
				reliableTrDimensions: true,
				scope: true,
				scrollboxSize: true,
				sortDetached: true,
				sortStable: true
			},
			ios_7: {
				ajax: true,
				boxSizingReliable: true,
				checkClone: true,
				checkOn: true,
				clearCloneStyle: true,
				cssSupportsSelector: false,
				cors: true,
				createHTMLDocument: true,
				disconnectedMatch: true,
				focusin: false,
				getById: true,
				noCloneChecked: true,
				option: true,
				optSelected: true,
				pixelBoxStyles: false,
				pixelPosition: false,
				radioValue: true,
				reliableMarginLeft: true,
				reliableTrDimensions: true,
				scope: true,
				scrollboxSize: true,
				sortDetached: true,
				sortStable: true
			},
			android: {
				ajax: true,
				boxSizingReliable: true,
				checkClone: false,
				checkOn: false,
				clearCloneStyle: true,
				cssSupportsSelector: false,
				cors: true,
				createHTMLDocument: true,
				disconnectedMatch: true,
				focusin: false,
				getById: true,
				noCloneChecked: true,
				option: true,
				optSelected: true,
				pixelBoxStyles: false,
				pixelPosition: false,
				radioValue: true,
				reliableMarginLeft: false,
				reliableTrDimensions: true,
				scope: false,
				scrollboxSize: true,
				sortDetached: false,
				sortStable: false
			}
		};

	// Make the slim build pass tests.
	for ( browserKey in expectedMap ) {
		if ( !includesModule( "ajax" ) ) {
			delete expectedMap[ browserKey ].ajax;
			delete expectedMap[ browserKey ].cors;
		}
	}

	// Make the selector-native build pass tests.
	for ( browserKey in expectedMap ) {
		if ( !includesModule( "selector" ) ) {
			delete expectedMap[ browserKey ].cssSupportsSelector;
			delete expectedMap[ browserKey ].disconnectedMatch;
			delete expectedMap[ browserKey ].getById;
			delete expectedMap[ browserKey ].scope;
			delete expectedMap[ browserKey ].sortDetached;
			delete expectedMap[ browserKey ].sortStable;
		}
	}

	if ( /edge\//i.test( userAgent ) ) {
		expected = expectedMap.edge;
	} else if ( /(msie 10\.0|trident\/7\.0)/i.test( userAgent ) ) {
		expected = expectedMap.ie_10_11;
	} else if ( /msie 9\.0/i.test( userAgent ) ) {
		expected = expectedMap.ie_9;
	} else if ( /chrome/i.test( userAgent ) ) {

		// Catches Chrome on Android as well (i.e. the default
		// Android browser on Android >= 4.4).
		expected = expectedMap.chrome;
	} else if ( /\b(?:9|10)\.\d+(\.\d+)* safari/i.test( userAgent ) ) {
		expected = expectedMap.safari_9_10;
	} else if ( /firefox\/[456]\d\b/i.test( userAgent ) ) {
		expected = expectedMap.firefox_60;
	} else if ( /firefox\/(?:[789]\d|102)\b/i.test( userAgent ) ) {
		expected = expectedMap.firefox_102;
	} else if ( /firefox/i.test( userAgent ) ) {
		expected = expectedMap.firefox;
	} else if ( /android 4\.[0-3]/i.test( userAgent ) ) {
		expected = expectedMap.android;
	} else if ( /iphone os (?:9|10)_/i.test( userAgent ) ) {
		expected = expectedMap.ios_9_10;
	} else if ( /iphone os 8_/i.test( userAgent ) ) {
		expected = expectedMap.ios_8;
	} else if ( /iphone os 7_/i.test( userAgent ) ) {
		expected = expectedMap.ios_7;
	} else if ( /(?:iphone|ipad);.*(?:iphone)? os \d+_/i.test( userAgent ) ) {
		expected = expectedMap.ios;
	} else if ( /\b\d+(\.\d+)+ safari/i.test( userAgent ) ) {
		expected = expectedMap.safari;
	}

	QUnit.test( "Verify that support tests resolve as expected per browser", function( assert ) {
		if ( !expected ) {
			assert.expect( 1 );
			assert.ok( false, "Known client: " + userAgent );
		}

		var i, prop,
			j = 0;

		for ( prop in computedSupport ) {
			j++;
		}

		// Add an assertion per undefined support prop as it may
		// not even exist on computedSupport but we still want to run
		// the check.
		for ( prop in expected ) {
			if ( expected[ prop ] === undefined ) {
				j++;
			}
		}

		assert.expect( j );

		for ( i in expected ) {
			if ( includesModule( "ajax" ) || i !== "ajax" && i !== "cors" ) {
				assert.equal( computedSupport[ i ], expected[ i ],
					"jQuery.support['" + i + "']: " + computedSupport[ i ] +
						", expected['" + i + "']: " + expected[ i ] );
			} else {
				assert.ok( true, "no ajax; skipping jQuery.support['" + i + "']" );
			}
		}
	} );

	QUnit.test( "Verify most support tests are failing in one " +
		"of tested browsers", function( assert ) {

		var prop, browserKey, supportTestName,
			i = 0,
			supportProps = {},
			failingSupportProps = {},
			whitelist = {
				ajax: true
			};

		for ( prop in computedSupport ) {
			i++;
		}

		// Add an assertion per undefined support prop as it may
		// not even exist on computedSupport but we still want to run
		// the check.
		for ( prop in expected ) {
			if ( expected[ prop ] === undefined ) {
				i++;
			}
		}

		assert.expect( i );

		// Record all support props and the failing ones and ensure everyone
		// except a few on a whitelist are failing at least once.
		for ( browserKey in expectedMap ) {
			for ( supportTestName in expectedMap[ browserKey ] ) {
				supportProps[ supportTestName ] = true;
				if ( !expectedMap[ browserKey ][ supportTestName ] ) {
					failingSupportProps[ supportTestName ] = true;
				}
			}
		}

		for ( supportTestName in supportProps ) {
			assert.ok( whitelist[ supportTestName ] || failingSupportProps[ supportTestName ],
				"jQuery.support['" + supportTestName + "'] always succeeds; remove it?" );
		}
	} );

} )();
