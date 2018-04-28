const CacheLinksKey = "links";
const CacheTagsKey = "tags";

export default class Cache {
	static storeLinks(links) {
		const linksToStore = links || [];
		window.localStorage.setItem(CacheLinksKey, JSON.stringify(linksToStore));
	}

	static links() {
		const stringValue = window.localStorage.getItem(CacheLinksKey);
		if (stringValue) {
			return JSON.parse(stringValue);
		}
		return [];
	}

	static storeTags(tags) {
		const tagsToStore = tags || [];
		window.localStorage.setItem(CacheTagsKey, JSON.stringify(tagsToStore));
	}

	static tags() {
		const stringValue = window.localStorage.getItem(CacheTagsKey);
		if (stringValue) {
			return JSON.parse(stringValue);
		}
		return [];
	}

	static empty() {
		window.removeItem(CacheTagsKey);
		window.removeItem(CacheLinksKey);
	}

}
