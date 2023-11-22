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
    ScrollView,
} from '@gluestack-ui/themed';
import { TouchableOpacity } from 'react-native';
import { authApi } from '../../api';
import { useState } from 'react';

export default function ShopPage({ navigation }: any) {
    const { data: diamondCategoryData } = authApi.useGetDiamondCategoryQuery();
    const [selectedDiamond, setSelectedDiamond] = useState<string | null>(null);

    const handleChooseDiamond = (diamondName: string) => {
        setSelectedDiamond(diamondName);
    };

    const isDiamondSelected = (diamondName: string) => {
        return selectedDiamond === diamondName;
    };

    const ImageDiamond = [
        { key: 'starter_pack', image: require('../../../assets/diamonds/starter_pack.png') },
        { key: 'elite_pack', image: require('../../../assets/diamonds/elite_pack.png') },
        { key: 'royal_pack', image: require('../../../assets/diamonds/royal_pack.png') },
        { key: 'mystic_pack', image: require('../../../assets/diamonds/mystic_pack.png') },
        { key: 'rare_pack', image: require('../../../assets/diamonds/rare_pack.png') },
        { key: 'ultra_rare_pack', image: require('../../../assets/diamonds/ultra_rare_pack.png') },
    ];

    // Membagi item menjadi 2 baris dan 3 kolom
    const rows = [];
    for (let i = 0; i < ImageDiamond.length; i += 3) {
        rows.push(ImageDiamond.slice(i, i + 3));
    }

    // Fungsi untuk mengonversi harga menjadi format "Rp 150,000" tanpa desimal jika nol
    const formatCurrency = (price: number) => {
        const formatter = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
        return formatter.format(price);
    };

    return (
        <ScrollView
            flex={1}
            backgroundColor="$primaryBg"
        >
            <View
                flex={1}
                alignItems="center"
                backgroundColor="$primaryBg"
                gap={'$5'}
                my={'$5'}
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
                    <Box>
                        <VStack
                            w="100%"
                            alignSelf="center"
                        >
                            {rows.map((row, rowIndex) => (
                                <HStack
                                    key={rowIndex}
                                    space={"xs"}
                                    justifyContent='center'
                                    padding={'$2'}
                                    alignItems='center'
                                >
                                    {row.map((diamondItem) => {
                                        const imageInfo = ImageDiamond.find((info) => info.key === diamondItem.key);
                                        const displayName = diamondItem.key.replace(/_/g, ' ').toUpperCase();
                                        const categoryData = diamondCategoryData?.data.find((data) => data.name === diamondItem.key);

                                        return (
                                            <TouchableOpacity
                                                key={diamondItem.key}
                                                onPress={() => handleChooseDiamond(diamondItem.key)}
                                            >
                                                <Box
                                                    backgroundColor={isDiamondSelected(diamondItem.key) ? '$primaryBg' : 'transparent'}
                                                    rounded={isDiamondSelected(diamondItem.key) ? '$md' : '$none'}
                                                    alignItems='center'
                                                    justifyContent='center'
                                                    w={100}
                                                    h={130}
                                                >
                                                    <Image
                                                        source={imageInfo ? imageInfo.image : null}
                                                        alt={diamondItem.key}
                                                        role="img"
                                                        size="xs"
                                                        w={35}
                                                        h={35}
                                                    />
                                                    <Text
                                                        fontSize='$xs'
                                                        color='white'
                                                        fontWeight='bold'
                                                        textAlign='center'
                                                    >{displayName}</Text>
                                                    <Text
                                                        fontSize={10}
                                                        color='white'
                                                        m={-3}
                                                    >{categoryData?.amount || 0} Diamonds</Text>
                                                    <Text
                                                        fontSize="$xs"
                                                        color='white'
                                                        m={-2}
                                                    >
                                                        {formatCurrency(categoryData?.price || 0)}
                                                    </Text>
                                                </Box>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </HStack>
                            ))}
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
        </ScrollView>
    )
}
