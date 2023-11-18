import React from 'react';
import {
    View,
    Box,
    Text,
    Image,
    VStack,
    HStack,
    Button,
    ButtonText,
} from '@gluestack-ui/themed';
import { TouchableOpacity } from 'react-native';



export default function ShopPage({ navigation }) {
    const [selectedDiamond, setSelectedDiamond] = React.useState(null);

    const handleChooseDiamond = (diamondName) => {
        setSelectedDiamond(diamondName);
    };

    const isDiamondSelected = (diamondName) => {
        return selectedDiamond === diamondName;
    };

    return (
        <View
            flex={1}
            alignItems="center"
            backgroundColor="$primaryBg"
            gap={'$5'}
        >
            <Box
                rounded={"$2xl"}
                padding="$4"
                justifyContent="center"
                alignItems="center"
                gap={"$2"}
                bgColor='$secondaryBg'
                width={"90%"}
                mt={'$5'}
            >
                <Box
                    padding={"$5"}
                >
                    <VStack
                        w="100%"
                        space={"md"}
                        alignSelf="center"
                    >
                        <HStack
                            space={"lg"}
                            justifyContent='center'
                        >
                            <TouchableOpacity
                                onPress={() => handleChooseDiamond('starter_pack')}
                            >
                                <Box
                                    backgroundColor={isDiamondSelected('starter_pack') ? '$primaryBg' : 'transparent'}
                                    padding={isDiamondSelected('starter_pack') ? 5 : 5}
                                    rounded={isDiamondSelected('starter_pack') ? '$2xl' : '$none'}
                                    alignContent='center'
                                    justifyContent='center'
                                    alignItems='center'

                                >
                                    <Image
                                        source={require('../../../assets/diamonds/starter_pack.png')}
                                        alt="Free Fox Avatar"
                                        size="xs"
                                        role="img"
                                    />
                                    <Text
                                        fontSize="$xs"
                                        color='white'
                                        fontWeight='bold'
                                    >Starter Pack</Text>
                                    <Text
                                        fontSize="$xs"
                                        color='$greenButton'
                                    >100 Diamonds</Text>
                                </Box>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleChooseDiamond('elite_pack')}
                            >
                                <Box
                                    backgroundColor={isDiamondSelected('elite_pack') ? '$primaryBg' : 'transparent'}
                                    padding={isDiamondSelected('elite_pack') ? 5 : 5}
                                    rounded={isDiamondSelected('elite_pack') ? '$2xl' : '$none'}
                                    alignContent='center'
                                    justifyContent='center'
                                    alignItems='center'

                                >
                                    <Image
                                        source={require('../../../assets/diamonds/elite_pack.png')}
                                        alt="Free Fox Avatar"
                                        size="xs"
                                        role="img"
                                    />
                                    <Text
                                        fontSize="$xs"
                                        color='white'
                                        fontWeight='bold'
                                    >Elite Pack</Text>
                                    <Text
                                        fontSize="$xs"
                                        color='$greenButton'
                                    >200 Diamonds</Text>
                                </Box>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleChooseDiamond('royal_pack')}
                            >
                                <Box
                                    backgroundColor={isDiamondSelected('royal_pack') ? '$primaryBg' : 'transparent'}
                                    padding={isDiamondSelected('royal_pack') ? 5 : 5}
                                    rounded={isDiamondSelected('royal_pack') ? '$2xl' : '$none'}
                                    alignContent='center'
                                    justifyContent='center'
                                    alignItems='center'

                                >
                                    <Image
                                        source={require('../../../assets/diamonds/royal_pack.png')}
                                        alt="Free Fox Avatar"
                                        size="xs"
                                        role="img"
                                    />
                                    <Text
                                        fontSize="$xs"
                                        color='white'
                                        fontWeight='bold'
                                    >Royal Pack</Text>
                                    <Text
                                        fontSize="$xs"
                                        color='$greenButton'
                                    >300 Diamonds</Text>
                                </Box>
                            </TouchableOpacity>
                        </HStack>
                        <HStack
                            space={"lg"}
                            justifyContent='center'
                        >
                            <TouchableOpacity
                                onPress={() => handleChooseDiamond('mystic_pack')}
                            >
                                <Box
                                    backgroundColor={isDiamondSelected('mystic_pack') ? '$primaryBg' : 'transparent'}
                                    padding={isDiamondSelected('mystic_pack') ? 5 : 5}
                                    rounded={isDiamondSelected('mystic_pack') ? '$2xl' : '$none'}
                                    alignContent='center'
                                    justifyContent='center'
                                    alignItems='center'

                                >
                                    <Image
                                        source={require('../../../assets/diamonds/mystic_pack.png')}
                                        alt="Free Fox Avatar"
                                        size="xs"
                                        role="img"
                                    />
                                    <Text
                                        fontSize="$xs"
                                        color='white'
                                        fontWeight='bold'
                                    >Mystic Pack</Text>
                                    <Text
                                        fontSize="$xs"
                                        color='$greenButton'
                                    >500 Diamonds</Text>
                                </Box>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleChooseDiamond('infinite_pack')}
                            >
                                <Box
                                    backgroundColor={isDiamondSelected('infinite_pack') ? '$primaryBg' : 'transparent'}
                                    padding={isDiamondSelected('infinite_pack') ? 5 : 5}
                                    rounded={isDiamondSelected('infinite_pack') ? '$2xl' : '$none'}
                                    alignContent='center'
                                    justifyContent='center'
                                    alignItems='center'

                                >
                                    <Image
                                        source={require('../../../assets/diamonds/infinite_pack.png')}
                                        alt="Free Fox Avatar"
                                        size="xs"
                                        role="img"
                                    />
                                    <Text
                                        fontSize="$xs"
                                        color='white'
                                        fontWeight='bold'
                                    >Starter Pack</Text>
                                    <Text
                                        fontSize="$xs"
                                        color='$greenButton'

                                    >1000 Diamonds</Text>
                                </Box>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleChooseDiamond('treasure_pack')}
                            >
                                <Box
                                    backgroundColor={isDiamondSelected('treasure_pack') ? '$primaryBg' : 'transparent'}
                                    padding={isDiamondSelected('treasure_pack') ? 5 : 5}
                                    rounded={isDiamondSelected('treasure_pack') ? '$2xl' : '$none'}
                                    alignContent='center'
                                    justifyContent='center'
                                    alignItems='center'

                                >
                                    <Image
                                        source={require('../../../assets/diamonds/treasure_pack.png')}
                                        alt="Free Fox Avatar"
                                        size="xs"
                                        role="img"
                                    />
                                    <Text
                                        fontSize="$xs"
                                        color='white'
                                        fontWeight='bold'
                                    >Starter Pack</Text>
                                    <Text
                                        fontSize="$xs"
                                        color='$greenButton'
                                    >1500 Diamonds</Text>
                                </Box>
                            </TouchableOpacity>
                        </HStack>
                    </VStack>
                </Box>
            </Box>
            <Box
                width={'100%'}
                display='flex'
                flexDirection='row'
                justifyContent='center'
                gap={'$10'}
            >
                <Button
                    bgColor="$redButton"
                    width={'30%'}
                    onPress={() => navigation.goBack('Home')}
                >
                    <ButtonText>Cancel</ButtonText>
                </Button>
                <Button
                    bgColor="$greenButton"
                    width={'30%'}
                >
                    <ButtonText>Buy</ButtonText>
                </Button>
            </Box>
        </View>
    )
}