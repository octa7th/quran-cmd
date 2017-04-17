#!/usr/bin/env node

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getLineCount(filename, callback) {
  var count = 0;
  require('fs').createReadStream(classFile)
    .on('data', function(chunk) {
      for (var i = 0; i < chunk.length; ++i) {
        if (chunk[i] == 10) count++;
      }
    })
    .on('end', function() {
      if(typeof callback === 'function') {
      	callback(count);
      }
    });
}

function parseVerseFormat(format) {
	var sv = format.split(':');

	function extendDash(dashFormat) {
		var df = dashFormat.split('-');
		var start = parseInt(df[0], 10);
		var end = parseInt(df[1], 10);
		if(start > end) { return df; }
		var st = start;
		var data = [];
		while(st <= end) {
			data.push(st);
			st++;
		}
		return data;
	}

	var verses = sv[1].split(',').map(function (vr) {
		if(vr.match(/-/)) {
			return extendDash(vr);
		}
		return [parseInt(vr, 10)];
	});

	return {
		surah: sv[0],
		verses: verses
	};
}

function parseSurahFormat(format) {
	var fmt = format.split('|');
	return {
		name: fmt[0],
		totalVerse: fmt[1],
		min: parseInt(fmt[2].split('-')[0], 10),
		max: parseInt(fmt[2].split('-')[1], 10)
	};
}

var fs = require('fs');

function get_line(filename, line_no, callback) {
    fs.readFile(filename, function (err, data) {
      if (err) throw err;

      var lines = data.toString('utf-8').split("\n");

      if(+line_no > lines.length){
        return callback('File end reached without finding line', null);
      }

      callback(null, lines[+line_no]);
    });
}

var classFile = __dirname + '/classification.txt';
var surahFile = __dirname + '/surah-list.txt';
var translationFile = __dirname + '/quran-translation.txt';

getLineCount(classFile, function (count) {
	var selectedVerse = getRandomInt(1, count);
	// var selectedVerse = 785;
	get_line(classFile, selectedVerse - 1, function (err, data) {
		var verseData = parseVerseFormat(data);
		var selectedVerses = 0;
		if(verseData.verses.length > 0) {
			selectedVerses = getRandomInt(0, verseData.verses.length - 1);
		}
		var verseNums = verseData.verses[selectedVerses];

		get_line(surahFile, verseData.surah - 1, function (err, surahText) {
			var surah = parseSurahFormat(surahText);
			var i = 0;
			var allVerses = [];
			var getVerseText = function (callback) {
				if(typeof verseNums[i] === 'undefined') {
					callback(allVerses);
					return;
				}
				get_line(translationFile, surah.min + verseNums[i] - 2, function (err, verseText) {
					if(err) { return; }
					allVerses.push(verseText.split('|')[2]);
					i++;
					getVerseText(callback);
				});
			};

			var firstVerse = verseNums[0];
			var lastVerse = verseNums[verseNums.length - 1];
			var verseFormat = firstVerse;

			if(firstVerse !== lastVerse) {
				verseFormat += '-' + lastVerse;
			}

			getVerseText(function (allVerses) {
				process.stdout.write(allVerses.join(' ') + '\n');
				process.stdout.write('QS.' + surah.name + '(' + verseData.surah + '):' + verseFormat + '\n');
			});
		});
	});
});
