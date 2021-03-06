myApp.service('dataStorageService', dataStorageService);

dataStorageService.$inject = [ 'storageService', 'ITEMS' ];

function dataStorageService(storageService, ITEMS) {

    function getFaveItems() {
        return storageService.getItem(ITEMS.HOUSE) || [];
    }

    function setFaveItems(value) {
        var index        = findItem(value),
            currentItems = getFaveItems();

        index === -1 ?
            currentItems.push(value) :
            currentItems.splice(index, 1);

        storageService.setItem(ITEMS.HOUSE, currentItems);
        return findItem(value);
    }

    function findItem(item) {
        var items = getFaveItems(),
            index = -1;

        for (var i = 0; i < items.length; i++) {
            if (items[ i ].img_url === item.img_url) {
                index = i;
            }
        }

        return index;
    }

    function getRecentSearches() {
        return storageService.getItem(ITEMS.SEARCHES) || [];
    }

    function setRecentSearch(currentLocation) {
        if (!currentLocation.length) {
            return false;
        }
        var recentSearch = getRecentSearches();
        if (recentSearch.length > 4) {
            recentSearch.pop();
        }
        recentSearch.unshift(currentLocation);

        storageService.setItem(ITEMS.SEARCHES, recentSearch);
        return recentSearch;

    }

    return {
        getFaveItems: getFaveItems,
        setFaveItems: setFaveItems,
        findItem: findItem,
        setRecentSearch: setRecentSearch,
        getRecentSearches: getRecentSearches
    };
}
