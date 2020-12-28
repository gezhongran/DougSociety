{
	"translatorID": "3cf79f02-f4af-4392-8b84-26c2bdae2607",
	"label": "nlc",
	"creator": "018<lyb018@gmail.com>",
	"target": "https?://vpn2\\.nlc\\.cn/prx",
	"minVersion": "3.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2020-12-28 03:38:46"
}

/*
	***** BEGIN LICENSE BLOCK *****

	Copyright © 2020 018<lyb018@gmail.com>

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

// eslint-disable-next-line
function attr(docOrElem,selector,attr,index){var elem=index?docOrElem.querySelectorAll(selector).item(index):docOrElem.querySelector(selector);return elem?elem.getAttribute(attr):null;}function text(docOrElem,selector,index){var elem=index?docOrElem.querySelectorAll(selector).item(index):docOrElem.querySelector(selector);return elem?elem.textContent:null;}function trim(content){return content.replace(/^[\xA0\s]+/gm, '').replace(/[\xA0\s]+$/gm, '').replace(/\n+/g, '\n').replace(/:\n+/g, ': ').replace(/]\n/g, ']').replace(/】\n/g, '】').replace(/\n\/\n/g, '/')}

// https://aurimasv.github.io/z2csl/typeMap.xml#map-statute

function doTag(item, data) {
	if (!data || data.length <= 0) return;
	const tags = data.split('；');
	for (var tag of tags) {
		item.tags.push(tag.trim());
	}
}

function detectWeb(doc, url) {
	return 'statute';
}

function doWeb(doc, url) {
	scrape(doc, url);
}

function scrape(doc, url) {
	if (!url || url.length <= 0) {
		return;
	}
	
	var itemType = detectWeb(doc, url);
	var item = new Zotero.Item(itemType);
	item.url = url;

	var abstractNote = '';
	var trs = doc.querySelectorAll('#content > div.detail_content > table > tbody > tr');
	for (var tr of trs) {
		var tds = tr.querySelectorAll('td');
		if (tds.length != 2) {
			continue;
		}

		var tdTitle = tds[0].textContent;
		var tdContent= tds[1].textContent;

		switch (tdTitle) {
			case '标准号':
				item.code = tdContent;

				if (tdContent.startsWith('GB')) {
					item.language = '国标';
				} else if (tdContent.startsWith('JB')) {
					item.language = '军标';
				} else if (tdContent.startsWith('QB')) {
					item.language = '企标';
				} else if (tdContent.startsWith('JGJ')) {
					item.language = '行标';
				}
				break;
			case '标准名称':
				item.title = tdContent;
				break;
			case '英文名称':
				item.shortTitle = tdContent;
				break;
			case '标准状态':
				item.extra = tdContent;
				break;
			case '代替标准':
				item.history = tdContent;
				break;
			case '实施日期':
				item.dateEnacted = tdContent;
				break;
			case '标准ICS号':
				item.publicLawNumber = tdContent;
				break;
			case '中标分类号':
				item.codeNumber = tdContent;
				break;
			default:
				break;
		}

		if (tdContent && tdContent.length > 0) {
			abstractNote += tdTitle + '：' + tdContent + '\n';
		}
	}
	item.abstractNote = abstractNote;
	
	var a = doc.querySelector('#content > div.detail_title > table > tbody > tr:nth-child(6) > td > a:nth-child(2)');
	if (a) {
		item.attachments.push({
			url: a.href,
			title: item.archive,
			mimeType: 'application/pdf'
		});
	}
	
	item.complete();
}

/** BEGIN TEST CASES **/
var testCases = [
]
/** END TEST CASES **/
