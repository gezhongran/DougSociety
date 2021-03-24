{
	"translatorID": "30ad4aab-a919-49fc-82ac-58b9d45eceb8",
	"label": "Jd",
	"creator": "018<lyb018@gmail.com>",
	"target": "^https?://item\\.jd\\.com/",
	"minVersion": "3.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2021-03-24 12:37:25"
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

function detectWeb(doc, url) {
	return 'book';
}

function doWeb(doc, url) {
	scrapeSpc(doc, url);
}

function scrapeSpc(document, url) {
	if (!url || url.length <= 0) {
		return;
	}
	
	var itemType = detectWeb(document, url);
	var newItem = new Zotero.Item(itemType);
	newItem.url = url;

	// 标题
	var title = document.querySelector('div.sku-name');
	if (title) {
		newItem.title = title.innerText.trim();
	}
	
	// 又名
	newItem.shortTitle = '';

	// 作者
	var au = document.querySelector('#p-author');
	if (au) {
		var authors = au.innerText.replace('著', '').trim().split('，');
		for (var a of authors) {
			newItem.creators.push({
				lastName: a,
				creatorType: 'author',
				fieldMode: 1
			});
		}
	}
	
	var describe = document.querySelector('div.p-parameter > ul');
	if (describe) {
		var infos = describe.innerText;
		infos = infos.replace(/^[\xA0\s]+/gm, '')
			.replace(/[\xA0\s]+$/gm, '')
			.replace(/\n+/g, '\n')
			.replace(/:\n+/g, ': ')
			.replace(/]\n/g, ']')
			.replace(/】\n/g, '】')
			.replace(/\n\/\n/g, '/');
		for (var section of Object.values(infos.split('\n'))) {
			if (!section || section.trim().length <= 0) continue;
	
			let index = section.indexOf('：');
			if (index <= -1) continue;
	
			let key = section.substr(0, index).trim();
			let value = section.substr(index + 1).trim();
			switch (key) {
				case "ISBN":
					newItem.ISBN = value;
					break;
				case "出版社":
					newItem.publisher = value;
					break;
				case "丛书名":
					newItem.series = value;
					break;
				case "出版时间":
					newItem.date = value;
					break;
				case "页数":
					newItem.numPages = value;
					break;
			}
		}
	}

	// 简介
	var descrip = document.querySelector('[text="内容简介"] div.book-detail-content');
	if (descrip) {
		newItem.abstractNote = descrip.innerText;
	}
	
	newItem.complete();
}


/** BEGIN TEST CASES **/
var testCases = [
	{
		"type": "web",
		"url": "http://product.dangdang.com/29113890.html",
		"items": [
			{
				"itemType": "book",
				"title": "个人理财（第11版）（金融学译丛）",
				"creators": [
					{
						"lastName": "E.托马斯?加曼 雷蒙德?E.福格",
						"creatorType": "author",
						"fieldMode": 1
					}
				],
				"date": "2020年08月",
				"ISBN": "9787300256535",
				"abstractNote": "《个人理财》时刻提醒读者记住一句至理名言:努力工作、学习、储蓄和投资，并且做好个人理财规划。\n本书修订至第11版，已成为世界范围内极有影响力的、知名的个人理财类图书。以“做什么、何时做以及怎样做”为主线，在个人理财方面为你出谋划策，指引你迈向成功。\n本书18章，分为五个部分，即理财规划、现金管理、收入和资产保护、投资以及退休和遗产规划。每个章节都力图阐述一些理财基本准则，以帮助读者在有生之年更好地进行个人理财。本修订版每章课后都安排了实践活动，新增了朱莉娅理财之旅连载故事，她成功的理财生涯贯穿整个具有挑战性的经济时期，在其故事的尾声，留给读者一个具有挑战性的问题: 根据她的想法，提出你的建议。\n《个人理财》(第11版)包括30多个新主题，新增100多个文本框、数十个新的名词以及海量的新扩展信息。新版本把个人理财中的各个知识碎片有机地连接起来，形成了一个具有全局性的知识体系，向读者展示了个人理财知识之间的内在联系。*后，预祝本书所有的读者都获得成功！",
				"extra": "52/52",
				"libraryCatalog": "Dangdang",
				"publisher": "中国人民大学出版社",
				"series": "金融学译丛",
				"url": "http://product.dangdang.com/29113890.html",
				"attachments": [],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	}
]
/** END TEST CASES **/
