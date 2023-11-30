import {
    View,
    Text,
    Box,
    VStack,
    HStack,
    Image,
    Input,
    Button,
    InputField,
    ButtonText,
    Icon
} from '@gluestack-ui/themed';
import { useEffect, useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { useAppSelector } from '../../hooks/useRedux';
import { UserInfo, session, selectAuth } from '../../store/auth';
import { useDispatch } from 'react-redux';
import { authApi } from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AvatarInfo } from '../../types/avatarCatType';
import { AlertDiamonds } from '../../components';
import { Plus } from 'lucide-react-native';
import { GetUserAuthPayload } from '../../api/authApi';
import { ScrollView } from '@gluestack-ui/themed';

export default function BuyAvatarPage({ navigation }: any) {
    const [selectedAvatar, setSelectedAvatar] = useState<string>('');
    const dispatch = useDispatch();
    const avatarListCategory = authApi.useGetAvatarListQuery();
    const Avatars = avatarListCategory.data?.data || [];
    const [updateUserAuth] = authApi.useUpdateUserAuthMutation();
    const [getAvatarId, setGetAvatarId] = useState(null);
    const [postAvatarCollection] = authApi.usePostAvatarCollectionMutation();
    const user = useAppSelector(selectAuth);
    const avatarsCollection = user?.avatars;
    const totalDiamonds = user?.total_diamonds;
    const [showAlertDialog, setShowAlertDialog] = useState(false);

    console.log('Avatars = ', avatarsCollection);

    const handleChooseAvatar = (avatarUrl: string, avatarId: string) => {
        setSelectedAvatar(avatarUrl);
        setGetAvatarId(avatarId);
    }

    const handleSubmit = async () => {
        try {
            const avatar: AvatarInfo = {
                userId: user?.id,
                avatarCategoryId: getAvatarId,
            };
            const userInfo: UserInfo = {
                ...user,
                mainAvatar: selectedAvatar,
            };

            const avatarPrice = Avatars.find((avatarInfo: any) => avatarInfo.id === getAvatarId)?.price;

            if (totalDiamonds !== undefined && avatarPrice !== undefined && totalDiamonds < avatarPrice) {
                // Setelah kondisi terpenuhi, atur showAlertDialog menjadi true
                setShowAlertDialog(true);
                <AlertDiamonds showAlertDialog={showAlertDialog} setShowAlertDialog={setShowAlertDialog} />;
                return;
            }

            await AsyncStorage.setItem('userAvatar', selectedAvatar);
            updateUserAuth(userInfo);
            dispatch(session({ userInfo }));
            postAvatarCollection(avatar);
            navigation.navigate('Home');
        } catch (error) {
            console.error(error);
        }
    }



    const doesUserOwnAvatar = (avatarId: any) => {
        return avatarsCollection.some(ownedAvatar => ownedAvatar.id === avatarId);
    }

    return (
        <ScrollView
            backgroundColor="$primaryBg"
            flex={1}
        >
            <View
                width={'100%'}
                height={'100%'}
                justifyContent="center"
                alignItems="center"
                paddingBottom={'$20'}
            >
                <Box
                    rounded={"$2xl"}
                    padding="$4"
                    justifyContent="center"
                    alignItems="center"
                    gap={"$2"}
                    bgColor='$secondaryBg'
                    width={"90%"}
                    mt={'$2'}
                >
                    <Text
                        fontSize="$lg"
                        fontWeight="bold"
                        color='white'
                    >Change or Buy New Avatar</Text>

                    <HStack
                        justifyContent="flex-end"
                        alignItems="center"
                        width={'100%'}
                        padding={'$1'}
                        rounded={'$3xl'}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('Shop');
                            }}
                        >
                            <Box
                                bgColor="$tertiaryBg"
                                rounded={'$3xl'}
                                padding={'$1'}
                                width={100}
                                alignItems="center"
                                justifyContent="center"
                                display='flex'
                                flexDirection='row'
                                gap={'$2'}
                            >
                                <Image
                                    source={require('../../../assets/diamonds/starter_pack.png')}
                                    alt="Diamond icon"
                                    width={20}
                                    height={20}
                                    role="img"
                                />
                                <Text
                                    color='$white'
                                >{totalDiamonds}</Text>
                                <Icon
                                    color="white"
                                    size="md"
                                    as={Plus} />
                            </Box>
                        </TouchableOpacity>
                    </HStack>

                    <Box padding={5} flexDirection="row" flexWrap="wrap" justifyContent="space-between">
                        {Avatars.map((avatar: any) => (
                            <TouchableOpacity
                                key={avatar.id}
                                onPress={() => handleChooseAvatar(avatar.url, avatar.id)}
                                style={{
                                    width: '30%',
                                    marginBottom: '2%',
                                }}
                            >
                                <Box
                                    backgroundColor={selectedAvatar === avatar.url ? '$primaryBg' : '$tertiaryBg'}
                                    padding={selectedAvatar === avatar.url ? 5 : 5}
                                    rounded={selectedAvatar === avatar.url ? '$2xl' : '$2xl'}
                                    justifyContent='center'
                                    alignItems='center'
                                >
                                    <Image
                                        source={{ uri: avatar.url }}
                                        alt={avatar.name}
                                        size="sm"
                                        role="img"
                                    />
                                    <HStack
                                        justifyContent='center'
                                        alignItems='center'
                                        gap={'$1'}
                                    >
                                        {doesUserOwnAvatar(avatar.id) ? (
                                            <Text
                                                color='white'
                                                size='sm'
                                                fontWeight='bold'
                                                textAlign='center'
                                                mt={2}
                                            >
                                                Use
                                            </Text>
                                        ) : (
                                            <>
                                                <Image
                                                    source={require('../../../assets/diamonds/starter_pack.png')}
                                                    alt="Diamond icon"
                                                    width={15}
                                                    height={15}
                                                    role="img"
                                                />
                                                <Text
                                                    color='white'
                                                    size='sm'
                                                    fontWeight='bold'
                                                    textAlign='center'
                                                    mt={2}
                                                >
                                                    {avatar.price}
                                                </Text>
                                            </>
                                        )}
                                    </HStack>
                                </Box>
                            </TouchableOpacity>
                        ))}
                    </Box>
                    <Box
                        justifyContent='space-between'
                        alignItems='center'
                        width={'100%'}
                        display='flex'
                        flexDirection='row'
                        gap={'$2'}
                    >
                        <Button
                            onPress={() => {
                                navigation.navigate('Home')
                            }}
                            bg='$redButton'
                            my={'$4'}
                            rounded="$2xl"
                            width={'45%'}
                        >
                            <ButtonText
                                textAlign='center'
                                width={'100%'}
                                size='sm'
                                fontWeight='bold'
                            >Cancel</ButtonText>
                        </Button>
                        <Button
                            onPress={handleSubmit}
                            bg={doesUserOwnAvatar(getAvatarId) ? '$greenButton' : '$tertiaryButton'}
                            my={'$4'}
                            rounded="$2xl"
                            width={'45%'}
                        >
                            <ButtonText
                                textAlign='center'
                                width={'100%'}
                                size='sm'
                                fontWeight='bold'
                            >
                                {doesUserOwnAvatar(getAvatarId) ? 'Use' : 'Buy'}
                            </ButtonText>
                        </Button>
                    </Box>
                </Box>
                {showAlertDialog && (
                    <AlertDiamonds showAlertDialog={showAlertDialog} setShowAlertDialog={setShowAlertDialog} navigation={navigation} />
                )}
            </View>
        </ScrollView>
    )
}