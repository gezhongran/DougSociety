{
	"translatorID": "c32e2c38-e319-4c94-ab2e-7a0564147ec2",
	"label": "uRead",
	"creator": "018<lyb018@gmail.com>",
	"target": "https?://uread.today/((ubook)|(book)|(search))",
	"minVersion": "3.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2021-11-24 07:21:19"
}

/*
	***** BEGIN LICENSE BLOCK *****

	Copyright © 2021 018<lyb018@gmail.com>

	This file is part of Zotero.

	Zotero is free software: you can redistribute it and/or modify
	it under the terms of the GNU Affero General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	Zotero is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
	GNU Affero General Public License for more details.

	You should have received a copy of the GNU Affero General Public License
	along with Zotero. If not, see <http://www.gnu.org/licenses/>.

	***** END LICENSE BLOCK *****
*/

function attr(docOrElem, selector, attr, index) {
	var elem = index ? docOrElem.querySelectorAll(selector).item(index) : docOrElem.querySelector(selector);
	return elem ? elem.getAttribute(attr) : null;
}

function text(docOrElem, selector, index) {
	var elem = index ? docOrElem.querySelectorAll(selector).item(index) : docOrElem.querySelector(selector);
	return elem ? elem.innerText : '';
}

function value(docOrElem, selector, index) {
	var elem = index ? docOrElem.querySelectorAll(selector).item(index) : docOrElem.querySelector(selector);
	return elem ? elem.value : '';
}

function trim(content) {
	return content.replace(/^[\xA0\s]+/gm, '')
		.replace(/[\xA0\s]+$/gm, '')
		.replace(/\n+/g, '\n')
		.replace(/:\n+/g, ': ')
		.replace(/]\n/g, ']')
		.replace(/】\n/g, '】')
		.replace(/\n\/\n/g, '/')
}

// https://aurimasv.github.io/z2csl/typeMap.xml#map-book
function detectType(doc) {
	return 'book';
}

function detectWeb(doc, url) {
	if (url.includes('/search') || url.includes('/ubook')) {
		return getSearchResults(doc, true) ? 'multiple' : false;
	} else {
		return detectType(doc);
	}
	
	return false;
}

function getSearchResults(doc, checkOnly) {
	var items = {};
	var found = false;
	var rows = doc.querySelectorAll('#result-list .result-item');
	for (let row of rows) {
		let a = row;

		if (checkOnly) return true;
		
		let url = a.href;

		let title = ZU.trimInternal(row.querySelector('.item-title').textContent);
		
		found = true;
		items[url] = title;
	}
	return found ? items : false;
}

function doWeb(doc, url) {
	if (detectWeb(doc, url) == "multiple") {
		let results = getSearchResults(doc, false);
		Z.debug('Zotero.selectItems results: ' + JSON.stringify(results));
		Zotero.selectItems(results, function (items) {
			if (items) {
				Z.debug('Zotero.selectItems items: ' + JSON.stringify(items));
				for (let item in items) {
					let u = getBookGetAPIURL(getDoi(item));
					Z.debug('url: ' + u);
					Zotero.Utilities.HTTP.doGet(u, function (retString) {
						Z.debug('ret: ' + retString);
						scrapeJson(retString, item);
					});
				}
			} else {
				Z.debug('Zotero.selectItems items: null');
			}
		});
	} else {
		scrape(doc, url);
	}
}

