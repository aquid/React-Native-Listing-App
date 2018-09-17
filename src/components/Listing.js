import React from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { Card , Button, Icon} from 'react-native-elements';
import ListingService from '../services/ListingService';

class HomeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            listData: [],
            page: 0,
            limit: 10,
            order: 'desc',
            orderBy: 'createdAt',
            showInactive: false,
            mobileOpen: false
        };
    }

    static navigationOptions = {
        title: 'Listing',
        headerStyle: {
            backgroundColor: '#1976D2',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        }
    };
    listingService = new ListingService();

    getListingData = ({page, limit, order, orderBy, showInactive}) => {
        order = order ? order : this.state.order;
        orderBy = orderBy ? orderBy : this.state.orderBy;
        limit = limit ? limit : this.state.limit;
        showInactive = showInactive ? showInactive : this.state.showInactive;
        page = page || page === 0 ? page : this.state.page;

        let filterData = {
            skip: page * limit,
            limit: limit,
            order: `${orderBy} ${order.toUpperCase()}`,
            where: {isActive: !showInactive}
        };

        this.listingService.getListings(filterData)
            .then((listing) => {
                this.setState({
                    listData: listing.data,
                    isLoading: false,
                    page,
                    limit,
                    order,
                    orderBy,
                    showInactive,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    componentDidMount() {
        this.getListingData(this.state);
    };

     refresh = () => {
        this.setState({isLoading: true}, () => {
            this.getListingData(this.state);
        });
    };

    onPressListing = () => {
        console.log('item');
    };

    _keyExtractor = (item, index) => item.id;

    _renderListing = ({item}) => (
        <Card title={item.name} image={{uri: item.image}} containerStyle={{flex:1}}>
            <Text style={{marginBottom: 10}}>
                {item.description}
            </Text>
            <Button
                icon={<Icon name='code' color='#ffffff' />}
                backgroundColor='#03A9F4'
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='BOOK NOW' onPress={this.onPressListing}/>
        </Card>
    );

    render() {
        return (
            <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
                <FlatList
                    data={this.state.listData}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderListing}
                    refreshControl={<RefreshControl refreshing={this.state.isLoading} onRefresh={this.refresh}/>}
                />
            </View>
        );
    }
}

export default HomeComponent;