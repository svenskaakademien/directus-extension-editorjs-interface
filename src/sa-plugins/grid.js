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
		console.log('🚀 ~ file: grid.js ~ line 14 ~ constructor');
		this.data = data;
		this.api = api;
		this.config = config;
		this.images = [];
		for (const obj of data) {
			this.images.push(new Image({ data: obj || {}, config, api, readOnly }));
		}
	}

	render() {
		console.log('grid render');
		// let input = $('<input>');
		// input.val(this.data?.url || '');
		// return input.get(0);
		let wrapper = $(String.raw`<div class="grid">
            <div class="items"></div>
            <div class="buttons">
                <button class="minus"><svg class="" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></button>
                <button class="plus"><svg class="" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></button>
            </div>
        </div>`);

		$('.plus', wrapper).on('click', () => {
			let img = new Image({ data: {}, config: this.config, api: this.api, readOnly: this.readOnly });
			this.images.push(img);
			$('.items', wrapper).append(img.render());
		});
		$('.minus', wrapper).on('click', () => {
			this.images.pop();
			$('.items', wrapper).children().last().remove();
		});

		for (let image of this.images) {
			$('.items', wrapper).append(image.render());
		}

		return wrapper.get(0);
	}

	save(blockContent) {
		let values = this.images.map((image) => image.save());
		return values;
	}
}