function scrape(doc, url) {
	var itemType = detectType(doc);
	var item = new Zotero.Item(itemType);
	
	var zoteroCapture = doc.getElementById('zotero-capture');
	if (zoteroCapture && zoteroCapture.getAttribute('visibled')) {
		item.title = value(doc, '#zotero-title');
		var creators = doc.querySelectorAll('.zotero-class-creators');
		for (let creator of creators) {
			var creatorType = creator.querySelector('.creatorType');
			var lastName = creator.querySelector('.lastName input');
			item.creators.push({
				lastName: lastName.value,
				creatorType: creatorType.getAttribute('creatorType'),
				fieldMode: 1
			});
		}
		item.abstractNote = value(doc, '#zotero-abstractNote');
		item.series = value(doc, '#zotero-series');
		item.seriesNumber = value(doc, '#zotero-seriesNumber');
		item.volume = value(doc, '#zotero-volume');
		item.numberOfVolumes = value(doc, '#zotero-numberOfVolumes');
		item.edition = value(doc, '#zotero-edition');
		item.place = value(doc, '#zotero-place');
		item.publisher = value(doc, '#zotero-publisher');
		item.date = value(doc, '#zotero-date');
		item.numPages = value(doc, '#zotero-numPages');
		item.language = value(doc, '#zotero-language');
		item.ISBN = value(doc, '#zotero-ISBN');
		item.shortTitle = value(doc, '#zotero-shortTitle');
		item.url = value(doc, '#zotero-url');
		item.archive = value(doc, '#zotero-archive');
		item.archiveLocation = value(doc, '#zotero-archiveLocation');
		item.callNumber = value(doc, '#zotero-callNumber');
		item.rights = value(doc, '#zotero-rights');
		item.extra = value(doc, '#zotero-extra');
		
		let zoteroNote1Enabled = doc.querySelector('#zotero-note1-enabled input');
		if (zoteroNote1Enabled.checked) {
			let notes = '<p><strong>初步评价</strong></p>\n<p>';
			let zoteroNote1 = doc.querySelector('#zotero-note1');
			notes += zoteroNote1.value.replace(/\t/g, '　') + '</p>';
			
			item.notes.push({
				note: notes
			});
		}
		
		let zoteroNote2Enabled = doc.querySelector('#zotero-note2-enabled input');
		if (zoteroNote2Enabled.checked) {
			let cover_url = doc.getElementById('zotero-coverurl');
			let notes = '<p><strong>目录</strong></p>\n<p><img src="' + cover_url.src + '" alt="" style="max-width: 135px; max-height: 200px;" /></p><p>';
			let zoteroNote2 = doc.querySelector('#zotero-note2 textarea');
			notes += zoteroNote2.value.replace(/\t/g, '　').replace(/\n/g, '<br/>') + '</p>';
			
			item.notes.push({
				note: notes
			});
		}
		
		let zoteroNote3Enabled = doc.querySelector('#zotero-note3-enabled input');
		if (zoteroNote3Enabled.checked) {
			let note3 = doc.getElementById('zotero-note3');
			let notes = '<p><strong>豆瓣短评</strong></p>\n' + note3.outerHTML;
			item.notes.push({
				note: notes
			});
		}
		
		let zoteroTagsEnabled = doc.querySelector('#zotero-tags-enabled input');
		if (zoteroTagsEnabled.checked) {
			var tags = doc.querySelectorAll('#zotero-tags .tag');
			for (let tag of tags) {
				item.tags.push({
					tag: tag.innerText.trim()
				});
			}
		}
		
		let zoteroAttachment1Enabled = doc.querySelector('#zotero-attachment1-enabled input');
		if (zoteroAttachment1Enabled && zoteroAttachment1Enabled.checked) {
			var a = doc.querySelector('#zotero-attachment1');
			item.attachments.push({
				title: a.textContent,
				url: a.href,
				linkMode: a.getAttribute('linkMode'),
				mimeType: a.getAttribute('mimeType')
			});
		}
		let zoteroAttachment2Enabled = doc.querySelector('#zotero-attachment2-enabled input');
		if (zoteroAttachment2Enabled && zoteroAttachment2Enabled.checked) {
			var a = doc.querySelector('#zotero-attachment2');
			item.attachments.push({
				title: a.textContent,
				url: a.href,
				linkMode: a.getAttribute('linkMode'),
				mimeType: a.getAttribute('mimeType')
			});
		}
		let zoteroAttachment3Enabled = doc.querySelector('#zotero-attachment3-enabled input');
		if (zoteroAttachment3Enabled && zoteroAttachment3Enabled.checked) {
			var a = doc.querySelector('#zotero-attachment3');
			item.attachments.push({
				title: a.textContent,
				url: a.href,
				linkMode: a.getAttribute('linkMode'),
				mimeType: a.getAttribute('mimeType')
			});
		}
	} else {
		item.url = url;
		item.title = text(doc, '#title');
		item.publisher = text(doc, '#publisher');
		item.date = text(doc, '#date');
		item.ISBN = text(doc, '#isbn');
		item.numPages = text(doc, '#pages');
		item.archiveLocation = text(doc, '#clcs a:last-child span:nth-child(2)');
		item.archive = text(doc, '#subjects a:last-child').replace(/\D/g, '');
		item.abstractNote = text(doc, '#abstractNote');
		item.edition = item.title.replace(/[^(第\d+版)]/g, '').replace(/\(|\)|第|版/g, '');
		
		var authors = doc.querySelectorAll('#author a');
		for (let author of authors) {
			item.creators.push({
				lastName: author.innerText,
				creatorType: 'author',
				fieldMode: 1
			});
		}
		var translators = doc.querySelectorAll('#translator a');
		for (let translator of translators) {
			item.creators.push({
				lastName: translator.innerText,
				creatorType: 'translator',
				fieldMode: 1
			});
		}
		var tags = doc.querySelectorAll('#tags a span');
		for (let tag of tags) {
			item.tags.push(tag.innerText);
		}
		item.extra = text(doc, '#doubanscore .score-value') + '/' + (text(doc, '#doubanscore .comments-value')||'').replace(/\(|\)|[\u4e00-\u9fa5]/g, '') + '|' + text(doc, '#score')
		
		let cover_url = attr(doc, '#cover', 'src');
		let u = getBookCataloguesAPIURL(getDoi(url));
		Zotero.Utilities.HTTP.doGet(u, function (retString) {
			let ret = JSON.parse(retString);
			if (ret.resultcode !== 1) {
				return;
			}
			let notes = '<p><strong>目录</strong></p>\n<p><img src="' + cover_url + '" alt="" style="max-width: 135px; max-height: 200px;" /></p><p>';
			let maxtier = 1;
			for (let content of ret.data) {
				maxtier = Math.max(content.tier, maxtier);
			}
			for (let json of ret.data) {
				notes += '　'.repeat(json.tier - 1) + (maxtier > 1 && json.tier === 1 ? '<b>' : '') +  json.content + (maxtier > 1 && json.tier === 1 ? '</b>' : '') + '<br >';
			}
			notes += '</p>';
			
			item.notes.push({
				note: notes
			});
		});
	}
	
	item.complete();
}


