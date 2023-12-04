import {
    Box,
    Heading,
    Text,
    Button,
    ButtonText,
    ModalBackdrop,
    ModalContent,
    Icon,
    ModalBody,
    ModalFooter,
    CloseIcon,
} from "@gluestack-ui/themed";
import { WebView } from 'react-native-webview';
import { Modal } from "@gluestack-ui/themed";
import base64 from 'base-64';
import { useEffect, useState } from "react";
import AppLottieView from "../AppLottieView";


export default function WebviewMidtrans({ showMidtrans, setShowMidtrans, navigation, urlRedirect, currentOrder, handlePurchaseDiamond }: any) {
    const [countdown, setCountdown] = useState(10000);
    const [paymentSuccess, setPaymentSuccess] = useState(false);


    const serverKey = 'SB-Mid-server-9BMORlV525fuy5X27Qg0Un3J';
    const base64Key = base64.encode(serverKey);

    async function getstatus() {
        // url for get the status of the transactions
        // this url is for sandbox
        const url = `https://api.sandbox.midtrans.com/v2/${currentOrder}/status`;

        // fetch data
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Basic ' + base64Key,
            },
        });
        return response.json();

    }

    useEffect(() => {
        const countdownInterval = setInterval(async () => {
            if (countdown <= 0) {
                console.log('Waktu habis');
                clearInterval(countdownInterval);
            } else {
                getstatus().then((data) => {
                    if (data.status_code == 200) {
                        console.log('Pembayaran Berhasil');
                        clearInterval(countdownInterval);
                        setPaymentSuccess(true);
                        setTimeout(() => {
                            handlePurchaseDiamond();
                            setShowMidtrans(false);
                        }, 4000);
                    } else {
                        console.log('Pembayaran Gagal');
                    }
                });
                setCountdown(prevCountdown => prevCountdown - 1);
            }
        }, 2000);

    }, []);



    return (
        <Box>
            <Modal
                isOpen={showMidtrans}
                onClose={() => {
                    setShowMidtrans(false)
                }}
                size="lg"
                justifyContent="center"
                alignItems="center"
            >
                <ModalBackdrop />
                <ModalContent
                    bgColor={paymentSuccess ? "$primaryBg" : "white"}
                >
                    {paymentSuccess ? (
                        <ModalBody>
                            <Box
                                height={'100%'}
                                width={'100%'}
                                paddingBottom={'5%'}
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Text
                                    fontWeight="bold"
                                    color="white"
                                    size="lg"
                                    textAlign="center"
                                    mt="$10"
                                >Payment Success</Text>
                                <AppLottieView
                                    animation={require('./payment_sucsess.json')}
                                    autoPlay
                                    loop
                                    style={{
                                        width: 400,
                                        height: 400,
                                    }}
                                />
                            </Box>
                        </ModalBody>
                    ) : (
                        <ModalBody
                            margin={-25}
                        >
                            <Box
                                height={'100%'}
                                width={'100%'}
                                paddingBottom={'5%'}
                            >
                                <WebView
                                    height={500}
                                    width={'100%'}
                                    source={{ uri: urlRedirect }}
                                    javaScriptEnabled={true}
                                    javaScriptCanOpenWindowsAutomatically={true}
                                    domStorageEnabled={true}
                                    cacheEnabled={true}
                                    allowFileAccessFromFileURLs={true}
                                    allowFileAccess={true}
                                    cacheMode="LOAD_NO_CACHE"
                                />
                            </Box>
                        </ModalBody>
                    )}
                    <ModalFooter>
                        {paymentSuccess ? (
                            <Text
                                color="$primaryBg"
                            >Waiting for redirect...</Text>
                        ) : (
                            <Button
                                bgColor="$redButton"
                                size="sm"
                                action="secondary"
                                mr="$3"
                                onPress={() => {
                                    setShowMidtrans(false)
                                    // checkPayment();
                                }}
                            >
                                <ButtonText
                                    color="white"
                                >Cancel</ButtonText>
                            </Button>
                        )}

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}