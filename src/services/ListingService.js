import API from './api';

class ListingService {
    getListings(filter){
        filter = filter? filter : {};
        return API.get(`Listings`,{params:{filter:filter}});
    }
}

export default ListingService;