function scrapeJson(retString, url) {
	let ret = JSON.parse(retString);
	if (ret.resultcode !== 1) {
		return;
	}
	
	var item = new Zotero.Item('book');
	let json = ret.data;
	item.url = url;
	item.title = json.title + (json.subtitle ? ('——' + json.subtitle) : '') + (json.edition && json.edition !== '1' && json.edition !== '一' ? `(第${json.edition}版)` : '');
	item.publisher = json.publishers.join(',');
	item.date = json.date;
	item.ISBN = json.isbn;
	item.numPages = json.pages;
	item.archiveLocation = json.clc;
	item.archive = json.subject;
	item.abstractNote = json.abstract_note;
	item.edition = json.edition;
	
	for (let author of json.authors) {
		if (author.type === 1) {
			item.creators.push({
				lastName: (author.prefix ? ('[' + author.prefix + ']') : '') + author.name,
				creatorType: 'author',
				fieldMode: 1
			});
		} else if (author.type === 2) {
			item.creators.push({
				lastName: author.name,
				creatorType: 'translator',
				fieldMode: 1
			});
		}
	}
	for (let tag of json.tags) {
		item.tags.push(tag);
	}
	for (let score_ref of json.score_refs) {
		if (score_ref.domin === 'douban.com') {
			item.extra = score_ref.value + '/' + score_ref.comments;
		}
	}
	
	item.extra += (item.extra ? '|' : '') + json.score;
	
	let cover_url = json.cover_url;
	let u = getBookCataloguesAPIURL(getDoi(url));
	Zotero.Utilities.HTTP.doGet(u, function (retString0) {
		let ret = JSON.parse(retString0);
		if (ret.resultcode !== 1) {
			return;
		}
		let notes = '<p><strong>目录</strong></p>\n<p><img src="' + cover_url + '" alt="" style="max-width: 135px; max-height: 200px;" /></p><p>';
		for (let json of ret.data) {
			notes += '　'.repeat(json.tier - 1) + (json.tier === 1 ? '<b>' : '') +  json.content + (json.tier === 1 ? '</b>' : '') + '<br >';
		}
		notes += '</p>';
		
		item.notes.push({
			note: notes
		});
	});
	
	item.complete();
}

// http://uread.today/book?doi=8e141c7b94434767b62d6e2cb3caf392
// http://api.uread.today/master/anon/book/get?doi=8e141c7b94434767b62d6e2cb3caf392
// http://uread.today/book?doi=8e141c7b94434767b62d6e2cb3caf392
// http://api.uread.today/master/anon/book/get?doi=8e141c7b94434767b62d6e2cb3caf392
function getBookGetAPIURL(doi) {
	return `http://api.uread.today/master/anon/book/get?doi=${doi}`;
}
function getBookCataloguesAPIURL(doi) {
	return `http://api.uread.today/master/anon/book/list_catalogues?doi=${doi}`;
}
function getDoi(url) {
	if (!url) return false;
	
	var doi = url.match(/[?&]doi=([^&#]*)/i);

	/* eslint-disable no-undef */
	return doi && doi[1] ? doi[1] : '';
}
/** BEGIN TEST CASES **/
var testCases = []
/** END TEST CASES **/
