import { FlatList, TouchableOpacity, View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "../../components/EmptyState";
import InfoBox from "../../components/InfoBox";
import { useGlobalContext } from "../../context/GlobalProvider";
import { icons } from "../../constants";

const Profile = () => {
    const { user, likedProperties, handleLikeProperty } = useGlobalContext();

    const renderItem = ({ item }) => (
        <View className="bg-gray-800 p-4 m-2 rounded-lg">
            <Image
                source={{ uri: item.image }}
                className="w-full h-40 rounded-lg"
                resizeMode="cover"
            />
            <Text className="text-white font-normal mt-2">{item.title}</Text>
            <Text className="text-gray-400">{item.location}</Text>
            <TouchableOpacity
                onPress={() => handleLikeProperty(item)}
                className="mt-2 bg-blue-500 p-2 rounded"
                activeOpacity={0.7}
            >
                <Text className="text-white text-center">
                    {likedProperties.some(liked => liked.$id === item.$id) ? "Unlike" : "Like"}
                </Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
                data={likedProperties}
                keyExtractor={(item) => item.$id}
                ListEmptyComponent={() => (
                    <EmptyState title="No Liked Apartments" />
                )}
                ListHeaderComponent={() => (
                    <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
                        <TouchableOpacity
                            onPress={async () => {
                                // Handle logout logic here
                            }}
                            className="flex w-full items-end mb-10"
                        >
                            <Image
                                source={icons.logout}
                                resizeMode="contain"
                                className="w-6 h-6"
                            />
                        </TouchableOpacity>

                        <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
                            <Image
                                source={{ uri: user?.avatar }}
                                className="w-[90%] h-[90%] rounded-lg"
                                resizeMode="cover"
                            />
                        </View>

                        <InfoBox
                            title={user?.username}
                            containerStyles="mt-5"
                            titleStyles="text-lg"
                        />
                    </View>
                )}
                renderItem={renderItem}
            />
        </SafeAreaView>
    );
};

export default Profile;
