import $ from 'cash-dom';

import Image from '../custom-plugins/plugin-image-patch.js';

export default class Grid {
	static get toolbox() {
		return {
			title: 'Grid',
			icon: '<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" ></path> </svg>',
		};
	}

	constructor({ data, config, api, readOnly }) {
		this.data = data;
		this.api = api;
		this.config = config;
		this.items = [];
		if (data.length > 0) {
			for (const obj of data || []) {
				this.items.push(this.renderItem(new Image({ data: obj || {}, config, api, readOnly }), obj.text, obj.link));
			}
		} else {
			this.items.push(this.renderItem(new Image({ data: {}, config, api, readOnly })));
		}
	}

	render() {
		let wrapper = $(String.raw`<div class="grid len-${this.items.length}">
            <div class="items"></div>
            <div class="buttons">
                <button class="minus"><svg class="" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></button>
                <button class="plus"><svg class="" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></button>
            </div>
        </div>`);

		let resetClass = () => wrapper.attr('class', 'grid').attr('class', 'grid len-' + this.items.length);
		$('.plus', wrapper).on('click', () => {
			let item = this.renderItem(new Image({ data: {}, config: this.config, api: this.api, readonly: this.readOnly }));
			$('.items', wrapper).append(item.element);
			this.items.push(item);
			resetClass();
		});
		$('.minus', wrapper).on('click', () => {
			this.items.pop();
			$('.items', wrapper).children().last().remove();
			resetClass();
		});

		for (let { element } of this.items) {
			$('.items', wrapper).append(element);
		}

		return wrapper.get(0);
	}

	renderItem(image, paragraphText, link) {
		console.log('🚀 ~ file: grid.js ~ line 57 ~ link', link);
		let img = image.render();
		let itemWrapper = $(String.raw`<div class="img">
                <button style="display: ${paragraphText ? 'none' : 'block'}">Lägg till text</button>
                <p style="display: none;" class="${paragraphText ? 'visible' : ''}" contenteditable>${
			paragraphText || ''
		}</p>
                <div contenteditable class="link border" placeholder="länk">${link || ''}</div>
            </div>`).prepend(img);
		let button = $('button', itemWrapper).on('click', (event) => {
			event.stopPropagation();
			$('button', itemWrapper).css({ opacity: 0, position: 'absolute' });
			$('p', itemWrapper).addClass('visible').text('Lorem ipsum dolor sit amet.');
		});

		return { image, element: itemWrapper };
	}

	save(blockContent) {
		let values = this.items.map((item) => ({
			...item.image.save(),
			text: item.element.find('p').text(),
			link: item.element.find('.link').text(),
		}));
		// let values = this.items.map((item) => item.image.save());
		console.log('🚀 ~ file: grid.js ~ line 86 ~ save values', values);
		return values;
	}
}
