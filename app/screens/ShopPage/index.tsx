import React, { useEffect } from 'react';
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
    Icon,
} from '@gluestack-ui/themed';
import { TouchableOpacity } from 'react-native';
import { authApi } from '../../api';
import { useState } from 'react';
import { selectAuth } from '../../store/auth';
import { useAppSelector } from '../../hooks/useRedux';
import { DiamondCategoryResponse, DiamondInfo } from '../../types/diamondCatTypes';
import axios from 'axios';
import { WebviewMidtrans } from '../../components';
import { Plus } from 'lucide-react-native';


export default function ShopPage({ navigation }: any) {
    const diamondCategoryDataResponse = authApi.useGetDiamondCategoryQuery<DiamondCategoryResponse>();
    const diamondCategoryData = diamondCategoryDataResponse.data?.data;
    const user = useAppSelector(selectAuth);
    const [selectedDiamond, setSelectedDiamond] = useState<string | null>(null);
    const [selectedDiamondId, setSelectedDiamondId] = useState<string | undefined>(undefined);
    const [purchaseDiamond] = authApi.usePurchaseDiamondMutation();
    const [urlRedirect, setUrlRedirect] = useState("");
    const orderId = `${user?.id}` + (Math.random() + 1).toString(36).substring(7);
    const totalDiamonds = user?.total_diamonds;

    const [currentOrder, setCurrentOrder] = useState('')

    //price
    const [selectedDiamondPrice, setSelectedDiamondPrice] = useState(0);

    //Midtrans
    const [showMidtrans, setShowMidtrans] = useState(false);

    const handleChooseDiamond = (diamondName: string, diamondId: string, diamondPrice: number) => {
        setSelectedDiamond(diamondName);
        setSelectedDiamondId(diamondId);
        setSelectedDiamondPrice(diamondPrice);
    };

    const isDiamondSelected = (diamondName: string) => {
        return selectedDiamond === diamondName;
    };

    const diamondIdSelected = (diamondId: string) => {
        return selectedDiamondId === diamondId;
    };

    const diamondPriceSelected = (diamondPrice: number) => {
        return selectedDiamondPrice === diamondPrice;
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
                await purchaseDiamond(diamondPurchase);
                setShowMidtrans(false);
            } catch (err) {
                console.log(err);
            }
        } else {
            console.error("User ID or selected diamond ID is missing");
        }
    };

    const testWebview = async () => {

        console.log(orderId);

        const data = {
            order_id: orderId,
            gross_amount: selectedDiamondPrice,
            name: user?.username,
            email: user?.email,
        };

        setCurrentOrder(orderId);

        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };

        const response = await axios.post(
            "https://4lrfl253-6000.asse.devtunnels.ms/api/payment/process-transaction",
            data,
            config
        );

        setUrlRedirect(response.data.redirectURL);
        // setPaymentSuccess(response.data.message);
        setShowMidtrans(true);
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
                                </Box>
                            </TouchableOpacity>
                        </HStack>
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
                                                    handleChooseDiamond(diamondItem.key, categoryData?.id || '', categoryData?.price || 0)
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
                        <ButtonText onPress={() => {
                            testWebview()
                        }}>Buy</ButtonText>
                    </Button>
                </Box>
                {showMidtrans && (
                    <WebviewMidtrans
                        showMidtrans={showMidtrans}
                        setShowMidtrans={setShowMidtrans}
                        navigation={navigation}
                        urlRedirect={urlRedirect}
                        currentOrder={currentOrder}
                        handlePurchaseDiamond={handlePurchaseDiamond}
                    />
                )}
            </View>
        </ScrollView>
    );
}
