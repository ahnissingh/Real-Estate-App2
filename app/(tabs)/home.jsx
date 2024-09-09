import { FlatList, Text, View, Image, RefreshControl, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images, icons } from "../../constants";
import EmptyState from "../../components/EmptyState";
import { useGlobalContext } from "../../context/GlobalProvider";

// Mock data
export const mockProperties = [
    {
        $id: "1",
        title: "Luxury Penthouse in Downtown",
        description: "A stunning penthouse with panoramic city views, modern amenities, and spacious living areas.",
        location: "Downtown, City Center",
        price: "$1,200,000",
        bedrooms: 3,
        bathrooms: 2,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-WzHksuW0iuY0w49hgUySVs_Wc4NynNjAFg&s",
    },
    {
        $id: "2",
        title: "Cozy Cottage in the Countryside",
        description: "A charming cottage with a large garden, perfect for a peaceful retreat away from the city.",
        location: "Countryside, Green Valley",
        price: "$450,000",
        bedrooms: 2,
        bathrooms: 1,
        image: "https://a0.muscache.com/im/pictures/miso/Hosting-680317272011624770/original/ff245c3f-9a82-48fb-8975-7e57b28ad58e.jpeg?im_w=720",
    },
    {
        $id: "3",
        title: "Modern Apartment Near the Beach",
        description: "A stylish apartment just a short walk from the beach, featuring contemporary design and great amenities.",
        location: "Seaside, Beachfront",
        price: "$800,000",
        bedrooms: 2,
        bathrooms: 2,
        image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/412974023.jpg?k=ae1873029b7c155013c1b410993658d662eabb2980f5a51e578bdf04f5d04227&o=&hp=1",
    },
    {
        $id: "4",
        title: "Spacious Family Home with Pool",
        description: "A large family home with a private pool, perfect for entertaining and enjoying the outdoors.",
        location: "Suburbia, Oakwood",
        price: "$950,000",
        bedrooms: 4,
        bathrooms: 3,
        image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/379766211.jpg?k=b48f9289084514535c484273cca2de312bc0f0f3ecd8326383071162e6ee3ac3&o=&hp=1",
    },
    {
        $id: "5",
        title: "Elegant Townhouse in Historic District",
        description: "An elegant townhouse with classic architecture and modern updates, located in a historic district.",
        location: "Historic District, Old Town",
        price: "$600,000",
        bedrooms: 3,
        bathrooms: 2,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMox7zhEXcLGwITwrVr6fHpsJ3v2-cK3qOUg&s",
    },
    {
        $id: "6",
        title: "Contemporary Loft in Urban Area",
        description: "A chic loft with high ceilings and industrial design, situated in a vibrant urban area.",
        location: "Urban Area, Midtown",
        price: "$750,000",
        bedrooms: 1,
        bathrooms: 1,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbCPgr5Vdujj6ymeEFgPyyyhYhaW-aOypRJQ&s",
    },
    {
        $id: "7",
        title: "Renovated Farmhouse with Acreage",
        description: "A beautifully renovated farmhouse with extensive land, perfect for those seeking a rural lifestyle.",
        location: "Rural Area, Maple Ridge",
        price: "$1,000,000",
        bedrooms: 4,
        bathrooms: 2,
        image: "https://i.ytimg.com/vi/vHj7VpU10pA/sddefault.jpg",
    },
    {
        $id: "8",
        title: "Stylish Condo in the Heart of the City",
        description: "A modern condo with sleek design and convenient access to city amenities and attractions.",
        location: "City Center, Central Park",
        price: "$950,000",
        bedrooms: 2,
        bathrooms: 2,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDk-MiFfhmGzB3a9X2XKtNCgyLAaHQ7VByhw&s",
    },
    {
        $id: "9",
        title: "Charming Bungalow with Garden",
        description: "A lovely bungalow with a well-maintained garden, ideal for a cozy family home.",
        location: "Greenwood, Parkside",
        price: "$400,000",
        bedrooms: 2,
        bathrooms: 1,
        image: "https://img.pikbest.com/origin/09/29/49/33VpIkbEsTQw8.jpg!w700wp",
    },
    {
        $id: "10",
        title: "Luxurious Villa with Ocean View",
        description: "An exquisite villa offering breathtaking ocean views and luxurious living spaces.",
        location: "Coastal Area, Seaview Heights",
        price: "$2,500,000",
        bedrooms: 5,
        bathrooms: 4,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVSTmwmfZsC1ppw_iUusJ_DUJCP1NXWEoIbw&s",
    },
    // Add more posts as needed up to 30 entries
];


const Home = () => {
    const { user, likedProperties, handleLikeProperty } = useGlobalContext();
    const [refreshing, setRefreshing] = useState(false);
    const [properties, setProperties] = useState(mockProperties);
    const [selectedProperty, setSelectedProperty] = useState(null);

    const onRefresh = async () => {
        setRefreshing(true);
        // Simulate data fetching
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    };

    const renderItem = ({ item }) => (
        <View className="bg-gray-800 p-4 m-2 rounded-lg relative" activeOpacity={1}>
            <Image
                source={{ uri: item.image }}
                className="w-full h-40 rounded-lg"
                resizeMode="cover"
            />
            <Text className="text-white font-normal mt-2">{item.title}</Text>
            <Text className="text-gray-400">{item.location}</Text>

            <TouchableOpacity
                onPress={() => setSelectedProperty(item)}
                className="mt-2 bg-blue-500 p-2 rounded"
                activeOpacity={0.7}
            >
                <Text className="text-white text-center">View Details</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => handleLikeProperty(item)}
                className="absolute top-2 right-2"
                activeOpacity={0.7}
            >
                <Image
                    source={icons.heart}
                    className="w-8 h-8"
                    resizeMode="contain"
                    style={{ tintColor: likedProperties.some(liked => liked.$id === item.$id) ? 'red' : 'gray' }}
                />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
                data={properties}
                keyExtractor={(item) => item.$id}
                ListHeaderComponent={() => (
                    <View className="my-6 px-4 space-y-6">
                        <View className="justify-between items-start flex-row mb-6">
                            <View>
                                <Text className="font-pmedium text-sm text-gray-100">Welcome Back,</Text>
                                <Text className="text-2xl font-psemibold text-white">{user?.username}</Text>
                            </View>
                            <View className="mt-1.5">
                                <Image
                                    source={images.logo}
                                    className="w-[150px] -top-8"
                                    resizeMode="contain"
                                />
                            </View>
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState title="No Properties Found" />
                )}
                renderItem={renderItem}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />

            {selectedProperty && (
                <View className="absolute inset-0 bg-gray-800 bg-opacity-75 justify-center items-center p-4">
                    <View className="bg-gray-900 p-4 rounded-lg w-4/5">
                        <Text className="text-white text-xl font-bold mb-2">{selectedProperty.title}</Text>
                        <Text className="text-gray-400 mb-2">{selectedProperty.location}</Text>
                        <Text className="text-gray-300 mb-4">{selectedProperty.description}</Text>
                        <Text className="text-white text-lg">{selectedProperty.price}</Text>
                        <TouchableOpacity
                            onPress={() => setSelectedProperty(null)}
                            className="mt-4 bg-red-500 p-2 rounded"
                            activeOpacity={0.7}
                        >
                            <Text className="text-white text-center">Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
};

export default Home;

