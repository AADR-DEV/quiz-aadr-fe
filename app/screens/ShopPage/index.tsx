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
import { selectAuth } from '../../store/auth';
import { useAppSelector } from '../../hooks/useRedux';
import { DiamondCategoryResponse, DiamondInfo } from '../../types/diamondCatTypes';


export default function ShopPage({ navigation }: any) {
    const diamondCategoryDataResponse = authApi.useGetDiamondCategoryQuery<DiamondCategoryResponse>();
    const diamondCategoryData = diamondCategoryDataResponse.data?.data;
    const user = useAppSelector(selectAuth);
    const [selectedDiamond, setSelectedDiamond] = useState<string | null>(null);
    const [selectedDiamondId, setSelectedDiamondId] = useState<string | undefined>(undefined);
    const [purchaseDiamond] = authApi.usePurchaseDiamondMutation();

    const handleChooseDiamond = (diamondName: string, diamondId: string) => {
        setSelectedDiamond(diamondName);
        setSelectedDiamondId(diamondId);
    };

    const isDiamondSelected = (diamondName: string) => {
        return selectedDiamond === diamondName;
    };

    const diamondIdSelected = (diamondId: string) => {
        return selectedDiamondId === diamondId;
    };

    const ImageDiamond = [
        {
            key: 'starter_pack',
            image: require('../../../assets/diamonds/starter_pack.png'),
        },
        {
            key: 'elite_pack',
            image: require('../../../assets/diamonds/elite_pack.png'),
        },
        {
            key: 'royal_pack',
            image: require('../../../assets/diamonds/royal_pack.png'),
        },
        {
            key: 'mystic_pack',
            image: require('../../../assets/diamonds/mystic_pack.png'),
        },
        {
            key: 'rare_pack',
            image: require('../../../assets/diamonds/rare_pack.png'),
        },
        {
            key: 'ultra_rare_pack',
            image: require('../../../assets/diamonds/ultra_rare_pack.png'),
        },
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

    const handlePurchaseDiamond = async () => {
        if (user && user.id && selectedDiamondId) {
            try {
                const diamondPurchase: DiamondInfo = {
                    userId: user.id,
                    diamondCategoryId: selectedDiamondId,
                };
                console.log(diamondPurchase);

                await purchaseDiamond(diamondPurchase);
            } catch (err) {
                console.log(err);
            }
        } else {
            // Handle case where user ID or selectedDiamondId is undefined
            console.error("User ID or selected diamond ID is missing");
        }
    };

    return (
        <ScrollView flex={1} backgroundColor="$primaryBg">
            <View
                flex={1}
                alignItems="center"
                backgroundColor="$primaryBg"
                gap={'$5'}
                my={'$5'}>
                <Box
                    rounded={'$2xl'}
                    padding="$4"
                    justifyContent="center"
                    alignItems="center"
                    gap={'$2'}
                    bgColor="$secondaryBg"
                    width={'90%'}
                    mt={'$5'}>
                    <Box>
                        <VStack w="100%" alignSelf="center">
                            {rows.map((row, rowIndex) => (
                                <HStack
                                    key={rowIndex}
                                    space={'xs'}
                                    justifyContent="center"
                                    padding={'$2'}
                                    alignItems="center">
                                    {row.map(diamondItem => {
                                        const imageInfo = ImageDiamond.find(
                                            info => info.key === diamondItem.key,
                                        );
                                        const displayName = diamondItem.key
                                            .replace(/_/g, ' ')
                                            .toUpperCase();

                                        // Ensure diamondCategoryData is an array before using .find
                                        const categoryData = Array.isArray(diamondCategoryData)
                                            ? diamondCategoryData.find(data => data.name === diamondItem.key)
                                            : undefined;

                                        return (
                                            <TouchableOpacity
                                                id={categoryData?.id}
                                                key={categoryData?.id}
                                                onPress={() =>
                                                    handleChooseDiamond(diamondItem.key, categoryData?.id || '')
                                                }>
                                                <Box
                                                    backgroundColor={
                                                        isDiamondSelected(diamondItem.key)
                                                            ? '$primaryBg'
                                                            : 'transparent'
                                                    }
                                                    rounded={
                                                        isDiamondSelected(diamondItem.key) ? '$md' : '$none'
                                                    }
                                                    alignItems="center"
                                                    justifyContent="center"
                                                    w={100}
                                                    h={130}>
                                                    <Image
                                                        source={imageInfo ? imageInfo.image : null}
                                                        alt={diamondItem.key}
                                                        role="img"
                                                        size="xs"
                                                        w={35}
                                                        h={35}
                                                    />
                                                    <Text
                                                        fontSize="$xs"
                                                        color="white"
                                                        fontWeight="bold"
                                                        textAlign="center">
                                                        {displayName}
                                                    </Text>
                                                    <Text fontSize={10} color="white" m={-3}>
                                                        {categoryData && categoryData?.amount || 0} Diamonds
                                                    </Text>
                                                    <Text fontSize="$xs" color="white" m={-2}>
                                                        {formatCurrency(categoryData && categoryData?.price || 0)}
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
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                    gap={'$10'}>
                    <Button
                        bgColor="$redButton"
                        width={'30%'}
                        onPress={() => navigation.goBack('Home')}>
                        <ButtonText>Cancel</ButtonText>
                    </Button>
                    <Button bgColor="$greenButton" width={'30%'}>
                        <ButtonText onPress={() => handlePurchaseDiamond()}>Buy</ButtonText>
                    </Button>
                </Box>
            </View>
        </ScrollView>
    );
}
